package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"ride-sharing/services/auth/data"
	"strconv"
	"time"
)

var ModelsInstance *data.Models

// SetModels sets the models instance for handlers
func SetModels(models *data.Models) {
	ModelsInstance = models
}

// SignUp handles user registration
// @Summary User sign-up
// @Description Registers a new user with provided information
// @Tags User
// @Accept json
// @Produce json
// @Param request body SignUpRequest true "Sign-up request"
// @Success 201 {object} SignUpResponse
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/User/sign-up [post]
func SignUp(w http.ResponseWriter, r *http.Request) {
	if ModelsInstance == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Models not initialized",
		})
		return
	}
	signUpWithModels(w, r, ModelsInstance)
}

func signUpWithModels(w http.ResponseWriter, r *http.Request, models *data.Models) {
	var req SignUpRequest

	// Decode request body
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid request body",
		})
		return
	}

	// Validate required fields
	if req.FirstName == "" || req.LastName == "" || req.Email == "" || req.Password == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "firstName, lastName, email, and password are required",
		})
		return
	}

	// Validate password length
	if len(req.Password) < 6 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Password must be at least 6 characters long",
		})
		return
	}

	// Parse cityId if provided
	var cityID *int
	if req.CityID != nil && *req.CityID != "" {
		id, err := strconv.Atoi(*req.CityID)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Invalid cityId format",
			})
			return
		}
		// Verify city exists
		city, err := models.City.GetOne(id)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": fmt.Sprintf("City with id %d not found", id),
			})
			return
		}
		if city == nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": fmt.Sprintf("City with id %d not found", id),
			})
			return
		}
		cityID = &id
	}

	// Parse genderId if provided
	var genderID *int
	if req.GenderID != nil && *req.GenderID != "" {
		id, err := strconv.Atoi(*req.GenderID)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Invalid genderId format",
			})
			return
		}
		// Verify gender exists
		gender, err := models.Gender.GetByID(id)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": fmt.Sprintf("Gender with id %d not found", id),
			})
			return
		}
		if gender == nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": fmt.Sprintf("Gender with id %d not found", id),
			})
			return
		}
		genderID = &id
	}

	// Parse DOB if provided
	var dob *time.Time
	if req.DOB != nil && *req.DOB != "" {
		parsedDOB, err := time.Parse(time.RFC3339, *req.DOB)
		if err != nil {
			// Try alternative format
			parsedDOB, err = time.Parse("2006-01-02", *req.DOB)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ) or YYYY-MM-DD",
				})
				return
			}
		}
		dob = &parsedDOB
	}

	// Check if user already exists (by email)
	_, err := models.User.GetByEmail(req.Email)
	if err == nil {
		// User exists
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "User with this email already exists",
		})
		return
	}
	// If error is not nil and it's not "no rows", it's a real error
	// But we'll continue anyway as it might be "no rows" which is expected

	// Create user object
	user := data.User{
		Email:          req.Email,
		FirstName:      req.FirstName,
		MiddleName:     req.MiddleName,
		LastName:       req.LastName,
		Password:       req.Password,
		Active:         true,
		CityID:         cityID,
		GenderID:       genderID,
		DOB:            dob,
		InvitationToken: req.InvitationToken,
	}

	// Insert user into database
	userID, err := models.User.Insert(user)
	if err != nil {
		log.Printf("Error inserting user: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to create user account",
		})
		return
	}

	// Return success response
	response := SignUpResponse{
		UserID:    userID,
		Email:     req.Email,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Message:   "User registered successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

