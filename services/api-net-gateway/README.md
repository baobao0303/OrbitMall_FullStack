# RideSharing API Gateway Service

API Gateway sử dụng YARP (Yet Another Reverse Proxy) để route requests đến các microservices.

## Cấu hình

### Routes

**Auth Service (port 8080):**

- `/api/v1/User/*` → User endpoints (sign-in, sign-up, verify-mail, etc.)
- `/api/v1/email/*` → Email sending endpoints
- `/api/v1/cities/*` → City data endpoints
- `/api/v1/XFWToken/*` → Token verification and renewal

**Logger Service (port 8082):**

- `/api/v1/Logger/*` → Logging endpoints

**Mail Service (port 8083):**

- `/api/v1/Mail/*` → Mail service endpoints

### Development

- **Port**: `8084` (local development)
- **Health Check**: `http://localhost:8084/health`
- **Swagger UI**: `http://localhost:8084/swagger`
- **API Info**: `http://localhost:8084/api/info`

### Kubernetes

- **Service Name**: `api-net-gateway`
- **Port**: `8081`
- Trong K8s, services được resolve qua DNS:
  - `auth:8080`
  - `logger-service:8082`
  - `mail-service:8083`

## Sử dụng từ Frontend

Frontend chỉ cần một base URL:

```typescript
// Angular environment
export const environment = {
  URI: "http://localhost:8084/api/v1", // Development
  // URI: "http://api-net-gateway:8081/api/v1",  // Kubernetes
};

// Tất cả requests đi qua API Gateway:
// POST /api/v1/User/sign-up → Auth Service
// POST /api/v1/User/sign-in → Auth Service
// POST /api/v1/Logger/log → Logger Service
// POST /api/v1/Mail/send → Mail Service
```

## Swagger Documentation

Truy cập Swagger UI để test các endpoints:

- **Development**: `http://localhost:8084/swagger`
- **Kubernetes**: `http://api-net-gateway:8081/swagger`

Swagger UI cho phép:

- Xem tất cả các routes được proxy
- Test các endpoints trực tiếp từ browser
- Xem request/response schemas
- Test với JWT Bearer authentication

## Lợi ích

1. **Single Entry Point**: Frontend chỉ cần biết một URL
2. **Centralized Routing**: Dễ quản lý và thay đổi routing
3. **Load Balancing**: YARP hỗ trợ load balancing
4. **Health Checks**: Có thể thêm health checks cho từng service
5. **Request Transformation**: Có thể transform requests/responses nếu cần
