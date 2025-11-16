# Environment Variables Configuration

## Overview

This project uses a centralized `.env` file at the root directory for managing environment variables across all services.

## Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env`** with your actual configuration:
   - Database credentials
   - JWT secrets
   - Service ports
   - Mail service configuration
   - etc.

## How It Works

### For Go Services

The `shared/env` package automatically loads the `.env` file when imported. All Go services can use:

```go
import "ride-sharing/shared/env"

// Get environment variable with fallback
dsn := env.GetString("DSN", "default-value")
jwtSecret := env.GetString("JWT_SECRET", "fallback-secret")
port := env.GetInt("PORT", 8080)
```

### For Node.js/TypeScript Services

Use `dotenv` package (already configured in portal-api-gateway):

```typescript
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); // Adjust path as needed
```

### For .NET Services

Use `Microsoft.Extensions.Configuration` with environment variables or appsettings.json.

## Environment Variables

### Database
- `DSN` - PostgreSQL connection string for Auth Service
- `MONGO_URL` - MongoDB connection string for Logger Service

### JWT
- `JWT_SECRET` - Secret key for JWT token signing
- `JWT_ACCESS_TOKEN_EXPIRY` - Access token expiration (default: 1h)
- `JWT_REFRESH_TOKEN_EXPIRY` - Refresh token expiration (default: 168h)

### Service Ports
- `AUTH_SERVICE_PORT` - Auth service port (default: 8080)
- `LOGGER_SERVICE_PORT` - Logger service port (default: 8082)
- `API_GATEWAY_PORT` - API Gateway port (default: 8081)

### Mail Service
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, etc.

## Security Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- Use `.env.example` as a template
- In production, use Kubernetes Secrets or environment-specific configs
- Rotate `JWT_SECRET` regularly in production

## Kubernetes

For Kubernetes deployments, environment variables are set in:
- `infra/development/k8s/app-config.yaml` (ConfigMap)
- Individual service deployment YAML files

