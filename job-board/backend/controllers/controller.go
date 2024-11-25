package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"job-board-backend/config"
	"job-board-backend/models"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {

	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	user.CreatedAt = time.Now()

	collection := config.GetUserCollection()

	// Check if email already exists
	var existingUser models.User
	err := collection.FindOne(context.TODO(), bson.M{"email": user.Email}).Decode(&existingUser)
	if err != mongo.ErrNoDocuments {
		http.Error(w, "Email already registered", http.StatusConflict)
		return
	}

	// Insert the new user into the database
	_, err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message":  "User registered successfully",
		"userId":   user.ID,
		"userType": user.UserType,
	})
}

func ValidateLoginDetails(w http.ResponseWriter, r *http.Request) {
	var loginData models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginData)
	if err != nil {
		fmt.Println("Error decoding request:", err)
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	collection := config.GetUserCollection()
	var user models.User

	query := bson.M{"email": loginData.Email, "password": loginData.Password}
	fmt.Println("Querying database with:", query)

	err = collection.FindOne(context.TODO(), query).Decode(&user)
	if err != nil {
		fmt.Println("Error finding user:", err)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message":  "Login successful",
		"userType": user.UserType,
		"userID":   user.ID,
	})
}

func GetJobs(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "getting jobs...")
}

// Admin
func CreateJob(w http.ResponseWriter, r *http.Request) {

}

// Admin
func editJobs() {

}
