<p align="center">
  <img src="https://img.shields.io/badge/♻️_EcoScan-AI_Powered_Recycling-10B981?style=for-the-badge&logoColor=white" alt="EcoScan Badge" />
</p>

<h1 align="center">♻️ EcoScan</h1>

<p align="center">
  <strong>Scan. Classify. Recycle Smarter.</strong>
</p>

<p align="center">
  An AI-powered waste classification and gamified recycling platform that incentivizes sustainable behavior through real-time image recognition, EcoPoints, and community leaderboards.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-0.31-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Neon-Serverless_DB-00E699?style=flat-square&logo=neon&logoColor=black" alt="Neon" />
  <img src="https://img.shields.io/badge/Turborepo-2.0-EF4444?style=flat-square&logo=turborepo&logoColor=white" alt="Turborepo" />
  <img src="https://img.shields.io/badge/pnpm-9.0-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/API_on-Render-46E3B7?style=flat-square&logo=render&logoColor=black" alt="Render" />
  <img src="https://img.shields.io/badge/Media_on-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Source-GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
</p>

<p align="center">
  <a href="#-introduction">Introduction</a> •
  <a href="#-live-demo--credentials">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#️-architecture">Architecture</a> •
  <a href="#-design-patterns">Design Patterns</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-cloud-services--deployment-pipeline">Cloud Services</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 📖 Introduction

**EcoScan** is a full-stack, AI-powered web application designed to promote sustainable waste management through gamification and machine learning. Users can scan waste items using their device camera or by uploading images, receive instant AI-powered classification into categories such as Plastic, Paper, Glass, Metal, Organic, and Electronic, and earn **EcoPoints** for proper waste segregation.

The platform features a rich rewards marketplace where users can redeem earned points, a global leaderboard to foster healthy competition among eco-warriors, and a comprehensive scan history to track personal impact over time.

> 💡 **Built as a capstone project**, EcoScan demonstrates production-grade engineering practices including monorepo architecture, type-safe APIs, JWT authentication, cloud-native deployment across multiple platforms, and a premium glassmorphic dark-mode UI.

---

## 🌐 Live Demo & Credentials

### Production URLs

