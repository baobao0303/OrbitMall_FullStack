# RideSharing - Microservices Platform

**RideSharing** is a comprehensive microservices-based ride-sharing platform built with Go, .NET, Node.js, and Angular. The platform provides a scalable, distributed architecture for managing ride-sharing operations, user authentication, logging, and communication services.

## Project Overview

This project contains multiple microservices for a ride-sharing application:

### Backend Services

- **API Gateway** (Go) - Main API gateway service - Port 8081
- **RideSharing API Gateway** (.NET) - YARP-based reverse proxy gateway with Swagger UI - Port 8084 (local) / 8081 (K8s)
- **Auth Service** (Go) - User authentication and authorization - Port 8080
- **Logger Service** (Go) - Centralized logging with MongoDB - Port 8082
- **Mail Service** (Go) - Email notification service - Port 8083
- **Portal API Gateway** (Node.js) - Portal management API - Port 5050

### Frontend Services

- **Web Trip** (Next.js) - Trip management frontend - Port 3000
- **Web Portal** (Angular) - Admin portal frontend - Port 4000
- **Web Word Search** (Node.js/Express) - Word search game app (temporarily disabled) - Port 6001

### Mobile Services

- **Ecom Flutter** (Flutter Web) - Mobile e-commerce app (temporarily disabled) - Port 5000

## Architecture

### API Gateway Pattern

The **RideSharing API Gateway** (.NET) serves as a single entry point for all frontend applications, routing requests to appropriate microservices:

- `/api/v1/User/*` → Auth Service (sign-in, sign-up, verify-mail, etc.)
- `/api/v1/email/*` → Auth Service (email sending)
- `/api/v1/cities/*` → Auth Service (city data)
- `/api/v1/XFWToken/*` → Auth Service (token verification)
- `/api/v1/Logger/*` → Logger Service
- `/api/v1/Mail/*` → Mail Service

### Inter-Service Communication

- **RPC (Remote Procedure Call)**: Used for synchronous communication between services
  - Auth Service ↔ Mail Service (email sending)
  - Auth Service ↔ Logger Service (logging)
- **HTTP REST APIs**: Used for external client communication
- **Database**: 
  - PostgreSQL for Auth Service
  - MongoDB for Logger Service

## Trip Scheduling Flow

