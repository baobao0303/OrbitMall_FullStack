
# 🚀 OrbitMall Backend - Clean Architecture (Domain Driven Design)

Dự án OrbitMall được xây dựng theo kiến trúc **Clean Architecture** và áp dụng tư duy **Domain-Driven Design (DDD)** để đảm bảo tính mô-đun, dễ bảo trì và mở rộng.

---

## 🧭 Thư mục tổng thể

```
OrbitMall/
├── OrbitMall.Api/                # Entry point - Minimal API hoặc Controllers
│   ├── Controllers/              # Xử lý HTTP request, gọi vào UseCase (Application Layer)
│   ├── Filters/                  # Global filters (Validation, Exception, etc.)
│   └── Middlewares/             # Custom middleware (Logging, Auth, etc.)
│
├── OrbitMall.Application/       # Tầng UseCase logic, xử lý nghiệp vụ qua CQRS
│   └── Orders/
│       ├── Commands/             # Các hành động ghi (Write)
│       ├── Queries/              # Các truy vấn đọc (Read)
│       ├── Validators/           # FluentValidation cho Commands
│       └── Dtos/                 # DTO truyền dữ liệu giữa Application và API
│
├── OrbitMall.Domain/            # Domain logic thuần, không phụ thuộc bên ngoài
│   ├── Entities/                # Các thực thể chính như Product, Order, Customer
│   ├── ValueObjects/            # Kiểu giá trị: Email, Address, Money...
│   ├── Enums/                   # Trạng thái đơn hàng, loại sản phẩm,...
│   └── Events/                  # Domain Events
│
├── OrbitMall.Infrastructure/    # Kết nối với các external service: Redis, Email, Auth
│   ├── Data/                    # Seed, init data, background jobs
│   ├── Services/                # Gửi mail, SMS, payment,...
│   ├── Auth/                    # JWT, Identity provider
│   └── Config/                  # Cấu hình external systems
│
├── OrbitMall.Persistence/       # EF DbContext, Repository pattern, Migrations
│   ├── Migrations/              # Lưu các file EF Core migrations
│   └── Repositories/            # Cài đặt các repository interface từ Domain
│
├── OrbitMall.Common/            # Helpers, Extensions, Middleware logic chia sẻ
│   ├── Extensions/              # StringExtensions, DateTimeExtensions,...
│   ├── Logging/                 # Serilog, Log config,...
│   └── Middleware/              # Custom middlewares dùng chung
│
└── OrbitMall.Contracts/         # Giao tiếp giữa các layer hoặc bounded context (DTO, interface)
```

---

## 🛠 Công nghệ sử dụng

| Thành phần        | Công nghệ                     |
|------------------|-------------------------------|
| Language         | C# 13 (với .NET 9)             |
| Framework        | .NET 9 SDK                    |
| ORM              | Entity Framework Core 9       |
| Validation       | FluentValidation              |
| Auth             | JWT / OAuth2 (tùy chọn)       |
| Logging          | Serilog                       |
| Mapping          | Mapster / AutoMapper          |
| Unit Test        | xUnit / NUnit                 |
| API Doc          | Swashbuckle (Swagger)         |

---

## 💡 Nguyên lý chính

- **Domain làm trung tâm**: logic nghiệp vụ nằm trong `OrbitMall.Domain`, hoàn toàn thuần C# (POCO).
- **Tách biệt rõ ràng**: mỗi tầng chỉ biết tầng phía dưới, không tham chiếu vòng.
- **Không rò rỉ EF Core** ra khỏi `Persistence`.

---

## 🔋 Lệnh khởi tạo (ví dụ)

```bash
dotnet new sln -n OrbitMall

# Add projects:
dotnet new classlib -n OrbitMall.Domain
dotnet new classlib -n OrbitMall.Application
dotnet new classlib -n OrbitMall.Infrastructure
dotnet new classlib -n OrbitMall.Persistence
dotnet new classlib -n OrbitMall.Common
dotnet new classlib -n OrbitMall.Contracts
dotnet new webapi -n OrbitMall.Api

# Thêm vào solution
dotnet sln add OrbitMall.Domain/OrbitMall.Domain.csproj
dotnet sln add OrbitMall.Application/OrbitMall.Application.csproj
dotnet sln add OrbitMall.Infrastructure/OrbitMall.Infrastructure.csproj
dotnet sln add OrbitMall.Persistence/OrbitMall.Persistence.csproj
dotnet sln add OrbitMall.Common/OrbitMall.Common.csproj
dotnet sln add OrbitMall.Contracts/OrbitMall.Contracts.csproj
dotnet sln add OrbitMall.Api/OrbitMall.Api.csproj
```

---

## 📦 Dependencies giữa các tầng

```text
OrbitMall.Api
   └── references → OrbitMall.Application, OrbitMall.Contracts

OrbitMall.Application
   └── references → OrbitMall.Domain, OrbitMall.Contracts

OrbitMall.Persistence
   └── references → OrbitMall.Domain

OrbitMall.Infrastructure
   └── references → OrbitMall.Application, OrbitMall.Domain

OrbitMall.Common
   └── dùng được ở tất cả các tầng

OrbitMall.Domain
   └── KHÔNG tham chiếu ai cả (core)
```

---

> 🧠 **Lưu ý:** Tên project, namespace, thư mục đều dùng chuẩn `PascalCase`, riêng DTO nên đặt ở `Application` và `Contracts`.
