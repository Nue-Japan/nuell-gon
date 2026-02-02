# Backend Architecture Design

## 1. Overview
The backend will be a high-performance, secure hybrid system.
- **API Layer:** Python (FastAPI) for rapid development, excellent ecosystem (OAuth2, Pydantic), and async I/O.
- **Core Logic:** Rust (via PyO3) for CPU-bound tasks, ensuring maximum performance and memory safety.
- **Database:** PostgreSQL for reliable relational data storage.
- **Infrastructure:** Docker Compose for orchestration.

## 2. Directory Structure
We will use a monolithic repository structure within `backend/` where the Rust crate and Python application coexist. The Rust code will be compiled into a Python extension module (e.g., `nuell_core`) using **Maturin**.

```
nuell-gon/
├── backend/
│   ├── Cargo.toml          # Rust dependencies and workspace config
│   ├── pyproject.toml      # Python dependencies and build system (Maturin)
│   ├── Dockerfile          # Multi-stage build (Rust build -> Python env)
│   ├── docker-compose.yml  # DB, Redis (optional), and App services
│   ├── src/                # Rust Source Code (PyO3 bindings)
│   │   ├── lib.rs          # Entry point for 'nuell_core' module
│   │   └── computation.rs  # Core logic impl
│   └── app/                # FastAPI Application Source
│       ├── main.py         # App entry point
│       ├── core/           # Config, Security, Events
│       ├── api/            # Route handlers (v1/)
│       │   ├── deps.py     # Dependency Injection (DB, User)
│       │   └── routes/     # Auth, Users, Posts
│       ├── db/             # Database connection & Session
│       ├── models/         # SQLModel/SQLAlchemy models
│       └── schemas/        # Pydantic Pydantic schemas (Request/Response)
```

## 3. Database Schema (Draft)
We will use **SQLModel** (which combines SQLAlchemy and Pydantic) for ORM.

### 3.1 `users` Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Index | Unique User Identifier |
| `email` | VARCHAR | Unique, Index | User verification & login |
| `hashed_password` | VARCHAR | Not Null | Argon2 hashed string |
| `role` | VARCHAR | Default: 'user' | 'admin', 'user', etc. |
| `is_active` | BOOLEAN | Default: True | Soft delete/ban status |
| `created_at` | TIMESTAMPTZ | Default: Now | |

### 3.2 `posts` Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Index | Unique Post Identifier |
| `user_id` | UUID | FK -> users.id | Author |
| `content` | TEXT | Not Null | Main content |
| `created_at` | TIMESTAMPTZ | Default: Now | |
| `updated_at` | TIMESTAMPTZ | OnUpdate: Now | |

## 4. Security Policy

### 4.1 Authentication & Authorization
- **Protocol:** OAuth2 with Password Flow (for first-party) or Authorization Code (future).
- **Token:** JWT (JSON Web Token) containing:
    - `sub` (Subject/User ID)
    - `exp` (Expiration, short-lived e.g., 30m)
    - `scope` (Permissions based on Role)
- **Library:** `python-jose` for JWT handling, `passlib[argon2]` for hashing.

### 4.2 Password Security
- **Algorithm:** Argon2id (Currently recommended over BCrypt).
- **Policy:** Minimum 12 characters, enforced complexity on registration.

### 4.3 Data Protection
- **SQL Injection:** Prevented by using ORM (SQLModel/SQLAlchemy) parameter binding.
- **Validation:** Pydantic models strictly validate all incoming payloads.

### 4.4 Network Security
- **CORS:** Strict allowlist.
    - Development: `http://localhost:3000`
    - Production: `https://nue-japan.com` (example)
    - Methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
- **Headers:** Secure headers (HSTS, Content-Type-Options) via middleware.

## 5. Development Workflow
1.  **Rust Logic:** Write in `src/`, expose via `#[pyfunction]` in `lib.rs`.
2.  **Build:** Run `maturin develop` to compile Rust and install as python package.
3.  **FastAPI:** Import `nuell_core` in Python and use it in routes.
4.  **Run:** `uvicorn app.main:app --reload`.
