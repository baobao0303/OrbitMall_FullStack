package data

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func New(mongoClient *mongo.Client) Models {
	Client = mongoClient
	return Models{
		LogEntry: LogEntry{},
	}
}

type Models struct {
	LogEntry LogEntry
}

type LogEntry struct {
	ID        string `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string `bson:"name" json:"name"`
	Data      string `bson:"data" json:"data"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`	
}

func (l *LogEntry) Insert() error {
	collection := Client.Database("logs").Collection("logs")
	_, err := collection.InsertOne(context.TODO(), l)
	if err != nil {
		log.Println("Error inserting log entry into MongoDB: ", err)
		return err
	}
	return nil
}

func (l *LogEntry) All() ([]*LogEntry, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	collection := Client.Database("logs").Collection("logs")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Println("Error finding log entries in MongoDB: ", err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var logs []*LogEntry
	for cursor.Next(ctx) {
		var logEntry LogEntry
		if err := cursor.Decode(&logEntry); err != nil {
			log.Println("Error decoding log entry from MongoDB: ", err)
			return nil, err
		}
		logs = append(logs, &logEntry)
	}
	return logs, nil
}

func (l *LogEntry) GetOne(id string) (*LogEntry, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	collection := Client.Database("logs").Collection("logs")
	doc := collection.FindOne(ctx, bson.M{"_id": id})
	if err := doc.Err(); err != nil {
		log.Println("Error finding log entry in MongoDB: ", err)
		return nil, err
	}
	var logEntry LogEntry
	if err := doc.Decode(&logEntry); err != nil {
		log.Println("Error decoding log entry from MongoDB: ", err)
		return nil, err
	}
	return &logEntry, nil
}


func (l *LogEntry) DropCollection() error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	collection := Client.Database("logs").Collection("logs")
	err := collection.Drop(ctx)
	if err != nil {
		log.Println("Error dropping log collection in MongoDB: ", err)
		return err
	}
	return nil
}

func (l *LogEntry) Update() (*mongo.UpdateResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	collection := Client.Database("logs").Collection("logs")
	docID, err := primitive.ObjectIDFromHex(l.ID)
	if err != nil {
		log.Println("Error converting log entry ID to ObjectID: ", err)
		return nil, err
	}
	
	result, err := collection.UpdateOne(
		ctx,
		bson.M{"_id": docID},
		bson.M{"$set": l},
		options.Update().SetUpsert(true),
	)
	if err != nil {
		log.Println("Error updating log entry in MongoDB: ", err)
		return nil, err
	}
	return result, nil
}