# Hướng dẫn kết nối PostgreSQL với DBeaver

## Thông tin kết nối

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `users`
- **Username**: `postgres`
- **Password**: `password`

## Cách 1: Kết nối với Docker Compose

### Bước 1: Khởi động PostgreSQL

```bash
cd services/auth
docker-compose up -d postgres
```

### Bước 2: Kiểm tra PostgreSQL đang chạy

```bash
docker ps | grep postgres
```

### Bước 3: Kết nối từ DBeaver

1. Mở DBeaver
2. Click **New Database Connection** (hoặc `Ctrl+Shift+N`)
3. Chọn **PostgreSQL**
4. Điền thông tin:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `users`
   - **Username**: `postgres`
   - **Password**: `password`
5. Click **Test Connection** để kiểm tra
6. Click **Finish** để lưu

## Cách 2: Kết nối với Kubernetes (Tilt)

### Bước 1: Port forward PostgreSQL service

**⚠️ QUAN TRỌNG**: PostgreSQL trong Kubernetes là ClusterIP, không expose ra ngoài. Bạn PHẢI port-forward trước khi kết nối DBeaver.

**Chạy lệnh này trong terminal:**

```bash
kubectl port-forward service/postgres 5432:5432
```

**Hoặc dùng script helper:**

```bash
cd services/auth
./connect-postgres.sh
```

**QUAN TRỌNG**: Giữ terminal này chạy để duy trì port forwarding. Nếu đóng terminal, kết nối sẽ bị ngắt.

**Kiểm tra port-forward đang chạy:**

```bash
lsof -i :5432
```

### Bước 2: Kết nối từ DBeaver

Sử dụng cùng thông tin như Cách 1:

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `users`
- **Username**: `postgres`
- **Password**: `password`

## Cách 3: Expose PostgreSQL Service (Kubernetes)

Nếu muốn kết nối trực tiếp mà không cần port-forward:

### Tạo NodePort Service

```bash
kubectl patch service postgres -p '{"spec":{"type":"NodePort","ports":[{"port":5432,"targetPort":5432,"nodePort":30432}]}}'
```

Sau đó kết nối với:

- **Host**: `localhost` (hoặc minikube IP)
- **Port**: `30432` (nodePort)

## Kiểm tra kết nối

Sau khi kết nối thành công, bạn có thể:

1. Xem database `users`
2. Xem table `users` (nếu đã tạo)
3. Query dữ liệu

## Troubleshooting

### Lỗi: Connection refused

- Kiểm tra PostgreSQL đang chạy: `docker ps` hoặc `kubectl get pods`
- Kiểm tra port 5432 có bị chiếm không: `lsof -i :5432`

### Lỗi: Authentication failed

- Kiểm tra username/password đúng: `postgres` / `password`
- Kiểm tra database name: `users`

### Lỗi: Database does not exist

- Tạo database: `docker exec -it <postgres-container> psql -U postgres -c "CREATE DATABASE users;"`
- Hoặc trong Kubernetes: `kubectl exec -it <postgres-pod> -- psql -U postgres -c "CREATE DATABASE users;"`

## Tạo table users (nếu chưa có)

Nếu database chưa có table `users`, chạy SQL sau trong DBeaver:

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```
