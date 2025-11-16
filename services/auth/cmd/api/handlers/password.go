package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"ride-sharing/services/auth/data"
	"ride-sharing/services/auth/utils"
	"time"
)

// ForgetPasswordSendEmail handles sending password reset email
// @Summary Send password reset email
// @Description Sends a password reset email to the user with reset token
// @Tags User
// @Accept json
// @Produce json
// @Param request body ForgetPasswordSendEmailRequest true "Forget password request"
// @Success 200 {object} ForgetPasswordSendEmailResponse
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/User/forget-password-send-email [post]
func ForgetPasswordSendEmail(w http.ResponseWriter, r *http.Request) {
	if ModelsInstance == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Models not initialized",
		})
		return
	}

	var req ForgetPasswordSendEmailRequest

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
	if req.Email == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Email is required",
		})
		return
	}

	// Check if user exists
	user, err := ModelsInstance.User.GetByEmail(req.Email)
	if err != nil {
		// Don't reveal if user exists or not for security reasons
		log.Printf("User not found for email: %s", req.Email)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(ForgetPasswordSendEmailResponse{
			Message: "If the email exists, a password reset link has been sent",
			Email:   req.Email,
		})
		return
	}

	// Check if user is active
	if !user.Active {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "User account is inactive",
		})
		return
	}

	// Generate reset token
	resetToken := utils.GenerateUUID()
	
	// Generate OTP code (6 digits)
	otpCode := generateOTP(6)

	// Create verify token for password reset (expires in 1 hour)
	verifyToken := data.VerifyToken{
		UserID:          user.ID,
		Token:           resetToken,
		OTPCode:         otpCode,
		VerificationType: "password_reset",
		ExpiresAt:       time.Now().Add(1 * time.Hour),
		IsUsed:          false,
	}

	// Insert verify token into database
	_, err = ModelsInstance.VerifyToken.Insert(verifyToken)
	if err != nil {
		log.Printf("Error creating reset token: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to create reset token",
		})
		return
	}

	// Get mail service URL from environment
	mailServiceURL := os.Getenv("MAIL_SERVICE_URL")
	if mailServiceURL == "" {
		mailServiceURL = "mail-service:5002"
	}

	// Create RPC client
	mailClient, err := utils.NewMailClient(mailServiceURL)
	if err != nil {
		log.Printf("Failed to connect to mail service: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to connect to mail service",
		})
		return
	}
	defer mailClient.Close()

	// Get from address and name from environment
	from := os.Getenv("FROM_ADDRESS")
	if from == "" {
		from = "baobao22.work@gmail.com"
	}

	fromName := os.Getenv("FROM_NAME")
	if fromName == "" {
		fromName = "RideShare"
	}

	// Get reset password URL from environment or use default
	resetURL := os.Getenv("RESET_PASSWORD_URL")
	if resetURL == "" {
		resetURL = "http://localhost:3000/reset-password"
	}

	// Create email subject and message
	subject := "Reset Your Password - RideShare"
	message := fmt.Sprintf(`
		<html>
		<body>
			<h2>Password Reset Request</h2>
			<p>Hello %s,</p>
			<p>You have requested to reset your password. Please use the following OTP code to reset your password:</p>
			<p style="font-size: 24px; font-weight: bold; color: #007bff;">%s</p>
			<p>Or click the link below to reset your password:</p>
			<p><a href="%s?token=%s&otp=%s" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
			<p>This link will expire in 1 hour.</p>
			<p>If you did not request this password reset, please ignore this email.</p>
			<br>
			<p>Best regards,<br>RideShare Team</p>
		</body>
		</html>
	`, user.FirstName, otpCode, resetURL, resetToken, otpCode)

	// Send email via RPC
	err = mailClient.SendMail(from, fromName, req.Email, subject, message, nil)
	if err != nil {
		log.Printf("Failed to send password reset email: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Failed to send password reset email",
		})
		return
	}

	// Return success response
	response := ForgetPasswordSendEmailResponse{
		Message: "Password reset email sent successfully",
		Email:   req.Email,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

