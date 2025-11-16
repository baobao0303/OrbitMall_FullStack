package utils

import (
	"log"
	"net/rpc"
)

// MailRPCPayload matches the payload structure in mail-service
type MailRPCPayload struct {
	From        string
	FromName    string
	To          string
	Subject     string
	Message     string
	Attachments []string
}

// MailClient wraps RPC client for mail service
type MailClient struct {
	client *rpc.Client
}

// NewMailClient creates a new RPC client connection to mail service
// mailServiceURL should be in format "host:port", e.g., "mail-service:5002"
func NewMailClient(mailServiceURL string) (*MailClient, error) {
	client, err := rpc.Dial("tcp", mailServiceURL)
	if err != nil {
		return nil, err
	}

	return &MailClient{client: client}, nil
}

// SendMail sends email via RPC
func (mc *MailClient) SendMail(from, fromName, to, subject, message string, attachments []string) error {
	payload := MailRPCPayload{
		From:        from,
		FromName:    fromName,
		To:          to,
		Subject:     subject,
		Message:     message,
		Attachments: attachments,
	}

	var result string
	err := mc.client.Call("RPCServer.SendMail", payload, &result)
	if err != nil {
		log.Printf("RPC call error: %v", err)
		return err
	}

	log.Printf("RPC Response: %s", result)
	return nil
}

// Close closes the RPC connection
func (mc *MailClient) Close() error {
	if mc.client != nil {
		return mc.client.Close()
	}
	return nil
}

