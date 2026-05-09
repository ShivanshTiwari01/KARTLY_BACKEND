# Kartly — Frontend Web

A modern, full-featured ecommerce web application built with React, TypeScript, and Vite. Kartly delivers a seamless shopping experience with a clean UI, performant data fetching, and scalable state management.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Overview

Kartly is a responsive ecommerce storefront that enables customers to browse products, manage their cart, complete secure checkout, and track their orders — all from a fast, accessible web interface.

---

## Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| Framework        | React 19 + TypeScript       |
| Build Tool       | Vite                        |
| Styling          | Tailwind CSS v4             |
| State Management | Redux Toolkit + React Redux |
| Server State     | TanStack React Query v5     |
| Routing          | React Router DOM v7         |
| Forms            | React Hook Form + Zod       |
| HTTP Client      | Axios                       |
| Icons            | Lucide React                |

---

## Features

- **Product Catalog** — Browse, search, and filter products by category, price, and rating
- **Product Detail** — Rich product pages with image gallery, reviews, and related items
- **Shopping Cart** — Add, update, and remove items with real-time totals
- **User Authentication** — Register, log in, and manage your account
- **Checkout Flow** — Address, shipping, and payment steps with order summary
- **Order History** — Track current and past orders
- **Wishlist** — Save products for later
- **Responsive Design** — Optimized for desktop, tablet, and mobile

---

## Project Structure

```
src/
├── app/              # Redux store, root reducer, providers, and routing
├── assets/           # Static fonts, icons, and images
├── components/       # Shared UI and layout components
├── config/           # App-wide configuration and environment helpers
├── features/         # Feature-based modules (auth, cart, products, orders, …)
├── hooks/            # Custom React hooks
├── lib/              # Third-party library setup (axios instance, query client, …)
├── pages/            # Top-level route page components
├── services/         # API service layer
├── styles/           # Global CSS, fonts, and design tokens
├── tests/            # Unit and integration tests
├── types/            # Shared TypeScript types and interfaces
└── utils/            # Pure utility functions
```

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/kartly-frontend-web.git
cd kartly-frontend-web

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
pnpm build
pnpm preview
```

---

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `pnpm dev`      | Start the development server with HMR |
| `pnpm build`    | Type-check and build for production   |
| `pnpm preview`  | Preview the production build locally  |
| `pnpm lint`     | Run ESLint                            |
| `pnpm lint:fix` | Run ESLint and auto-fix issues        |

---

## Environment Variables

Create a `.env` file in the project root. Available variables:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Kartly
```

> All client-side variables must be prefixed with `VITE_`.

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`
2. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
3. Open a pull request against `main` and fill in the PR template
4. Ensure all lint checks pass before requesting a review
