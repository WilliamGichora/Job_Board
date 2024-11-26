package routes

import (
	"job-board-backend/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Access granted to protected route"))
}

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/api/jobs", controllers.GetJobs).Methods("GET")                  
	r.HandleFunc("/api/jobs", controllers.CreateJob).Methods("POST")               
	r.HandleFunc("/api/jobs/{jobId}", controllers.GetJobByID).Methods("GET")          
	r.HandleFunc("/api/jobs/{jobId}/applications", controllers.ApplyForJobHandler).Methods("POST") 
	r.HandleFunc("/api/register", controllers.RegisterUser).Methods(http.MethodPost)
	r.HandleFunc("/api/login", controllers.ValidateLoginDetails).Methods(http.MethodPost)
}

