package models

import "time"

type Job struct {
	ID            string    `json:"id" bson:"_id,omitempty"`              
	Title         string    `json:"title" bson:"title"`           
	Description   string    `json:"description" bson:"description"`     // Job description
	Locations     []string  `json:"locations" bson:"locations"`       // Array of job locations
	PostedTime    time.Time `json:"posted_time" bson:"posted_time"`     // Time when job was posted
	Applicants    int       `json:"applicants" bson:"applicants"`      // Number of applicants
	Applications  []Application `json:"applications" bson:"applications"` // List of applicant details
}

type Application struct {
	ID       string `json:"id"`        // Applicant ID
	Name     string `json:"name"`      // Applicant name
	Email    string `json:"email"`     // Applicant email
	Status   string `json:"status"`    // Current status ("Pending", "Approved", etc.)
	AppliedTime time.Time `json:"applied_time"` // When they applied
}
