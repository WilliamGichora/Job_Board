package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"job-board-backend/config"
	"job-board-backend/routes"

	"github.com/gorilla/mux"
)

func main() {
	// Connect to MongoDB
	client := config.ConnectDb()
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error disconnecting MongoDB: %v", err)
		}
		log.Println("Disconnected from MongoDB")
	}()

	// Initialize router
	r := mux.NewRouter()

	// Define routes
	routes.RegisterRoutes(r)

	// Server configuration
	server := &http.Server{
		Handler:      r,
		Addr:         ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	// Start server
	go func() {
		log.Println("Server started on http://localhost:8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	gracefulShutdown(server)
}

func gracefulShutdown(server *http.Server) {
	// Wait for interrupt signal
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop

	log.Println("Shutting down server...")

	// Allow time for shutdown tasks
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown error: %v", err)
	}

	log.Println("Server stopped gracefully")
}
