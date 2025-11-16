package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	httpSwagger "github.com/swaggo/http-swagger"
	"ride-sharing/services/auth/cmd/api/handlers"
)

// @title Auth Service API
// @version 1.0
// @description Authentication Service API Documentation
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.email support@example.com

// @host localhost:8080
// @BasePath /
func (app *Config) routes() http.Handler {
	mux := chi.NewRouter()
	var allowedOrigins = []string{"https://*", "http://*"}

	// specify who is allowed to connect
	mux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Health check endpoint
	// @Summary Health check
	// @Description Returns OK if service is running
	// @Tags health
	// @Accept json
	// @Produce json
	// @Success 200 {string} string "OK"
	// @Router / [get]
	mux.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// API v1 routes
	mux.Route("/api/v1", func(r chi.Router) {
		// XFWToken endpoints
		r.Route("/XFWToken", func(r chi.Router) {
			r.Get("/verify-access-token", handlers.VerifyAccessToken)
			r.Post("/renew-access-token", handlers.RenewAccessToken)
		})
		// User endpoints
		r.Route("/User", func(r chi.Router) {
			r.Post("/sign-in", handlers.SignIn)
			r.Post("/sign-up", handlers.SignUp)
			r.Post("/verify-mail", handlers.VerifyMail)
			r.Post("/resend-otp", handlers.ResendOTP)
		})
		// City endpoints
		r.Route("/cities", func(r chi.Router) {
			r.Post("/sync", func(w http.ResponseWriter, r *http.Request) {
				handlers.SyncCities(w, r, &app.Models)
			})
			r.Get("/provinces", func(w http.ResponseWriter, r *http.Request) {
				handlers.GetProvinces(w, r, &app.Models)
			})
			r.Get("/provinces/{province_code}/wards", func(w http.ResponseWriter, r *http.Request) {
				provinceCode := chi.URLParam(r, "province_code")
				handlers.GetWards(w, r, &app.Models, provinceCode)
			})
		})
	})

	// Swagger documentation
	mux.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("/swagger/doc.json"),
	))

	return mux
}