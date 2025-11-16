package main

import (
	"context"
	"fmt"
	"log"
	"logger-service/data"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const(
	webPort = "80"
	rpcPort = "5001"
	gRpcPort = "50001"
)

func getMongoURL() string {
	mongoURL := os.Getenv("MONGO_URL")
	if mongoURL == "" {
		mongoURL = "mongodb://admin:password@localhost:27017"
	}
	return mongoURL
}

var client *mongo.Client

type Config struct {
	Models data.Models
}


func main(){

	//connect to mongo
	mongoClient, err := connectToMongo()
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %s\n", err)
		os.Exit(1)
	}

	client = mongoClient

	// create a application context
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()


	//close connection
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatalf("Error disconnecting from MongoDB: %s\n", err)
		}
	}()


	app := Config{
		Models: data.New(mongoClient),
	}

	// Start the server
	if err := app.serve(); err != nil {
		log.Fatalf("Error starting server: %s\n", err)
	}
}

func (app *Config) serve() error {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default for local development
	}

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: app.routes(),
	}

	log.Printf("Starting logger service on port %s", port)
	return srv.ListenAndServe()
}


func connectToMongo() (*mongo.Client, error) {
	//create a context in order to disconnect
	mongoURL := getMongoURL()
	clientOptions := options.Client().ApplyURI(mongoURL)
	
	//connect to mongo
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}

	// Test the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		return nil, err
	}

	log.Println("✅ Successfully connected to MongoDB!")
	return client, nil
}