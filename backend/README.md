# Kartly Backend

A scalable, production-ready REST API for the **Kartly** e-commerce platform, built with Node.js, Express, TypeScript, MongoDB, and Redis.

---

## Table of Contents

- [Features](#features)
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
- [License](#license)

---

## Features

- **Authentication & Sessions** — Register, sign in, token refresh, and secure session management with JWT access/refresh token pairs
- **User Profiles & Addresses** — Extended profile management and multiple saved delivery addresses per user
- **Product Catalogue** — Full CRUD for products with detailed attributes and category associations
- **Categories** — Hierarchical category tree for organising products
- **Shopping Cart** — Persistent cart with individual line-item management (add, update, remove)
- **Wishlist** — Save products for later with user-scoped wishlists
- **Order Management** — Place orders, track order status, and manage order line items
- **Email & Mobile Verification** — Verify user email addresses and mobile numbers
- **Admin Controls** — Role-based access for administrative operations
- **Caching** — Redis-backed caching for sessions and frequently accessed data
- **Rate Limiting** — Per-IP request throttling to prevent abuse

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
│   ├── users/              # User profile & address routes
│   ├── products/           # Product & product-details routes
│   ├── categories/         # Category routes
│   ├── cart/               # Cart & cart-item routes
│   ├── wishlist/           # Wishlist routes
│   └── orders/             # Order routes
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
PORT=5001

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
docker run -p 5001:5001 --env-file .env kartly-backend
```

The container runs as a non-root `node` user and exposes port **8060** by default. A health check is configured to probe the running process every 30 seconds.

---

## API Reference

All routes are prefixed with `/api`. Protected routes require an `Authorization: Bearer <accessToken>` header.

### Authentication — `/api/auth`

| Method | Endpoint                    | Auth | Description                                  |
| ------ | --------------------------- | :--: | -------------------------------------------- |
| `POST` | `/api/auth/register`        |  No  | Register a new user                          |
| `POST` | `/api/auth/signin`          |  No  | Sign in, receive access + refresh tokens     |
| `POST` | `/api/auth/refresh-token`   | Yes  | Issue a new access token using refresh token |
| `POST` | `/api/auth/signout`         | Yes  | Invalidate the current session               |
| `POST` | `/api/auth/verify-email`    | Yes  | Verify user email address with OTP           |
| `POST` | `/api/auth/verify-mobile`   | Yes  | Verify user mobile number with OTP           |
| `POST` | `/api/auth/forgot-password` |  No  | Request a password reset link                |
| `POST` | `/api/auth/reset-password`  |  No  | Reset password using a valid reset token     |

### Users — `/api/users`

| Method   | Endpoint                      | Auth | Description                 |
| -------- | ----------------------------- | :--: | --------------------------- |
| `GET`    | `/api/users/me`               | Yes  | Get current user profile    |
| `PUT`    | `/api/users/me`               | Yes  | Update current user profile |
| `GET`    | `/api/users/me/addresses`     | Yes  | List all saved addresses    |
| `POST`   | `/api/users/me/addresses`     | Yes  | Add a new address           |
| `PUT`    | `/api/users/me/addresses/:id` | Yes  | Update an address           |
| `DELETE` | `/api/users/me/addresses/:id` | Yes  | Delete an address           |

### Products — `/api/products`

| Method   | Endpoint            | Auth  | Description                             |
| -------- | ------------------- | :---: | --------------------------------------- |
| `GET`    | `/api/products`     |  No   | List all products (paginated, filtered) |
| `GET`    | `/api/products/:id` |  No   | Get a single product with details       |
| `POST`   | `/api/products`     | Admin | Create a new product                    |
| `PUT`    | `/api/products/:id` | Admin | Update a product                        |
| `DELETE` | `/api/products/:id` | Admin | Delete a product                        |

### Categories — `/api/categories`

| Method   | Endpoint              | Auth  | Description                  |
| -------- | --------------------- | :---: | ---------------------------- |
| `GET`    | `/api/categories`     |  No   | List all categories          |
| `GET`    | `/api/categories/:id` |  No   | Get a category and its items |
| `POST`   | `/api/categories`     | Admin | Create a new category        |
| `PUT`    | `/api/categories/:id` | Admin | Update a category            |
| `DELETE` | `/api/categories/:id` | Admin | Delete a category            |

### Cart — `/api/cart`

| Method   | Endpoint              | Auth | Description                  |
| -------- | --------------------- | :--: | ---------------------------- |
| `GET`    | `/api/cart`           | Yes  | Get current user's cart      |
| `POST`   | `/api/cart/items`     | Yes  | Add an item to the cart      |
| `PUT`    | `/api/cart/items/:id` | Yes  | Update item quantity         |
| `DELETE` | `/api/cart/items/:id` | Yes  | Remove an item from the cart |
| `DELETE` | `/api/cart`           | Yes  | Clear the entire cart        |

### Wishlist — `/api/wishlist`

| Method   | Endpoint                   | Auth | Description                        |
| -------- | -------------------------- | :--: | ---------------------------------- |
| `GET`    | `/api/wishlist`            | Yes  | Get current user's wishlist        |
| `POST`   | `/api/wishlist`            | Yes  | Add a product to the wishlist      |
| `DELETE` | `/api/wishlist/:productId` | Yes  | Remove a product from the wishlist |

### Orders — `/api/orders`

| Method | Endpoint                 | Auth  | Description                        |
| ------ | ------------------------ | :---: | ---------------------------------- |
| `GET`  | `/api/orders`            |  Yes  | List current user's orders         |
| `GET`  | `/api/orders/:id`        |  Yes  | Get a single order with line items |
| `POST` | `/api/orders`            |  Yes  | Place a new order                  |
| `PUT`  | `/api/orders/:id/cancel` |  Yes  | Cancel an order                    |
| `GET`  | `/api/admin/orders`      | Admin | List all orders (admin)            |
| `PUT`  | `/api/admin/orders/:id`  | Admin | Update order status (admin)        |

---

## Data Models

| Model            | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `User`           | Core credentials (email, username, mobile, password) |
| `UserProfile`    | Extended profile info (name, avatar, bio)            |
| `UserSession`    | Active refresh token sessions                        |
| `UserAddress`    | Saved delivery addresses per user                    |
| `Product`        | Product listings (name, price, stock, category)      |
| `ProductDetails` | Extended product attributes (specs, images, tags)    |
| `Categories`     | Hierarchical product category tree                   |
| `Cart`           | User shopping cart                                   |
| `CartItems`      | Individual cart line items (product, qty, price)     |
| `Wishlist`       | User wishlist entries                                |
| `OrderDetails`   | Order header (status, total, address, payment)       |
| `OrderItems`     | Order line items (product snapshot, qty, price)      |

---

## Security

- **Helmet** — sets secure HTTP response headers
- **CORS** — configurable cross-origin resource sharing
- **Rate Limiting** — 100 requests per 15-minute window per IP (via `express-rate-limit`)
- **bcrypt** — passwords hashed with a cost factor of 12
- **JWT** — short-lived access tokens + long-lived refresh tokens stored server-side
- **Non-root Docker user** — container runs as `node` user
- **Input validation** — all request bodies validated with Zod schemas before processing

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

## License

This project is licensed under the **ISC License**.