| Service | URL | Platform |
|:--------|:----|:---------|
| 🌐 **Web App** | [ecoscan-delta.vercel.app](https://ecoscan-delta.vercel.app) | Vercel |
| ⚙️ **API Server** | [ecoscan-api-zjwb.onrender.com](https://ecoscan-api-zjwb.onrender.com/health) | Render |
| 📦 **Source Code** | [github.com/Artificial-Ledger-Technology/ALT-EcoScan](https://github.com/Artificial-Ledger-Technology/ALT-EcoScan) | GitHub |

### Presentation Demo Accounts

The app includes a built-in **Presentation Demo Mode** that bypasses the backend entirely and runs on a local `localStorage` database. This allows evaluators, judges, and testers to experience the full feature set without waiting for backend cold-starts.

Go to the [Login Page](https://ecoscan-delta.vercel.app/auth/login) and either click the **"🎭 Presentation Mode (Demo Login)"** button, or manually enter any of these mock accounts (password can be anything, e.g., `demo`):

| Role | Email | Password | Starting Level | Starting Points |
|:-----|:------|:---------|:------|:-------|
| **Presenter / Demo** | `demo@ecoscan.com` | `demo` | 5 | 1,250 |
| **Guest Judge** | `judge@ecoscan.com` | `demo` | 2 | 400 |
| **Eco Student** | `student@ecoscan.com` | `demo` | 1 | 0 |

> **Note**: In Presentation Demo Mode, all data (scans, points, levels, rewards) is stored in your browser's `localStorage`. Each scan adds 15 EcoPoints, level-ups occur every 250 points, and rewards can be redeemed in real-time. Clearing your browser data resets the demo state.

---

## 📸 Screenshots

<details open>
<summary><strong>🏠 Landing Page</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/01_landing.png" alt="EcoScan Landing Page" width="90%" />
</p>
<p align="center"><em>Premium glassmorphic landing page with animated gradient hero text and atmospheric background glows.</em></p>
</details>

<details>
<summary><strong>🔐 Authentication</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/02_login.png" alt="EcoScan Login Page" width="90%" />
</p>
<p align="center"><em>Sleek login interface with frosted-glass card, emerald accent inputs, Presentation Mode button, and micro-interaction states.</em></p>
</details>

<details>
<summary><strong>📊 Dashboard</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/03_dashboard.png" alt="EcoScan Dashboard" width="90%" />
</p>
<p align="center"><em>Command center with real-time metric cards, quick-action modules, category breakdown analytics, and responsive mobile hamburger menu.</em></p>
</details>

<details>
<summary><strong>📸 AI Scanner</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/04_scan.png" alt="EcoScan AI Scanner" width="90%" />
</p>
<p align="center"><em>AI-powered waste classification with live camera feed and file upload support.</em></p>
</details>

<details>
<summary><strong>🏆 Leaderboard</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/05_leaderboard.png" alt="EcoScan Leaderboard" width="90%" />
</p>
<p align="center"><em>Global rankings with glowing medal effects for top eco-warriors.</em></p>
</details>

<details>
<summary><strong>🎁 Rewards Shop</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/06_rewards.png" alt="EcoScan Rewards Shop" width="90%" />
</p>
<p align="center"><em>Rewards marketplace with glassmorphic product cards and dynamic point affordability indicators.</em></p>
</details>

<details>
<summary><strong>🕰️ Scan History</strong></summary>
<br/>
<p align="center">
  <img src="./docs/screenshots/07_history.png" alt="EcoScan Scan History" width="90%" />
</p>
<p align="center"><em>Paginated scan history with confidence badges, timestamps, and earned EcoPoints per scan.</em></p>
</details>

---

## ✨ Features

| Feature | Description |
|:--------|:------------|
| 📸 **AI Waste Classification** | Real-time waste recognition using camera or image upload with confidence scoring |
| 🏅 **Gamification System** | Earn EcoPoints for every scan, automatic level-ups (every 250 pts), and compete with the community |
| 🎁 **Rewards Marketplace** | Redeem accumulated EcoPoints for digital and physical rewards (Eco Mugs, Tree Planting, E-Vouchers) |
| 🏆 **Global Leaderboard** | Compete for the top spot among all registered eco-warriors with dynamic rankings |
| 🕰️ **Scan History** | Track and review your complete recycling activity timeline with confidence scores and timestamps |
| 📊 **Analytics Dashboard** | Visualize your recycling impact with real-time stats, category breakdowns, and progress tracking |
| 🔐 **Secure Authentication** | JWT-based auth with bcrypt password hashing and protected routes |
| 🎭 **Presentation Demo Mode** | Built-in localStorage-backed mock database for instant offline demos without backend dependency |
| 🌙 **Premium Dark Mode** | Immersive glassmorphic UI with emerald-teal gradients, backdrop-blur effects, and micro-animations |
| 📱 **Responsive Design** | Mobile-first layout with hamburger navigation, adaptive grids, and touch-friendly interactions |
| 🚪 **User Session Management** | Full login/logout flow with token management, session persistence, and protected routing |
| 🏗️ **Monorepo Architecture** | Organized with Turborepo and pnpm workspaces for scalable development |
| ☁️ **Cloud-Native Deployment** | Automated CI/CD pipeline via GitHub → Vercel (frontend) and GitHub → Render (backend) |

---

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    subgraph Client ["🖥️ Client Layer"]
        WEB["Next.js 14<br/>Web Portal<br/>(Vercel)"]
        MOBILE["React Native<br/>Expo (Planned)"]
    end

    subgraph Cloud ["☁️ Cloud Services"]
        VERCEL["Vercel<br/>Frontend Hosting<br/>& Edge Network"]
        RENDER["Render<br/>Backend Hosting<br/>& Auto-Deploy"]
    end

    subgraph API ["⚙️ API Layer (Render)"]
        EXPRESS["Express.js<br/>REST API"]
        HELMET["Helmet<br/>Security Headers"]
        CORS["Dynamic CORS<br/>Origin Allowlist"]
        AUTH["JWT Auth<br/>Middleware"]
        ROUTES["Route Controllers<br/>Auth · Scans · Rewards · Recycling"]
    end

    subgraph Data ["💾 Data Layer"]
        ORM["Drizzle ORM<br/>Type-safe Queries"]
        NEON["Neon PostgreSQL<br/>Serverless DB"]
    end

    subgraph Media ["📷 Media Layer"]
        CLOUDINARY["Cloudinary<br/>Image Storage & CDN"]
    end

    subgraph PresentationMode ["🎭 Presentation Demo Mode"]
        LOCALSTORAGE["localStorage<br/>Mock Database"]
        INTERCEPTOR["API Interceptor<br/>Route Matching"]
    end

    subgraph DevOps ["🔧 DevOps"]
        GITHUB["GitHub<br/>Source Control & CI"]
        TURBO["Turborepo<br/>Build Orchestration"]
    end

    WEB -->|"HTTPS/REST"| EXPRESS
    MOBILE -.->|"HTTPS/REST"| EXPRESS
    WEB -.->|"Demo Mode"| INTERCEPTOR
    INTERCEPTOR --> LOCALSTORAGE

    EXPRESS --> HELMET --> CORS --> AUTH --> ROUTES
    ROUTES --> ORM --> NEON
    ROUTES -.->|"Image Upload"| CLOUDINARY

    GITHUB -->|"Git Push → Auto Build"| VERCEL
    GITHUB -->|"Git Push → Auto Deploy"| RENDER
    TURBO -.->|"Orchestrates"| GITHUB

    style Client fill:#0f172a,stroke:#10b981,color:#e2e8f0
    style Cloud fill:#0f172a,stroke:#a855f7,color:#e2e8f0
    style API fill:#0f172a,stroke:#06b6d4,color:#e2e8f0
    style Data fill:#0f172a,stroke:#8b5cf6,color:#e2e8f0
    style Media fill:#0f172a,stroke:#f59e0b,color:#e2e8f0
    style PresentationMode fill:#1e293b,stroke:#fbbf24,color:#e2e8f0
    style DevOps fill:#0f172a,stroke:#ef4444,color:#e2e8f0
```

### Data Flow

```
User Action (Scan / Login / Redeem)
  │
  ├─── [Production Mode] ──→ api.post() ──→ fetch() ──→ Render (Express.js)
  │                                                        ├──→ JWT Validation
  │                                                        ├──→ Drizzle ORM
  │                                                        ├──→ Neon PostgreSQL
  │                                                        └──→ Cloudinary (images)
  │
  └─── [Demo Mode] ────────→ api.post() ──→ interceptor ──→ localStorage
                                              ├──→ Mock user profiles
                                              ├──→ Mock scan history
                                              ├──→ Dynamic stats calculation
                                              ├──→ Reward redemption engine
                                              └──→ Leaderboard aggregation
```

---

## 📐 Design Patterns

| Pattern | Usage | Details |
|:--------|:------|:--------|
| 🔀 **Monorepo** | Project structure | Turborepo-managed workspaces (`apps/web`, `apps/backend`, `packages/*`) with shared dependencies and parallel task execution |
| 📋 **MVC** | Backend | Model-View-Controller separation — Drizzle ORM schemas (Models), Express route handlers (Controllers), JSON responses (Views) |
| 🛡️ **Middleware Chain** | Backend security | `Helmet → CORS → JSON Parser → JWT Auth → Route Handler → Error Handler` pipeline |
| 🎣 **React Hooks** | Frontend state | `useState`, `useEffect`, `useRouter`, `useCallback` for component-level state management |
| 🧱 **Type-Safe** | End-to-end | TypeScript across all packages with Zod schema validation on API boundaries |
| 🎭 **Interceptor / Proxy** | Demo mode | API interceptor pattern — `api.ts` intercepts all HTTP calls and routes demo-token requests to localStorage handlers before they reach `fetch()` |
| 📦 **Repository** | Data access | Drizzle ORM provides a repository-like abstraction over raw SQL with type-safe query builders |
| 🏭 **Factory** | Mock data | Dynamic mock data factory functions (`getScansForToken`, `getStatsForToken`, `getLeaderboardForToken`) generate contextual test data per user session |
| 🔐 **Bearer Token** | Authentication | Stateless JWT tokens stored in `localStorage`, attached via `Authorization: Bearer <token>` header on every API request |

---

## 🛠 Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|:-----------|:--------|
| ![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=next.js&logoColor=white) | React framework with App Router, SSR, and file-based routing |
| ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) | Component-based UI library |
| ![TypeScript](https://img.shields.io/badge/TypeScript_5.4-3178C6?style=flat-square&logo=typescript&logoColor=white) | Static type checking and developer experience |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Utility-first CSS framework with glassmorphism and dark mode |
| ![React Webcam](https://img.shields.io/badge/React_Webcam-61DAFB?style=flat-square&logo=react&logoColor=black) | Browser camera integration for real-time waste scanning |
| ![Google Fonts](https://img.shields.io/badge/Outfit_Font-4285F4?style=flat-square&logo=googlefonts&logoColor=white) | Modern typography via `next/font/google` |

### ⚙️ Backend

| Technology | Purpose |
|:-----------|:--------|
| ![Express](https://img.shields.io/badge/Express_4-000000?style=flat-square&logo=express&logoColor=white) | Fast, minimalist web framework for Node.js |
| ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black) | TypeScript-first ORM with SQL-like query builder |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=flat-square&logo=postgresql&logoColor=white) | Production-grade relational database (via Neon) |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Stateless authentication tokens |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white) | Schema validation and type inference |
| ![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=flat-square&logo=letsencrypt&logoColor=white) | Secure password hashing |
| ![Helmet](https://img.shields.io/badge/Helmet-000000?style=flat-square&logo=express&logoColor=white) | HTTP security headers middleware |
| ![CORS](https://img.shields.io/badge/Dynamic_CORS-06B6D4?style=flat-square&logo=express&logoColor=white) | Origin-based access control with Vercel domain allowlist |

### 🧰 DevOps & Tooling

| Technology | Purpose |
|:-----------|:--------|
| ![Turborepo](https://img.shields.io/badge/Turborepo_2.0-EF4444?style=flat-square&logo=turborepo&logoColor=white) | High-performance monorepo build system with caching |
| ![pnpm](https://img.shields.io/badge/pnpm_9.0-F69220?style=flat-square&logo=pnpm&logoColor=white) | Fast, disk-efficient package manager with workspace support |
| ![Docker](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerized PostgreSQL for local development |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | Code linting and quality enforcement |

---

## ☁️ Cloud Services & Deployment Pipeline

EcoScan uses a modern cloud-native deployment pipeline with five key services:

### Deployment Architecture

```
                    ┌──────────────────────────────────────────┐
                    │             GitHub Repository             │
                    │  github.com/Artificial-Ledger-Technology │
                    │             /ALT-EcoScan                  │
                    └───────────┬──────────────┬───────────────┘
                                │              │
                    ┌───────────▼──────┐ ┌─────▼───────────┐
                    │   Vercel (Web)   │ │  Render (API)   │
                    │ Auto-build on    │ │ Auto-deploy on  │
                    │ git push to main │ │ git push to main│
                    │                  │ │                 │
                    │ Next.js 14 SSG   │ │ Express.js API  │
                    │ Edge CDN         │ │ Node.js 20      │
                    └────────┬─────────┘ └───────┬─────────┘
                             │                   │
                             │           ┌───────▼─────────┐
                             │           │  Neon (Database) │
                             │           │  Serverless      │
                             │           │  PostgreSQL 16   │
                             │           │  SSL Connection   │
                             │           └───────┬─────────┘
                             │                   │
                             │           ┌───────▼─────────┐
                             │           │  Cloudinary      │
                             │           │  Image Upload    │
                             │           │  CDN Delivery    │
                             │           └─────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  End User        │
                    │  Browser/Mobile  │
                    └──────────────────┘
```

### Service Details

| # | Service | Role | URL / Dashboard | Plan |
|:-:|:--------|:-----|:----------------|:-----|
| 1 | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | **Frontend Hosting** — Builds the Next.js 14 web app on every `git push` to `main`. Serves static pages via a global Edge CDN with automatic HTTPS. Supports preview deployments for PRs. | [vercel.com/dashboard](https://vercel.com) | Free |
| 2 | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black) | **Backend Hosting** — Runs the Express.js REST API as a managed Node.js web service. Auto-deploys from GitHub. Configured via `render.yaml` blueprint. Health check at `/health`. | [render.com/dashboard](https://render.com) | Free |
| 3 | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) | **Source Control & CI** — Central Git repository for all code. Push to `main` triggers automatic deployments on both Vercel and Render. Conventional Commits enforced. | [github.com/Artificial-Ledger-Technology/ALT-EcoScan](https://github.com/Artificial-Ledger-Technology/ALT-EcoScan) | Free |
| 4 | ![Neon](https://img.shields.io/badge/Neon-00E699?style=flat-square&logo=neon&logoColor=black) | **Serverless PostgreSQL** — Hosts the production PostgreSQL 16 database with automatic scaling, branching, and SSL connections. Connected via `DATABASE_URL` env var with `?sslmode=require`. | [console.neon.tech](https://console.neon.tech) | Free |
| 5 | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | **Image Storage & CDN** — Stores and serves user-uploaded waste scan images. Provides on-the-fly image transformations and optimized delivery via CDN. Configured via `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. | [console.cloudinary.com](https://console.cloudinary.com) | Free |

### Environment Variables Reference

```env
# ── Database (Neon PostgreSQL) ──
DATABASE_URL=postgresql://user:password@host.region.aws.neon.tech/neondb?sslmode=require

# ── Authentication ──
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# ── Server ──
PORT=3001
NODE_ENV=development

# ── Frontend ──
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# ── CORS ──
FRONTEND_URL=http://localhost:3000

# ── Cloudinary (Image Uploads) ──
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:

| Tool | Version | Link |
|:-----|:--------|:-----|
| 🟢 **Node.js** | `≥ 18.0` | [nodejs.org](https://nodejs.org/) |
| 📦 **pnpm** | `≥ 9.0` | [pnpm.io](https://pnpm.io/) |
| 🐳 **Docker** _(optional)_ | Latest | [docker.com](https://docker.com/) |
| 🔀 **Git** | Latest | [git-scm.com](https://git-scm.com/) |

### ⚡ Installation

**1. Clone the repository**

```bash
git clone https://github.com/Artificial-Ledger-Technology/ALT-EcoScan.git
cd ALT-EcoScan
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Edit the `.env` file with your own credentials (see [Environment Variables Reference](#environment-variables-reference) above).

**4. Set up the database**

```bash
# Option A: Using Neon (recommended for production)
# Create a free database at https://console.neon.tech
# Copy the connection string into DATABASE_URL in your .env

# Option B: Using Docker (local PostgreSQL)
docker compose up -d

# Option C: Connect to any PostgreSQL instance
# Set DATABASE_URL to your PostgreSQL connection string
```

**5. Run database migrations and seed data**

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

**6. Start the development servers**

```bash
pnpm dev
```

This launches both services simultaneously via Turborepo:

| Service | URL | Description |
|:--------|:----|:------------|
| 🌐 **Web Portal** | `http://localhost:3000` | Next.js frontend |
| ⚙️ **API Server** | `http://localhost:3001` | Express backend |

### 🚀 Production Deployment

**Frontend (Vercel)**

```bash
# Deploy to Vercel production
npx vercel --prod
```

**Backend (Render)**

The backend auto-deploys from `main` via the `render.yaml` blueprint. You can also trigger a manual deploy from the [Render Dashboard](https://render.com).

---

## 📡 API Reference

All endpoints are prefixed with `/api`. The backend is hosted at `https://ecoscan-api-zjwb.onrender.com`.

### 🔐 Authentication

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Authenticate and receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |

### 📸 Scans

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `POST` | `/api/scans` | Submit a new waste scan | ✅ |
| `GET` | `/api/scans` | Get paginated scan history | ✅ |
| `GET` | `/api/scans/stats` | Get user scan statistics | ✅ |

### 🎁 Rewards

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/api/rewards` | List all available rewards | ✅ |
| `POST` | `/api/rewards/redeem/:id` | Redeem a reward by ID | ✅ |
| `GET` | `/api/rewards/leaderboard` | Get global leaderboard | ❌ |

### ♻️ Recycling

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/api/recycling` | List recycling centers | ❌ |

### 🩺 Health Check

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/health` | Service health status | ❌ |

---

## 🗄️ Database Schema

The PostgreSQL database (hosted on Neon) uses the following Drizzle ORM schema:

```mermaid
erDiagram
    users {
        serial id PK
        varchar username
        varchar email UK
        varchar password
        varchar fullName
        integer totalPoints
        integer level
        timestamp createdAt
    }

    waste_categories {
        serial id PK
        varchar name UK
        varchar icon
        integer pointsPerItem
        text description
    }

    scans {
        serial id PK
        integer userId FK
        integer categoryId FK
        float confidence
        varchar imageUrl
        integer pointsEarned
        timestamp createdAt
    }

    rewards {
        serial id PK
        varchar name
        text description
        integer pointsRequired
        boolean isActive
    }

    redemptions {
        serial id PK
        integer userId FK
        integer rewardId FK
        integer pointsSpent
        timestamp redeemedAt
    }

    recycling_centers {
        serial id PK
        varchar name
        varchar address
        float latitude
        float longitude
        varchar acceptedCategories
    }

    users ||--o{ scans : "performs"
    waste_categories ||--o{ scans : "classifies"
    users ||--o{ redemptions : "redeems"
    rewards ||--o{ redemptions : "redeemed_as"
```

---

## 📁 Project Structure

```
ALT-EcoScan/
├── 📂 apps/
│   ├── 🌐 web/                    # Next.js 14 Web Portal (→ Vercel)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── auth/          # Login & Registration pages
│   │   │   │   │   ├── login/     # JWT login + Presentation Mode button
│   │   │   │   │   └── register/  # User registration
│   │   │   │   ├── dashboard/     # User dashboard with responsive mobile nav
│   │   │   │   ├── scan/          # AI waste scanner (Camera + Upload)
│   │   │   │   ├── history/       # Paginated scan history timeline
│   │   │   │   ├── leaderboard/   # Global rankings with medals
│   │   │   │   ├── rewards/       # Rewards marketplace with redemption
│   │   │   │   ├── layout.tsx     # Root layout (Outfit font, dark mode)
│   │   │   │   ├── page.tsx       # Landing page
│   │   │   │   └── globals.css    # Global styles & animations
│   │   │   └── lib/
│   │   │       └── api.ts         # API client with localStorage mock interceptor
│   │   ├── tailwind.config.ts     # Tailwind theme configuration
│   │   └── package.json
│   │
│   ├── ⚙️ backend/                # Express.js REST API (→ Render)
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   ├── database.ts    # Drizzle + pg Pool (Neon SSL)
│   │   │   │   └── auth.ts        # JWT configuration
│   │   │   ├── controllers/       # Route handler logic
│   │   │   ├── middleware/        # Auth & validation middleware
│   │   │   ├── models/            # Drizzle ORM schema definitions
│   │   │   │   ├── user.ts        # Users table
│   │   │   │   ├── scan.ts        # Scans table
│   │   │   │   ├── reward.ts      # Rewards table
│   │   │   │   ├── redemption.ts  # Redemptions table
│   │   │   │   ├── waste-category.ts  # Waste categories
│   │   │   │   └── recycling-center.ts # Recycling centers
│   │   │   ├── routes/            # API route definitions
│   │   │   │   ├── auth.ts        # Auth routes (/register, /login, /me)
│   │   │   │   ├── scans.ts       # Scan routes (/scans, /stats)
│   │   │   │   ├── rewards.ts     # Rewards routes (/rewards, /redeem, /leaderboard)
│   │   │   │   └── recycling.ts   # Recycling center routes
│   │   │   ├── seed.ts            # Database seeding script
│   │   │   └── index.ts           # Server entry point (Helmet, CORS, routes)
│   │   └── package.json
│   │
│   └── 📱 mobile/                 # React Native Expo (Planned)
│
├── 📦 packages/
│   ├── shared/                    # Shared types, interfaces & Zod schemas
│   └── ui/                        # Shared UI component library
│
├── 🤖 ml/
│   └── labels.json                # Waste classification categories (9 types)
│
├── ☁️ render.yaml                  # Render deployment blueprint
├── 🐳 docker-compose.yml          # PostgreSQL container config
├── ⚡ turbo.json                   # Turborepo pipeline configuration
├── 📋 pnpm-workspace.yaml         # pnpm workspace definition
├── 🔒 .env.example                # Environment variable template
├── 📋 .npmrc                      # pnpm configuration (optional deps disabled)
└── 📖 README.md                   # You are here!
```

---

## 🗂️ Waste Categories

EcoScan supports classification across **9 waste categories**:

| Icon | Category | Examples |
|:-----|:---------|:---------|
| 🥤 | **Plastic** | Bottles, bags, containers, packaging |
| 📄 | **Paper** | Newspapers, cardboard, notebooks |
| 🫙 | **Glass** | Bottles, jars, window glass |
| 🥫 | **Metal** | Cans, foil, scrap metal |
| 🍌 | **Organic** | Food scraps, yard waste, compost |
| 💻 | **Electronic** | Phones, cables, circuit boards |
| 👕 | **Textile** | Clothing, fabric, rags |
| ☢️ | **Hazardous** | Chemicals, paint, medical waste |
| 🔋 | **Battery** | Alkaline, lithium, rechargeable |

---

## 🗺️ Roadmap

- [x] 🏗️ Monorepo scaffolding with Turborepo + pnpm workspaces
- [x] 🔐 JWT authentication (register, login, protected routes)
- [x] 📸 AI waste scanning interface (camera + upload)
- [x] 📊 User dashboard with analytics and category breakdowns
- [x] 🏆 Global leaderboard with dynamic rankings
- [x] 🎁 Rewards marketplace with point redemption
- [x] 🕰️ Paginated scan history with confidence scores
- [x] 🌙 Premium dark-mode glassmorphic UI
- [x] ☁️ Cloud deployment (Vercel + Render + Neon + Cloudinary)
- [x] 🎭 Presentation Demo Mode with localStorage mock database
- [x] 📱 Mobile-responsive layout with hamburger navigation
- [x] 🚪 Full login/logout session management
- [x] 🔄 Dynamic CORS configuration for multi-origin support
- [x] 🛡️ Security hardening with Helmet.js
- [ ] 🤖 TensorFlow.js on-device inference
- [ ] 📱 React Native mobile app (Expo)
- [ ] 🔔 Push notifications for milestones
- [ ] 🏫 Campus-wide deployment and scaling
- [ ] 📈 Admin analytics dashboard
- [ ] 🌍 Multi-language (i18n) support

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feat/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feat/amazing-feature
   ```
5. **Open** a Pull Request

### 📝 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Description |
|:-------|:------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style (formatting, no logic change) |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

---

## 👥 Team

<table>
  <tr>
    <td align="center" width="33%">
      <strong>Jay Arre Talosig</strong><br/>
      <sub>Full-Stack Engineer</sub>
    </td>
    <td align="center" width="33%">
      <strong>Jonabie M. Piodo</strong><br/>
      <sub>Frontend Engineer</sub>
    </td>
    <td align="center" width="33%">
      <strong>Isiah Carl C. Paed</strong><br/>
      <sub>Backend Engineer</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <strong>Jaymee A. Aballe</strong><br/>
      <sub>Mobile Engineer</sub>
    </td>
    <td align="center" width="33%">
      <strong>Dea Ayel M. Diomampo</strong><br/>
      <sub>Mobile Engineer</sub>
    </td>
    <td align="center" width="33%">
      <strong>Ethylhexyl Eve B. Panerio</strong><br/>
      <sub>UI/UX Designer</sub>
    </td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Artificial Ledger Technology | Jay Arre Talosig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — The React Framework for the Web
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Drizzle ORM](https://orm.drizzle.team/) — TypeScript ORM for SQL databases
- [Turborepo](https://turbo.build/) — High-performance build system for monorepos
- [Vercel](https://vercel.com/) — Frontend cloud platform for instant deployments
- [Render](https://render.com/) — Unified cloud for backend hosting
- [Neon](https://neon.tech/) — Serverless PostgreSQL with branching
- [Cloudinary](https://cloudinary.com/) — Cloud-based image and video management
- [Google Fonts - Outfit](https://fonts.google.com/specimen/Outfit) — Modern, clean typography

---

<p align="center">
  <strong>Built with 💚 for a cleaner planet</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Powered_by-AI-10B981?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel_+_Render-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/For_a-Greener_World-22C55E?style=for-the-badge&logo=leaflet&logoColor=white" />
</p>
