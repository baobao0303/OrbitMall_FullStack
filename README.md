# Microservices Project

This is a microservices-based ride-sharing application built with Go, .NET, Node.js, and Angular.

## Project overview

This project contains multiple microservices for a ride-sharing application:

- **API Gateway** (Go) - Main API gateway service
- **Portal API Gateway** (Node.js) - Portal management API
- **API .NET Gateway** (.NET) - Additional API gateway service (temporarily disabled)
- **Web Trip** (Next.js) - Trip management frontend
- **Web Portal** (Angular) - Admin portal frontend
- **Web Word Search** (Node.js/Express) - Word search game app (temporarily disabled)
- **Ecom Flutter** (Flutter) - Mobile e-commerce app (temporarily disabled)

## Trip Scheduling Flow

[![](https://mermaid.ink/img/pako:eNqNVt9v2jAQ_lcsP21qGvGjZSEPlSpaTX1YxWDVpAmpMvZBIkicOQ6UVf3fd4mdEgcKzQOK47v7vjt_d-aVcimAhnSW5vC3gJTDXcyWiiWzlOCTMaVjHmcs1eQpB3X49Xb88J1p2LLd4d4vFWdTUJuYw-HmnYo3oM5sH34fs10Cqf7Qb6oRFL-bnZLz5c3NnmRIRgrwteJGJmXOuTa2eyP0aFAPyXIyHtWO5YaxN7-PEoNJpNrM1nOSCw3Y_QuPWLq0nBvWl4h30fIos_Bhg5n6vMIVDTgVLyNN5II4LO9L65A8wrbyJimAyAkjwlbSBHBwENisQ2vl80T4pfezapbGRW1RHckkYaloILMNi9dsvgYXtHUQv2E-lXwF-hCccQ5ZE3sNiwZ0A_O2sjSw6oPTbB_nWbT3TB3dGEiykGrLlABBtCQTNp_H-sdP8sUwK3EmkGcS2-lnAQV8rUtwVCchGSvJIc8tJ2KoMGxDjxSZKIVapZZrpovc9_2j4nF7whGPifvM8jxepp8XkW2SzAQmOVKMZXoyF6_Nwq5bunetkLxp2HfIUQR8JQts5Bqz9DJGx3K1ZtZdHAVpCc9mZStkc3s-0WZtTFukOsGnB5QeE7u6PM4gKScQsozktmF_TmuN1qidUHZJa6q9V04m2RowlrV1SnbQc5GUq33YacFL_R2faHtPzxXt0ZN1O-6iXbRW1Zu4HxeiqjTJivk6ziPTcp-U1aXD-NPgZ46a21KL061Qj6kzc38_facarzCyv1tOdGgVk7OUpCipOSxjZEI9moBKWCzwKn8tQ8yojiCBGQ3xVTC1muEV_4Z2rNByuks5DbUqwKNKFsuIhgu2znFlZo79C1Cb4L36R8rmkoav9IWGvW_-1XVn0O_1-kE3GAyHgUd3-Lnb8fu9frc_xKfbvQ6CN4_-qyJ0_KDX7Q86QTDoDAfD66ve23_1IPGQ?type=png)](https://mermaid.live/edit#pako:eNqNVt9v2jAQ_lcsP21qGvGjZSEPlSpaTX1YxWDVpAmpMvZBIkicOQ6UVf3fd4mdEgcKzQOK47v7vjt_d-aVcimAhnSW5vC3gJTDXcyWiiWzlOCTMaVjHmcs1eQpB3X49Xb88J1p2LLd4d4vFWdTUJuYw-HmnYo3oM5sH34fs10Cqf7Qb6oRFL-bnZLz5c3NnmRIRgrwteJGJmXOuTa2eyP0aFAPyXIyHtWO5YaxN7-PEoNJpNrM1nOSCw3Y_QuPWLq0nBvWl4h30fIos_Bhg5n6vMIVDTgVLyNN5II4LO9L65A8wrbyJimAyAkjwlbSBHBwENisQ2vl80T4pfezapbGRW1RHckkYaloILMNi9dsvgYXtHUQv2E-lXwF-hCccQ5ZE3sNiwZ0A_O2sjSw6oPTbB_nWbT3TB3dGEiykGrLlABBtCQTNp_H-sdP8sUwK3EmkGcS2-lnAQV8rUtwVCchGSvJIc8tJ2KoMGxDjxSZKIVapZZrpovc9_2j4nF7whGPifvM8jxepp8XkW2SzAQmOVKMZXoyF6_Nwq5bunetkLxp2HfIUQR8JQts5Bqz9DJGx3K1ZtZdHAVpCc9mZStkc3s-0WZtTFukOsGnB5QeE7u6PM4gKScQsozktmF_TmuN1qidUHZJa6q9V04m2RowlrV1SnbQc5GUq33YacFL_R2faHtPzxXt0ZN1O-6iXbRW1Zu4HxeiqjTJivk6ziPTcp-U1aXD-NPgZ46a21KL061Qj6kzc38_facarzCyv1tOdGgVk7OUpCipOSxjZEI9moBKWCzwKn8tQ8yojiCBGQ3xVTC1muEV_4Z2rNByuks5DbUqwKNKFsuIhgu2znFlZo79C1Cb4L36R8rmkoav9IWGvW_-1XVn0O_1-kE3GAyHgUd3-Lnb8fu9frc_xKfbvQ6CN4_-qyJ0_KDX7Q86QTDoDAfD66ve23_1IPGQ)

## Services Architecture

### Backend Services

- **api-gateway** (Go) - Port 8081 - Main API gateway
- **portal-api-gateway** (Node.js) - Port 5050 - Portal management API
- **api-net-gateway** (.NET) - Port 8080 - Additional API gateway (temporarily disabled)

### Frontend Services

- **web-trip** (Next.js) - Port 3000 - Trip management UI
- **web-portal** (Angular) - Port 4000 - Admin portal UI
- **web-ng-word-search** (Node.js/Express) - Port 6001 - Word search game (temporarily disabled)

### Mobile Services

- **ecom-flutter** (Flutter Web) - Port 5000 - Mobile e-commerce app (temporarily disabled)

## Installation

The project requires the following tools:

- Docker
- Go
- Node.js
- .NET SDK
- Flutter SDK
- Tilt
- A local Kubernetes cluster

### MacOS

1. Install Homebrew from [Homebrew's official website](https://brew.sh/)

2. Install Docker for Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop/)

3. Install Minikube from [Minikube's official website](https://minikube.sigs.k8s.io/docs/)

4. Install Tilt from [Tilt's official website](https://tilt.dev/)

5. Install Go on MacOS using Homebrew:

```bash
brew install go
```

6. Install Node.js:

```bash
brew install node
```

7. Install .NET SDK (9.0):

```bash
brew install --cask dotnet-sdk
```

8. Install Flutter SDK:

```bash
brew install --cask flutter
```

9. Make sure [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) is installed.

### Windows (WSL)

This is a step by step guide to install Go on Windows using WSL.
You can either install via WSL (recommended) or using powershell (not covered, but similar to WSL).

1. Install WSL for Windows from [Microsoft's official website](https://learn.microsoft.com/en-us/windows/wsl/install)

2. Install Docker for Windows from [Docker's official website](https://www.docker.com/products/docker-desktop/)

3. Install Minikube from [Minikube's official website](https://minikube.sigs.k8s.io/docs/)

4. Install Tilt from [Tilt's official website](https://tilt.dev/)

5. Install Go on Windows using WSL:

```bash
# 1. Get the Go binary
wget https://dl.google.com/go/go1.23.0.linux-amd64.tar.gz

# 2. Extract the tarball
sudo tar -xvf go1.23.0.linux-amd64.tar.gz

# 3. Move the extracted folder to /usr/local
sudo mv go /usr/local

# 4. Add Go to PATH (following the steps from the video)
cd ~
explorer.exe .

# Open .bashrc file and add following lines at the bottom and save the file.
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH

# 5. Verify the installation
go version
```

6. Install Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

7. Install .NET SDK (9.0):

```bash
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y dotnet-sdk-9.0
```

8. Install Flutter SDK:

```bash
# Download Flutter SDK
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.0-stable.tar.xz
tar xf flutter_linux_3.16.0-stable.tar.xz
sudo mv flutter /usr/local/

# Add to PATH
echo 'export PATH="/usr/local/flutter/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Enable Flutter web
flutter config --enable-web
```

9. Make sure [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) is installed.

## Run

Start all services using Tilt:

```bash
tilt up
```

This will start:

- API Gateway (Go) on port 8081
- Portal API Gateway (Node.js) on port 5050
- API .NET Gateway (.NET) on port 8080 - **Temporarily disabled**
- Web Trip (Next.js) on port 3000
- Web Portal (Angular) on port 4000
- Web Word Search (Node.js/Express) on port 6001 - **Temporarily disabled**
- Ecom Flutter (Flutter Web) on port 5000 - **Temporarily disabled**

## Access Services

After running `tilt up`, you can access:

- **Trip Management**: http://localhost:3000
- **Admin Portal**: http://localhost:4000
- **Word Search Game**: http://localhost:6001 - **Temporarily disabled**
- **Mobile App (Flutter Web)**: http://localhost:5000 - **Temporarily disabled**
- **API Gateway**: http://localhost:8081
- **Portal API**: http://localhost:5050
- **.NET API Gateway**: http://localhost:8080 - **Temporarily disabled**

## Monitor

```bash
kubectl get pods
```

or

```bash
minikube dashboard
```

## Development

### Project Structure

```
├── services/
│   ├── api-gateway/          # Go API Gateway
│   ├── portal-api-gateway/   # Node.js Portal API
│   └── api-net-gateway/      # .NET API Gateway
├── frontend/
│   ├── web-trip/             # Next.js Trip UI
│   ├── web-portal/           # Angular Admin Portal
│   └── web-ng-word-search/   # Node.js Word Search Game
├── mobile/
│   └── ecom-flutter/         # Flutter Mobile App (disabled)
├── infra/
│   ├── development/          # Development configs
│   └── production/           # Production configs
└── shared/                   # Shared Go packages
```

### Local Development

All services are configured to run locally with hot reloading through Tilt. Changes to source code will automatically trigger rebuilds and deployments.

## Production Deployment

For production deployment, you'll need to:

1. **Build Docker Images** for all services
2. **Push to Container Registry** (Docker Hub, AWS ECR, Google GCR, etc.)
3. **Deploy to Kubernetes** using the production manifests in `infra/production/k8s/`

### Build Commands

```bash
# Build API Gateway (Go)
docker build -t your-registry/api-gateway:latest -f infra/production/docker/api-gateway.Dockerfile .

# Build Portal API Gateway (Node.js)
docker build -t your-registry/portal-api-gateway:latest -f infra/production/docker/portal-api-gateway.Dockerfile .

# Build API .NET Gateway (.NET) - Temporarily disabled
# docker build -t your-registry/api-net-gateway:latest -f infra/production/docker/api-net-gateway.Dockerfile .

# Build Web Trip (Next.js)
docker build -t your-registry/web-trip:latest -f infra/production/docker/web.Dockerfile .

# Build Web Word Search (Node.js/Express) - Temporarily disabled
# docker build -t your-registry/web-ng-word-search:latest -f infra/production/docker/web-ng-word-search.Dockerfile .

# Build Ecom Flutter (Flutter Web) - Temporarily disabled
# docker build -t your-registry/ecom-flutter:latest -f infra/production/docker/ecom-flutter.Dockerfile .
```

### Deploy to Kubernetes

```bash
# Apply production configurations
kubectl apply -f infra/production/k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `tilt up`
5. Submit a pull request

## License

This project is licensed under the MIT License.
