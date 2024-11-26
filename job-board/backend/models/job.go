package models

import "time"

type Job struct {
	ID            string        `json:"id" bson:"_id,omitempty"`           
	Title         string        `json:"title" bson:"title"`               
	Description   string        `json:"description" bson:"description"`   
	ShortDesc     string        `json:"short_desc" bson:"short_desc"`     
	Locations     []string      `json:"locations" bson:"locations"`    
	PostedTime    time.Time     `json:"posted_time" bson:"posted_time"`    
	Applicants    int           `json:"applicants" bson:"applicants"`
	Applications  []Application `json:"applications" bson:"applications"` 
	EmploymentType string       `json:"employment_type" bson:"employment_type"` 
	Salary        string        `json:"salary" bson:"salary"`      
	Experience    string        `json:"experience" bson:"experience"`
	Company       string        `json:"company" bson:"company"`           
	RemoteOption  bool          `json:"remote_option" bson:"remote_option"` 
}

type Application struct {
	ID       string `json:"id"`        
	Name     string `json:"name"`      
	Email    string `json:"email"`     
	Status   string `json:"status"`    
	AppliedTime time.Time `json:"applied_time"` 
}