[![](https://mermaid.ink/img/pako:eNqNVt9v2jAQ_lcsP21qGvGjZSEPlSpaTX1YxWDVpAmpMvZBIkicOQ6UVf3fd4mdEgcKzQOK47v7vjt_d-aVcimAhnSW5vC3gJTDXcyWiiWzlOCTMaVjHmcs1eQpB3X49Xb88J1p2LLd4d4vFWdTUJuYw-HmnYo3oM5sH34fs10Cqf7Qb6oRFL-bnZLz5c3NnmRIRgrwteJGJmXOuTa2eyP0aFAPyXIyHtWO5YaxN7-PEoNJpNrM1nOSCw3Y_QuPWLq0nBvWl4h30fIos_Bhg5n6vMIVDTgVLyNN5II4LO9L65A8wrbyJimAyAkjwlbSBHBwENisQ2vl80T4pfezapbGRW1RHckkYaloILMNi9dsvgYXtHUQv2E-lXwF-hCccQ5ZE3sNiwZ0A_O2sjSw6oPTbB_nWbT3TB3dGEiykGrLlABBtCQTNp_H-sdP8sUwK3EmkGcS2-lnAQV8rUtwVCchGSvJIc8tJ2KoMGxDjxSZKIVapZZrpovc9_2j4nF7whGPifvM8jxepp8XkW2SzAQmOVKMZXoyF6_Nwq5bunetkLxp2HfIUQR8JQts5Bqz9DJGx3K1ZtZdHAVpCc9mZStkc3s-0WZtTFukOsGnB5QeE7u6PM4gKScQsozktmF_TmuN1qidUHZJa6q9V04m2RowlrV1SnbQc5GUq33YacFL_R2faHtPzxXt0ZN1O-6iXbRW1Zu4HxeiqjTJivk6ziPTcp-U1aXD-NPgZ46a21KL061Qj6kzc38_facarzCyv1tOdGgVk7OUpCipOSxjZEI9moBKWCzwKn8tQ8yojiCBGQ3xVTC1muEV_4Z2rNByuks5DbUqwKNKFsuIhgu2znFlZo79C1Cb4L36R8rmkoav9IWGvW_-1XVn0O_1-kE3GAyHgUd3-Lnb8fu9frc_xKfbvQ6CN4_-qyJ0_KDX7Q86QTDoDAfD66ve23_1IPGQ?type=png)](https://mermaid.live/edit#pako:eNqNVt9v2jAQ_lcsP21qGvGjZSEPlSpaTX1YxWDVpAmpMvZBIkicOQ6UVf3fd4mdEgcKzQOK47v7vjt_d-aVcimAhnSW5vC3gJTDXcyWiiWzlOCTMaVjHmcs1eQpB3X49Xb88J1p2LLd4d4vFWdTUJuYw-HmnYo3oM5sH34fs10Cqf7Qb6oRFL-bnZLz5c3NnmRIRgrwteJGJmXOuTa2eyP0aFAPyXIyHtWO5YaxN7-PEoNJpNrM1nOSCw3Y_QuPWLq0nBvWl4h30fIos_Bhg5n6vMIVDTgVLyNN5II4LO9L65A8wrbyJimAyAkjwlbSBHBwENisQ2vl80T4pfezapbGRW1RHckkYaloILMNi9dsvgYXtHUQv2E-lXwF-hCccQ5ZE3sNiwZ0A_O2sjSw6oPTbB_nWbT3TB3dGEiykGrLlABBtCQTNp_H-sdP8sUwK3EmkGcS2-lnAQV8rUtwVCchGSvJIc8tJ2KoMGxDjxSZKIVapZZrpovc9_2j4nF7whGPifvM8jxepp8XkW2SzAQmOVKMZXoyF6_Nwq5bunetkLxp2HfIUQR8JQts5Bqz9DJGx3K1ZtZdHAVpCc9mZStkc3s-0WZtTFukOsGnB5QeE7u6PM4gKScQsozktmF_TmuN1qidUHZJa6q9V04m2RowlrV1SnbQc5GUq33YacFL_R2faHtPzxXt0ZN1O-6iXbRW1Zu4HxeiqjTJivk6ziPTcp-U1aXD-NPgZ46a21KL061Qj6kzc38_facarzCyv1tOdGgVk7OUpCipOSxjZEI9moBKWCzwKn8tQ8yojiCBGQ3xVTC1muEV_4Z2rNByuks5DbUqwKNKFsuIhgu2znFlZo79C1Cb4L36R8rmkoav9IWGvW_-1XVn0O_1-kE3GAyHgUd3-Lnb8fu9frc_xKfbvQ6CN4_-qyJ0_KDX7Q86QTDoDAfD66ve23_1IPGQ)

## Services Architecture

### Backend Services

| Service | Technology | Port (Local) | Port (K8s) | Description |
|---------|-----------|--------------|------------|-------------|
| **api-gateway** | Go | 8081 | 8081 | Main API gateway |
| **RideSharing API Gateway** | .NET (YARP) | 8084 | 8081 | Reverse proxy gateway with Swagger UI |
| **auth** | Go | 8080 | 8080 | User authentication & authorization |
| **logger-service** | Go | 8082 | 8082 | Centralized logging (MongoDB) |
| **mail-service** | Go | 8083 | 8083 | Email notification service |
| **portal-api-gateway** | Node.js | 5050 | 5050 | Portal management API |

### Frontend Services

| Service | Technology | Port | Description |
|---------|-----------|------|-------------|
| **web-trip** | Next.js | 3000 | Trip management UI |
| **web-portal** | Angular | 4000 | Admin portal UI |
| **web-ng-word-search** | Node.js/Express | 6001 | Word search game (disabled) |

### Mobile Services

| Service | Technology | Port | Description |
|---------|-----------|------|-------------|
| **ecom-flutter** | Flutter Web | 5000 | Mobile e-commerce app (disabled) |

## Installation

The project requires the following tools:

- Docker & Docker Compose
- Go 1.23+
- Node.js (LTS)
- .NET SDK 8.0+
- Flutter SDK (for mobile app)
- Tilt
- Kubernetes cluster (Minikube recommended)
- kubectl

### MacOS

1. Install Homebrew from [Homebrew's official website](https://brew.sh/)

2. Install Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop/)

3. Install Minikube from [Minikube's official website](https://minikube.sigs.k8s.io/docs/)

4. Install Tilt from [Tilt's official website](https://tilt.dev/)

5. Install Go:
```bash
brew install go
```

6. Install Node.js:
```bash
brew install node
```

7. Install .NET SDK:
```bash
brew install --cask dotnet-sdk
```

8. Install Flutter SDK:
```bash
brew install --cask flutter
```

9. Install kubectl:
```bash
brew install kubectl
```

### Windows (WSL)

1. Install WSL from [Microsoft's official website](https://learn.microsoft.com/en-us/windows/wsl/install)

2. Install Docker Desktop for Windows

3. Install Minikube

4. Install Tilt

5. Install Go on WSL:
```bash
wget https://dl.google.com/go/go1.23.0.linux-amd64.tar.gz
sudo tar -xvf go1.23.0.linux-amd64.tar.gz
sudo mv go /usr/local

# Add to PATH in ~/.bashrc
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```

6. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

7. Install .NET SDK:
```bash
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

8. Install Flutter SDK:
```bash
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.0-stable.tar.xz
tar xf flutter_linux_3.16.0-stable.tar.xz
sudo mv flutter /usr/local/
echo 'export PATH="/usr/local/flutter/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
flutter config --enable-web
```

9. Install kubectl

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration (see [README_ENV.md](./README_ENV.md) for details)

## Run

### Using Tilt (Recommended)

Start all services using Tilt:

```bash
tilt up
```

This will start:
- API Gateway (Go) on port 8081
- Auth Service on port 8080
- Logger Service on port 8082
- Mail Service on port 8083
- Portal API Gateway (Node.js) on port 5050
- Web Trip (Next.js) on port 3000
- Web Portal (Angular) on port 4000

**Note**: RideSharing API Gateway (.NET) is disabled in Tilt to avoid port conflicts. Run it locally when needed.

### Run RideSharing API Gateway Locally

For local development and Swagger testing:

```bash
cd services/api-net-gateway/RideSharing.Api
dotnet run --urls "http://localhost:8084"
```

Access Swagger UI at: `http://localhost:8084/swagger`

## Access Services

After running `tilt up`, you can access:

### Frontend Applications
- **Trip Management**: http://localhost:3000
- **Admin Portal**: http://localhost:4000
- **Word Search Game**: http://localhost:6001 - **Temporarily disabled**
- **Mobile App (Flutter Web)**: http://localhost:5000 - **Temporarily disabled**

### Backend APIs
- **API Gateway (Go)**: http://localhost:8081
- **RideSharing API Gateway (.NET)**: http://localhost:8084 (run locally)
  - Swagger UI: http://localhost:8084/swagger
  - Health Check: http://localhost:8084/health
  - API Info: http://localhost:8084/api/info
- **Portal API**: http://localhost:5050
- **Auth Service**: http://localhost:8080
  - Swagger: http://localhost:8080/swagger
- **Logger Service**: http://localhost:8082
- **Mail Service**: http://localhost:8083

## API Gateway Usage

The **RideSharing API Gateway** provides a single entry point for all microservices. Frontend applications only need to know one URL:

```typescript
// Angular environment
export const environment = {
  URI: "http://localhost:8084/api/v1", // Development
  // URI: "http://api-net-gateway:8081/api/v1",  // Kubernetes
};
```

All requests are automatically routed:
- `POST /api/v1/User/sign-up` → Auth Service
- `POST /api/v1/User/sign-in` → Auth Service
- `POST /api/v1/Logger/log` → Logger Service
- `POST /api/v1/Mail/send` → Mail Service

## Monitor

```bash
# View all pods
kubectl get pods

# View all services
kubectl get services

# View logs
kubectl logs <pod-name>

# Open Kubernetes dashboard
minikube dashboard
```

## Development

### Project Structure

```
├── services/
│   ├── api-gateway/          # Go API Gateway
│   ├── api-net-gateway/      # .NET API Gateway (RideSharing)
│   │   └── RideSharing.Api/ # Main API Gateway project
│   ├── auth/                 # Authentication service
│   ├── logger-service/      # Logging service
│   ├── mail-service/         # Email service
│   ├── portal-api-gateway/  # Node.js Portal API
│   └── trip-service/         # Trip management service
├── frontend/
│   ├── web-trip/             # Next.js Trip UI
│   ├── web-portal/           # Angular Admin Portal
│   └── web-ng-word-search/   # Node.js Word Search Game
├── mobile/
│   └── ecom-flutter/         # Flutter Mobile App
├── infra/
│   ├── development/          # Development configs (K8s, Docker)
│   └── production/           # Production configs
└── shared/                   # Shared Go packages
    ├── env/                  # Environment variables
    └── rpc/                  # RPC definitions
```

### Local Development

All services are configured to run locally with hot reloading through Tilt. Changes to source code will automatically trigger rebuilds and deployments.

### Database Migrations

Auth service automatically runs migrations on startup. Migration files are located in `services/auth/migrations/`.

## Production Deployment

For production deployment:

1. **Build Docker Images** for all services
2. **Push to Container Registry** (Docker Hub, AWS ECR, Google GCR, etc.)
3. **Deploy to Kubernetes** using the production manifests in `infra/production/k8s/`

### Build Commands

```bash
# Build API Gateway (Go)
docker build -t your-registry/api-gateway:latest -f infra/production/docker/api-gateway.Dockerfile .

# Build RideSharing API Gateway (.NET)
docker build -t your-registry/api-net-gateway:latest -f infra/production/docker/api-net-gateway.Dockerfile .

# Build Auth Service
docker build -t your-registry/auth:latest -f infra/production/docker/auth.Dockerfile .

# Build Logger Service
docker build -t your-registry/logger-service:latest -f infra/production/docker/logger-service.Dockerfile .

# Build Mail Service
docker build -t your-registry/mail-service:latest -f infra/production/docker/mail-service.Dockerfile .

# Build Portal API Gateway (Node.js)
docker build -t your-registry/portal-api-gateway:latest -f infra/production/docker/portal-api-gateway.Dockerfile .

# Build Web Trip (Next.js)
docker build -t your-registry/web-trip:latest -f infra/production/docker/web.Dockerfile .
```

### Deploy to Kubernetes

```bash
# Apply production configurations
kubectl apply -f infra/production/k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

## Technology Stack

- **Backend**: Go, .NET 8.0, Node.js
- **Frontend**: Next.js, Angular, Flutter
- **Databases**: PostgreSQL, MongoDB
- **API Gateway**: YARP (Yet Another Reverse Proxy)
- **Container Orchestration**: Kubernetes
- **Development Tools**: Tilt, Docker, Minikube
- **Documentation**: Swagger/OpenAPI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `tilt up`
5. Submit a pull request

## License

This project is licensed under the MIT License.

