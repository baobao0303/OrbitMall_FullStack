package main

import (
	"log"
	"log-service/data"
	"time"
)

// RPCServer is the type for our RPC Server. Methods that take this as a receiver are available
// over RPC, as long as they are exported.
type RPCServer struct {
	Models data.Models
}

// RPCPayload is the type for data we receive from RPC
type RPCPayload struct {
	Name string
	Data string
}

// LogInfo writes our payload to mongo
func (r *RPCServer) LogInfo(payload RPCPayload, resp *string) error {
	event := data.LogEntry{
		Name:      payload.Name,
		Data:      payload.Data,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := r.Models.LogEntry.Insert(event)
	if err != nil {
		log.Println("error writing to mongo via RPC", err)
		return err
	}

	// resp is the message sent back to the RPC caller
	*resp = "Processed payload via RPC: " + payload.Name
	return nil
}
