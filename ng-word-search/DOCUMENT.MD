src/
├── features/ # Các feature modules
│ ├── auth/ # Feature Authentication
│ │ ├── controllers/ # Controllers
│ │ │ ├── auth.controller.ts
│ │ │ └── index.ts
│ │ ├── services/ # Business logic
│ │ │ ├── auth.service.ts
│ │ │ └── index.ts
│ │ ├── models/ # Data models
│ │ │ ├── user.model.ts
│ │ │ └── index.ts
│ │ ├── routes/ # Route definitions
│ │ │ ├── auth.routes.ts
│ │ │ └── index.ts
│ │ ├── middleware/ # Feature-specific middleware
│ │ │ ├── auth.middleware.ts
│ │ │ └── index.ts
│ │ └── index.ts # Feature module exports
│ │
│ ├── word-search/ # Feature Word Search (chính)
│ │ ├── controllers/
│ │ │ ├── word-search.controller.ts
│ │ │ └── index.ts
│ │ ├── services/
│ │ │ ├── word-search.service.ts
│ │ │ └── index.ts
│ │ ├── models/
│ │ │ ├── game.model.ts
│ │ │ ├── word.model.ts
│ │ │ └── index.ts
│ │ ├── routes/
│ │ │ ├── word-search.routes.ts
│ │ │ └── index.ts
│ │ └── index.ts
│ │
│ └── shared/ # Shared components
│ ├── controllers/
│ ├── services/
│ ├── models/
│ ├── middleware/
│ └── utils/
│
├── core/ # Core application logic
│ ├── config/ # Configuration files
│ │ ├── database.config.ts
│ │ ├── app.config.ts
│ │ └── index.ts
│ ├── database/ # Database connection & models
│ │ ├── connection.ts
│ │ ├── migrations/
│ │ └── seeders/
│ ├── middleware/ # Global middleware
│ │ ├── error.middleware.ts
│ │ ├── cors.middleware.ts
│ │ └── index.ts
│ └── utils/ # Utility functions
│ ├── logger.ts
│ ├── validators.ts
│ └── helpers.ts
│
├── types/ # TypeScript type definitions
│ ├── global.types.ts
│ ├── api.types.ts
│ └── index.ts
│
├── tests/ # Test files
│ ├── unit/
│ ├── integration/
│ └── e2e/
│
├── docs/ # Documentation
│ ├── api.md
│ └── setup.md
│
├── app.ts # Main application setup
├── server.ts # Server configuration
└── index.ts # Entry point
Ưu điểm của cấu trúc này:

- Feature-based: Mỗi feature có đầy đủ MVC components
- Scalable: Dễ dàng thêm feature mới
- Maintainable: Code được tổ chức rõ ràng, dễ tìm
- Testable: Mỗi layer có thể test riêng biệt
- Reusable: Shared components có thể dùng chung
  Cách implement:
- Feature Module: Mỗi feature export tất cả components
- Dependency Injection: Sử dụng DI pattern để inject services
- Route Registration: Tự động register routes từ features
- Middleware Chain: Global + feature-specific middleware
