# Kartly Backend

A scalable, production-ready REST API for the **Kartly** e-commerce platform, built with Node.js, Express, TypeScript, MongoDB, and Redis.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [Docker](#docker)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Security](#security)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Kartly Backend provides the core server-side infrastructure for an e-commerce application. It handles user authentication, session management, product catalogues, shopping carts, wishlists, and order processing through a clean RESTful API.

---

## Tech Stack

| Layer            | Technology           |
| ---------------- | -------------------- |
| Runtime          | Node.js 22           |
| Language         | TypeScript           |
| Framework        | Express 5            |
| Database         | MongoDB (Mongoose)   |
| Cache / Sessions | Redis (ioredis)      |
| Auth             | JWT + Firebase Admin |
| Password Hashing | bcrypt               |
| Logging          | Pino + pino-pretty   |
| Validation       | Zod                  |
| ID Generation    | Snowflake ID         |
| Package Manager  | pnpm                 |

---

## Project Structure

```
src/
├── api/
│   ├── auth/               # Auth routes, controller, validation, helpers
│   └── products/           # (upcoming) Product routes & controller
├── config/
│   ├── db.ts               # MongoDB connection
│   ├── firebase_admin.ts   # Firebase Admin SDK setup
│   └── jwt.ts              # JWT config
├── helpers/                # Utility helpers (auth tokens, passwords, IDs, etc.)
├── middleware/
│   └── authentication.ts   # JWT auth middleware
├── models/                 # Mongoose models
│   ├── user.model.ts
│   ├── userProfile.model.ts
│   ├── userSession.model.ts
│   ├── userAddress.model.ts
│   ├── product.model.ts
│   ├── productDetails.model.ts
│   ├── categories.model.ts
│   ├── cart.model.ts
│   ├── cartItems.model.ts
│   ├── wishlist.model.ts
│   ├── orderDetails.model.ts
│   └── orderItems.model.ts
├── services/
│   └── redis.ts            # Redis client (ioredis)
├── types/                  # Custom TypeScript type declarations
├── app.ts                  # Express app setup & middleware
├── index.ts                # Server entry point
└── routes.ts               # Top-level route registration
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **pnpm** ≥ 9
- **MongoDB** instance (local or Atlas)
- **Redis** instance (local or managed)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/kartly-backend.git
cd kartly-backend

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the project root. All variables are required unless marked optional.

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/kartly

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Firebase (optional — for social auth / push notifications)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

> **Never commit `.env` to version control.** A `.env.example` template should be used for sharing variable names.

### Running the Server

```bash
# Development (with hot reload via nodemon + ts-node)
pnpm dev

# Production build
pnpm build
pnpm start
```

---

## Docker

A `Dockerfile` is provided for containerised deployments.

```bash
# Build the image
docker build -t kartly-backend .

# Run the container
docker run -p 8060:8060 --env-file .env kartly-backend
```

The container runs as a non-root `node` user and exposes port **8060** by default. A health check is configured to probe the running process every 30 seconds.

---

## API Reference

All routes are prefixed with `/api`.

### Authentication — `/api/auth`

| Method | Endpoint                  | Auth Required | Description                                  |
| ------ | ------------------------- | :-----------: | -------------------------------------------- |
| `POST` | `/api/auth/register`      |      No       | Register a new user                          |
| `POST` | `/api/auth/signin`        |      No       | Sign in and receive access + refresh tokens  |
| `POST` | `/api/auth/refresh-token` |      Yes      | Issue a new access token using refresh token |

#### Register — `POST /api/auth/register`

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Response `201`:**

```json
{
  "success": true,
  "message": "Registration successful"
}
```

#### Sign In — `POST /api/auth/signin`

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Response `200`:**

```json
{
  "success": true,
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>"
}
```

#### Refresh Token — `POST /api/auth/refresh-token`

Requires a valid `Authorization: Bearer <refreshToken>` header.

**Response `200`:**

```json
{
  "success": true,
  "accessToken": "<new_jwt>"
}
```

---

## Data Models

| Model            | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `User`           | Core credentials (email, username, mobile, password) |
| `UserProfile`    | Extended profile info                                |
| `UserSession`    | Refresh token sessions                               |
| `UserAddress`    | Saved delivery addresses                             |
| `Product`        | Product listings                                     |
| `ProductDetails` | Extended product attributes                          |
| `Categories`     | Product category tree                                |
| `Cart`           | User shopping cart                                   |
| `CartItems`      | Individual cart line items                           |
| `Wishlist`       | Saved wishlist items                                 |
| `OrderDetails`   | Order header                                         |
| `OrderItems`     | Order line items                                     |

---

## Security

- **Helmet** — sets secure HTTP response headers
- **CORS** — configurable cross-origin resource sharing
- **Rate Limiting** — 100 requests per 15-minute window per IP (via `express-rate-limit`)
- **bcrypt** — passwords hashed with a cost factor of 12
- **JWT** — short-lived access tokens + long-lived refresh tokens
- **Non-root Docker user** — container runs as `node` user
- **Input validation** — all incoming request bodies validated with Zod schemas

---

## Scripts

| Script   | Command       | Description                      |
| -------- | ------------- | -------------------------------- |
| `dev`    | `pnpm dev`    | Start dev server with hot reload |
| `build`  | `pnpm build`  | Compile TypeScript to `dist/`    |
| `start`  | `pnpm start`  | Run compiled production build    |
| `lint`   | `pnpm lint`   | Run ESLint across `src/`         |
| `format` | `pnpm format` | Auto-format with Prettier        |

---

## Roadmap

- [ ] Products API (CRUD, search, filtering)
- [ ] Categories API
- [ ] Cart & CartItems API
- [ ] Wishlist API
- [ ] Orders API
- [ ] Payment gateway integration
- [ ] Email verification flow
- [ ] Mobile OTP verification
- [ ] Admin role & dashboard endpoints
- [ ] API documentation (Swagger / OpenAPI)
- [ ] Test suite (Jest / Supertest)
- [ ] CI/CD pipeline

---

## License

This project is licensed under the **ISC License**.
