package rpc

import (
	"log"
	"net/rpc"
)

// RPCPayload matches the payload structure in logger-service
type RPCPayload struct {
	Name string
	Data string
}

// LoggerClient wraps RPC client for logger service
type LoggerClient struct {
	client *rpc.Client
}

// NewLoggerClient creates a new RPC client connection to logger service
// loggerServiceURL should be in format "host:port", e.g., "logger-service:5001"
func NewLoggerClient(loggerServiceURL string) (*LoggerClient, error) {
	client, err := rpc.Dial("tcp", loggerServiceURL)
	if err != nil {
		return nil, err
	}

	return &LoggerClient{client: client}, nil
}

// LogInfo sends log information via RPC
func (lc *LoggerClient) LogInfo(name, data string) error {
	payload := RPCPayload{
		Name: name,
		Data: data,
	}

	var result string
	err := lc.client.Call("RPCServer.LogInfo", payload, &result)
	if err != nil {
		log.Printf("RPC call error: %v", err)
		return err
	}

	log.Printf("RPC Response: %s", result)
	return nil
}

// Close closes the RPC connection
func (lc *LoggerClient) Close() error {
	if lc.client != nil {
		return lc.client.Close()
	}
	return nil
}

