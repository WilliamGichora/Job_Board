package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDb() *mongo.Client  {
	ctx, cancel := context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	err = client.Ping(ctx,nil)
	if err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	DB = client
	fmt.Println("Connected to MongoDB Successfully")

	return client
	
}