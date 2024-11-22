package routes

import (
	"job-board-backend/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/", controllers.Test).Methods("GET")
	r.HandleFunc("/jobs", controllers.GetJobs).Methods("GET")
	r.HandleFunc("/jobs", controllers.CreateJob).Methods("POST")
	r.HandleFunc("/api/register",controllers.RegisterUser).Methods(http.MethodPost)
	r.HandleFunc("/api/login",controllers.ValidateLoginDetails).Methods(http.MethodPost)
}
