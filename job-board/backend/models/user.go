package models

import (
	"time"
)

type User struct {
	ID        string    `json:"id" bson:"_id,omitempty"`
	FullName  string    `json:"fullName" bson:"fullName"`
	Email     string    `json:"email" bson:"email"`
	Password  string    `json:"password" bson:"password"` // Store hashed passwords for security
	UserType  string    `json:"userType" bson:"userType"` 
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}

type LoginRequest struct {
    Email    string `json:"email"` 
    Password string `json:"password"` 
}
