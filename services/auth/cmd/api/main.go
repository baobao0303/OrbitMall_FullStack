package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"ride-sharing/services/auth/data"
	"time"

	_ "github.com/jackc/pgx/v4/stdlib"
)

const webPort = "80"
var counts int64

type Config struct {
	DB *sql.DB
	Models data.Models
}

func main() {

	//log the start of the application
	log.Println("Starting authentication service")


	// connect to database
	db, err := connectToDB()
	if err != nil {
		log.Fatalf("Error connecting to database: %s\n", err)
		os.Exit(1)
	}

	// setup config
	app := Config{
		DB: db,
		Models: data.New(db),
	}


	src := &http.Server{
		Addr: fmt.Sprintf(":%s", webPort),
		Handler: app.routes(),
	}

	// start the server
	err = src.ListenAndServe()
	if err != nil {
		log.Fatalf("Error starting server: %s\n", err)
		os.Exit(1)
	}
}


//configure database
func openDB(dsn string) (*sql.DB, error) {
	// if using env os.Getenv("DB_URL")
	db, err := sql.Open("pgx", dsn )
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func connectToDB() (*sql.DB, error) {
	dsn := os.Getenv("DSN")
	log.Println("Attempting to connect to PostgreSQL...")
	for{
		db, err := openDB(dsn)
		if err != nil {
			log.Printf("Postgres not ready yet... (attempt %d/10)", counts+1)
			counts++
			if counts > 10 {
				log.Fatalf("Failed to connect to PostgreSQL after 10 attempts: %v", err)
				return nil, err
			}
			time.Sleep(2 * time.Second)
			continue
		}
		log.Println("✅ Successfully connected to PostgreSQL!")
		return db, nil
	}
}