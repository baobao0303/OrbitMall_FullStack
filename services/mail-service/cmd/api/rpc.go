package main

import (
	"log"
)

// RPCServer is the type for our RPC Server. Methods that take this as a receiver are available
// over RPC, as long as they are exported.
type RPCServer struct {
	Mailer Mail
}

// RPCPayload is the type for data we receive from RPC
type RPCPayload struct {
	From        string
	FromName    string
	To          string
	Subject     string
	Message     string
	Attachments []string
}

// SendMail sends email via RPC
func (r *RPCServer) SendMail(payload RPCPayload, resp *string) error {
	msg := Message{
		From:        payload.From,
		FromName:    payload.FromName,
		To:          payload.To,
		Subject:     payload.Subject,
		Data:        payload.Message,
		Attachments: payload.Attachments,
	}

	err := r.Mailer.SendSMTPMessage(msg)
	if err != nil {
		log.Println("error sending email via RPC", err)
		return err
	}

	// resp is the message sent back to the RPC caller
	*resp = "Email sent successfully to " + payload.To
	return nil
}

