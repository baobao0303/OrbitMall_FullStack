# Auth Service - Local Development Guide

## Prerequisites

1. **Go 1.24+** installed
2. **PostgreSQL 14+** running locally or via Docker
3. **Environment variables** configured

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. Start PostgreSQL database:

```bash
cd services/auth
docker-compose up -d postgres
```

2. Create database and run migrations:

```bash
# Connect to PostgreSQL and create database
docker exec -it auth-postgres-1 psql -U postgres -c "CREATE DATABASE users;"

# Run migration
docker exec -i auth-postgres-1 psql -U postgres -d users < migrations/001_create_users_table.sql
```

3. Set environment variable and run:

```bash
export DSN="host=localhost port=5432 user=postgres password=password dbname=users sslmode=disable"
cd cmd/api
go run .
```

### Option 2: Manual Setup

1. **Install dependencies:**

```bash
cd services/auth
go mod download
```

2. **Setup PostgreSQL:**

   - Install PostgreSQL locally or use Docker:

   ```bash
   docker run --name auth-postgres \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=users \
     -p 5432:5432 \
     -d postgres:14.2
   ```

3. **Create database and run migrations:**

```bash
# Create database
psql -U postgres -c "CREATE DATABASE users;"

# Run migration
psql -U postgres -d users -f migrations/001_create_users_table.sql
```

4. **Set environment variable:**

```bash
export DSN="host=localhost port=5432 user=postgres password=password dbname=users sslmode=disable"
```

5. **Run the service:**

```bash
cd cmd/api
go run .
```

Or from the auth directory:

```bash
go run ./cmd/api
```

## Environment Variables

- `DSN`: PostgreSQL connection string
  - Format: `host=HOST port=PORT user=USER password=PASSWORD dbname=DBNAME sslmode=disable`
  - Example: `host=localhost port=5432 user=postgres password=password dbname=users sslmode=disable`

## Default Configuration

- **Port**: 80 (container) / 8080 (local development)
  - Can be overridden with `PORT` environment variable
- **Database**: PostgreSQL
- **Health Check**: `GET /` returns "OK"

## Running with Custom Port

```bash
PORT=3000 go run ./cmd/api
```

## Testing

Test the health endpoint:

```bash
curl http://localhost:8080/
```

## Building

Build the binary:

```bash
cd services/auth
go build -o bin/auth ./cmd/api
```

Run the binary:

```bash
./bin/auth
```

## Troubleshooting

1. **Database connection error:**

   - Check PostgreSQL is running: `docker ps` or `pg_isready`
   - Verify DSN environment variable is set correctly
   - Check database exists: `psql -U postgres -l`

2. **Port already in use:**

   - Change port in `main.go` (webPort constant)
   - Or use different port: `PORT=8080 go run ./cmd/api`

3. **Migration errors:**
   - Ensure database exists before running migrations
   - Check PostgreSQL user has CREATE TABLE permissions
