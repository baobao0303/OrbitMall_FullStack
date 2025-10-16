
# 📘 Quy tắc đặt tên nhánh Git — OrbitMall

> ✅ Áp dụng cho **mono-repo** chứa toàn bộ backend, frontend (Angular SSR), và mobile (Flutter).

---

## 🎯 Cấu trúc tổng quát

```
<scope>/<type>/<yyyymmdd>-<short-description-kebab-case>
```

---

## 🧱 1. Scope — Phạm vi chính

| Scope     | Ý nghĩa                             |
|-----------|--------------------------------------|
| backend   | Cho phần .NET (API, DB, Services)    |
| web       | Cho phần Angular SSR (Shell + MFEs) |
| mobile    | Cho phần Flutter                     |
| shared    | Cho các thư mục hoặc config dùng chung |
| fullstack | Khi thay đổi cả frontend/backend     |

---

## 🏷️ 2. Type — Loại công việc

| Type       | Ý nghĩa                              |
|------------|---------------------------------------|
| feature    | Thêm tính năng mới                    |
| bugfix     | Sửa lỗi                               |
| hotfix     | Fix nhanh (trong prod hoặc critical)  |
| refactor   | Cải tổ code không thay đổi logic      |
| chore      | Việc phụ trợ (CI/CD, config, build...)|
| docs       | Viết hoặc sửa tài liệu                |
| test       | Thêm/sửa test                         |

---

## 📝 3. Mẫu đặt nhánh cụ thể

### ➕ Tính năng mới cho mobile (viết màn hình đăng nhập):

```
mobile/feature/20250726-login-screen
```

### 🐞 Fix lỗi nút submit không hoạt động trên web:

```
web/bugfix/20250726-submit-button
```

### ♻️ Refactor repository trong backend:

```
backend/refactor/20250726-order-repo-cleanup
```

### 🛠 Cập nhật CI/CD và Dockerfile dùng chung:

```
shared/chore/20250726-update-docker-ci
```

---

## ⚠️ Lưu ý

- Dùng định dạng ngày `yyyymmdd` để dễ tracking thời gian tạo nhánh.
- Dùng **kebab-case** (chữ thường, cách nhau bằng dấu `-`) cho mô tả.
- Tránh tên quá dài (>40 ký tự).
- Commit gắn liền với nhánh → tên commit nên bắt đầu bằng prefix ví dụ:

```
feat(login): add login logic for mobile
fix(cart): correct total price calculation on SSR
```
