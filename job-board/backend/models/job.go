package models

import (
	"time"
)


type Job struct {
	Title       string    `json:"title" bson:"title"`
	Description string    `json:"description" bson:"description"`
	Company     string    `json:"company" bson:"company"`
	Location    string    `json:"location" bson:"location"`
	PostedAt    time.Time `json:"postedAt" bson:"postedAt"`
}