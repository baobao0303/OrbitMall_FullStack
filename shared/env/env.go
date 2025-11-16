/*
Package env provides a simple way to get environment variables.
It automatically loads .env file from the project root if it exists.
*/
package env

import (
	"bufio"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

var loaded bool

func init() {
	loadEnvFile()
}

// loadEnvFile loads environment variables from .env file in project root
func loadEnvFile() {
	if loaded {
		return
	}

	// Try to find .env file starting from current directory and going up
	dir, err := os.Getwd()
	if err != nil {
		return
	}

	// Look for .env file in current directory and parent directories (max 5 levels up)
	for i := 0; i < 5; i++ {
		envPath := filepath.Join(dir, ".env")
		if _, err := os.Stat(envPath); err == nil {
			loadEnvFromFile(envPath)
			loaded = true
			return
		}
		dir = filepath.Dir(dir)
		if dir == filepath.Dir(dir) {
			break // Reached root
		}
	}

	loaded = true
}

// loadEnvFromFile reads .env file and sets environment variables
func loadEnvFromFile(filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		
		// Skip empty lines and comments
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		// Parse KEY=VALUE
		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}

		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])

		// Remove quotes if present
		if len(value) >= 2 && ((value[0] == '"' && value[len(value)-1] == '"') || 
			(value[0] == '\'' && value[len(value)-1] == '\'')) {
			value = value[1 : len(value)-1]
		}

		// Only set if not already set (environment variables take precedence)
		if _, exists := os.LookupEnv(key); !exists {
			os.Setenv(key, value)
		}
	}
}

func GetString(key, fallback string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	return val
}

func GetInt(key string, fallback int) int {
	val, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	valAsInt, err := strconv.Atoi(val)
	if err != nil {
		return fallback
	}

	return valAsInt
}

func GetBool(key string, fallback bool) bool {
	val, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	boolVal, err := strconv.ParseBool(val)
	if err != nil {
		return fallback
	}

	return boolVal
}
