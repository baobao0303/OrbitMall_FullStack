package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"ride-sharing/services/auth/data"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// SignIn handles user sign-in
// @Summary User sign-in
// @Description Authenticates a user with userName, password, and optional code
// @Tags User
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param request body SignInRequest true "Sign-in request"
// @Success 200 {object} SignInResponse
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Router /api/v1/User/sign-in [post]
func SignIn(w http.ResponseWriter, r *http.Request) {
	if ModelsInstance == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Models not initialized",
		})
		return
	}

	var req SignInRequest

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
	if req.UserName == "" || req.Password == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "userName and password are required",
		})
		return
	}

	// 1. Find user by email (userName)
	user, err := ModelsInstance.User.GetByEmail(req.UserName)
	if err != nil {
		log.Printf("Error finding user: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid credentials",
		})
		return
	}

	// 2. Check if user is active
	if !user.Active {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "User account is inactive",
		})
		return
	}

	// 3. Verify password using bcrypt
	userModel := data.User{Password: user.Password}
	passwordMatches, err := userModel.PasswordMatches(req.Password)
	if err != nil {
		log.Printf("Error verifying password: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Error verifying password",
		})
		return
	}

	if !passwordMatches {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid credentials",
		})
		return
	}

	// 4. TODO: Verify code if provided (2FA)
	// if req.Code != "" {
	//     // Implement 2FA verification logic here
	// }

	// 5. Generate JWT tokens
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "your-secret-key-change-in-production" // Default secret, should be set via .env file
	}

	// Generate access token
	accessToken, err := generateAccessToken(user.ID, user.Email, jwtSecret)
	if err != nil {
		log.Printf("Error generating access token: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Error generating access token",
		})
		return
	}

	// Generate refresh token
	refreshToken, err := generateRefreshToken(user.ID, jwtSecret)
	if err != nil {
		log.Printf("Error generating refresh token: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Error generating refresh token",
		})
		return
	}

	// 6. Return tokens and user info
	response := SignInResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresIn:    3600, // 1 hour
		UserID:       user.ID,
		UserName:     user.Email,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// generateAccessToken generates a JWT access token
func generateAccessToken(userID, email, secret string) (string, error) {
	claims := jwt.MapClaims{
		"sub":   userID,
		"email": email,
		"exp":   time.Now().Add(time.Hour * 1).Unix(), // 1 hour expiration
		"iat":   time.Now().Unix(),
		"type":  "access",
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// generateRefreshToken generates a JWT refresh token
func generateRefreshToken(userID, secret string) (string, error) {
	claims := jwt.MapClaims{
		"sub":  userID,
		"exp":  time.Now().Add(time.Hour * 24 * 7).Unix(), // 7 days expiration
		"iat":  time.Now().Unix(),
		"type": "refresh",
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

