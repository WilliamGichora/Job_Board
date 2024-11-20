package routes

import(
	"github.com/gorilla/mux"
	"job-board-backend/controllers"
)

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/", controllers.Test).Methods("POST")
	r.HandleFunc("/jobs", controllers.GetJobs).Methods("GET")
	r.HandleFunc("/jobs", controllers.CreateJob).Methods("POST")
}

/*func GetJobs(w http.ResponseWriter,r *http.Request)  {
	
}*/