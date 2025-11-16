package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"ride-sharing/services/auth/data"
	"ride-sharing/services/auth/utils"
	"time"
)

// VerifyMail handles email verification with OTP
// @Summary Verify email
// @Description Verifies user email using verification token and OTP code
// @Tags User
// @Accept json
// @Produce json
// @Param request body VerifyMailRequest true "Verify mail request"
// @Success 200 {object} VerifyMailResponse
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Router /api/v1/User/verify-mail [post]
func VerifyMail(w http.ResponseWriter, r *http.Request) {
	if ModelsInstance == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Models not initialized",
		})
		return
	}

	var req VerifyMailRequest

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
	if req.VerificationOTPCode == "" || req.OTP == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "verificationOTPCode and otp are required",
		})
		return
	}

	// Get verify token from database
	verifyToken, err := ModelsInstance.VerifyToken.GetByToken(req.VerificationOTPCode)
	if err != nil {
		log.Printf("Error finding verify token: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid verification token",
		})
		return
	}

	// Check if token is already used
	if verifyToken.IsUsed {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Verification token has already been used",
		})
		return
	}

	// Check if token is expired
	if time.Now().After(verifyToken.ExpiresAt) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Verification token has expired",
		})
		return
	}

	// Verify OTP code
	if verifyToken.OTPCode != req.OTP {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid OTP code",
		})
		return
	}

	// Mark token as used
	err = ModelsInstance.VerifyToken.MarkAsUsed(verifyToken.ID)
	if err != nil {
		log.Printf("Error marking token as used: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Error updating verification status",
		})
		return
	}

	// Update user to mark email as verified (if you have an email_verified field)
	// For now, we'll just return success

	response := VerifyMailResponse{
		Message: "Email verified successfully",
		UserID:  verifyToken.UserID,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// ResendOTP handles resending OTP for email verification
// @Summary Resend OTP
// @Description Resends OTP code for email verification
// @Tags User
// @Accept json
// @Produce json
// @Param request body ResendOTPRequest true "Resend OTP request"
// @Success 200 {object} ResendOTPResponse
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /api/v1/User/resend-otp [post]
func ResendOTP(w http.ResponseWriter, r *http.Request) {
	if ModelsInstance == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Models not initialized",
		})
		return
	}

	var req ResendOTPRequest

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
	if req.VerificationOTPCode == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "verificationOTPCode is required",
		})
		return
	}

	// Get verify token from database
	verifyToken, err := ModelsInstance.VerifyToken.GetByToken(req.VerificationOTPCode)
	if err != nil {
		log.Printf("Error finding verify token: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Verification token not found",
		})
		return
	}

	// Check if token is already used
	if verifyToken.IsUsed {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Verification token has already been used",
		})
		return
	}

	// Check if token is expired
	if time.Now().After(verifyToken.ExpiresAt) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Verification token has expired",
		})
		return
	}

	// Generate new OTP code (6 digits)
	newOTP := generateOTP(6)

	// Generate new token
	newToken := utils.GenerateUUID()

	// Create new verify token
	newVerifyToken := data.VerifyToken{
		UserID:          verifyToken.UserID,
		Token:           newToken,
		OTPCode:         newOTP,
		VerificationType: verifyToken.VerificationType,
		ExpiresAt:       time.Now().Add(time.Minute * 15), // 15 minutes expiration
	}

	_, err = ModelsInstance.VerifyToken.Insert(newVerifyToken)
	if err != nil {
		log.Printf("Error creating new verify token: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Error generating new verification token",
		})
		return
	}

	// TODO: Send OTP via email/SMS
	// For now, we'll just log it (in production, send via email service)
	log.Printf("New OTP for user %s: %s (Token: %s)", verifyToken.UserID, newOTP, newToken)

	response := ResendOTPResponse{
		Message:           "OTP sent successfully",
		VerificationToken: newToken,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// generateOTP generates a random OTP code of specified length
func generateOTP(length int) string {
	rand.Seed(time.Now().UnixNano())
	otp := ""
	for i := 0; i < length; i++ {
		otp += fmt.Sprintf("%d", rand.Intn(10))
	}
	return otp
}



