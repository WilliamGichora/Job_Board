package config

import "go.mongodb.org/mongo-driver/mongo"

func GetUserCollection() *mongo.Collection  {
	return DB.Database("job_board").Collection("users")
}

func GetJobCollection() *mongo.Collection  {
	return DB.Database("job_board").Collection("jobs")
}