package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"ride-sharing/services/auth/utils"
)

// SendEmailRequest represents the request body for sending email
type SendEmailRequest struct {
	To          string   `json:"to" example:"user@example.com"`
	Subject     string   `json:"subject" example:"Welcome to RideShare"`
	Message     string   `json:"message" example:"Welcome to our platform!"`
	From        string   `json:"from,omitempty" example:"noreply@rideshare.com"`
	FromName    string   `json:"fromName,omitempty" example:"RideShare"`
	Attachments []string `json:"attachments,omitempty"`
}

// SendEmailResponse represents the response for sending email
type SendEmailResponse struct {
	Message string `json:"message" example:"Email sent successfully"`
	To      string `json:"to" example:"user@example.com"`
}

// SendEmail handles sending email via RPC to mail service
// @Summary Send email
// @Description Sends an email using the mail service via RPC
// @Tags Email
// @Accept json
// @Produce json
// @Param request body SendEmailRequest true "Email request"
// @Success 200 {object} SendEmailResponse
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/email/send [post]
func SendEmail(w http.ResponseWriter, r *http.Request) {
	var req SendEmailRequest

	// Decode request body
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&req); err != nil {
		log.Printf("Error decoding request: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if req.To == "" {
		http.Error(w, "Email 'to' field is required", http.StatusBadRequest)
		return
	}
	if req.Subject == "" {
		http.Error(w, "Email 'subject' field is required", http.StatusBadRequest)
		return
	}
	if req.Message == "" {
		http.Error(w, "Email 'message' field is required", http.StatusBadRequest)
		return
	}

	// Get mail service URL from environment
	mailServiceURL := os.Getenv("MAIL_SERVICE_URL")
	if mailServiceURL == "" {
		mailServiceURL = "mail-service:5002" // Default to service name in Kubernetes
	}

	// Create RPC client
	mailClient, err := utils.NewMailClient(mailServiceURL)
	if err != nil {
		log.Printf("Failed to connect to mail service: %v", err)
		http.Error(w, "Failed to connect to mail service", http.StatusInternalServerError)
		return
	}
	defer mailClient.Close()

	// Set defaults
	from := req.From
	if from == "" {
		from = os.Getenv("FROM_ADDRESS")
		if from == "" {
			from = "baobao22.work@gmail.com" // Default from address
		}
	}

	fromName := req.FromName
	if fromName == "" {
		fromName = os.Getenv("FROM_NAME")
		if fromName == "" {
			fromName = "RideShare" // Default from name
		}
	}

	// Send email via RPC
	err = mailClient.SendMail(from, fromName, req.To, req.Subject, req.Message, req.Attachments)
	if err != nil {
		log.Printf("Failed to send email via RPC: %v", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	// Return success response
	response := SendEmailResponse{
		Message: "Email sent successfully",
		To:      req.To,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

