package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"job-board-backend/config"
	"job-board-backend/models"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	collection := config.GetJobCollection()

	// Fetch all jobs
	cursor, err := collection.Find(r.Context(), map[string]interface{}{})
	if err != nil {
		http.Error(w, "Failed to fetch jobs", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(r.Context())

	var jobs []models.Job
	if err := cursor.All(r.Context(), &jobs); err != nil {
		http.Error(w, "Error processing jobs", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jobs)
}

// Admin
func CreateJob(w http.ResponseWriter, r *http.Request) {
	var job models.Job

	if err := json.NewDecoder(r.Body).Decode(&job); err != nil {
		http.Error(w, "Invalid job data", http.StatusBadRequest)
		return
	}

	job.ID = ""
	job.PostedTime = time.Now()
	job.Applicants = 0
	job.Applications = []models.Application{}

	// Get MongoDB collection
	collection := config.GetJobCollection()

	result, err := collection.InsertOne(context.TODO(), job)
	if err != nil {
		http.Error(w, "Failed to save job", http.StatusInternalServerError)
		return
	}

	jobID := result.InsertedID.(primitive.ObjectID).Hex()
	job.ID = jobID

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(job)
}

// Admin
func editJobs() {

}
func GetJobByID(w http.ResponseWriter, r *http.Request) {

}

func ApplyForJobHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	jobID := vars["jobId"]
	fmt.Println("my vars is", vars)
	fmt.Println("jobID:", jobID)

	jobObjectID, err := primitive.ObjectIDFromHex(jobID)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid job ID"})
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var application models.Application
	if err := json.NewDecoder(r.Body).Decode(&application); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid request body"})
		return
	}

	// Update the job document with the application data
	filter := bson.M{"_id": jobObjectID}
	update := bson.M{
		"$push": bson.M{"applications": application},
		"$inc":  bson.M{"applicants": 1},
	}

	jobCollection := config.GetJobCollection()

	result, err := jobCollection.UpdateOne(r.Context(), filter, update)
	if err != nil || result.MatchedCount == 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to apply for job"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Application successful"})
}
