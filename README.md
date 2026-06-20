<p align="center">
  <img src="https://img.shields.io/badge/🛒_Xontrix-Electronics_E--Commerce-FF6B6B?style=for-the-badge&logoColor=white" alt="Xontrix Badge" />
</p>

<h1 align="center">🛒 Xontrix</h1>

<p align="center">
  <strong>Integrated Electronics E-Commerce & AI-Powered Business Management Platform</strong>
</p>

<p align="center">
  Electronics e-commerce for components & kits, backed by a simple PHP/MySQL API, and designed to be extended with AI/insights.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-highlights">Highlights</a> •
  <a href="#️-architecture">Architecture</a> •
  <a href="#-routes--pages">Routes</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-build-for-production">Build</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## ✨ Highlights

- **Electronics product catalog** with product detail pages
- **Cart + Checkout UI** (client-side experience)
- **Admin/Dashboard pages** backed by authenticated API endpoints
- **Backend-driven data** via a PHP/MySQL REST-like API (`xontrix-backend`)
- **shadcn/ui** powered interface components
- **Responsive layout** with Tailwind CSS

---

## 🏗️ Architecture

This repository is structured as a monorepo containing:

### Frontend (React + Vite)
- **Location**: `apps/web/src/`
- **Dev Server**: `pnpm dev` (Vite dev server)
- **API Client**: `apps/web/src/app/lib/api.ts`

### Backend (PHP + MySQL)
- **Location**: `apps/backend/xontrix-backend/`
- **Server**: Apache (e.g., XAMPP)
- **Install & Schema**: `apps/backend/xontrix-backend/api/install.php`, `apps/backend/xontrix-backend/api/schema.sql`

---

## 🚀 Quick Start

### 1️⃣ Run the PHP/MySQL Backend (XAMPP)

Follow `apps/backend/xontrix-backend/README.md`:

1. Copy `apps/backend/xontrix-backend` into:
   ```
   C:\xampp\htdocs\xontrix-backend
   ```

2. Start Apache + MySQL in XAMPP.

3. Open once to install schema + seed data:
   ```
   http://localhost/xontrix-backend/api/install.php
   ```

4. Login with default seeded account:
   ```
   Email: admin@xontrix.local
   Password: admin123
   ```

### 2️⃣ Configure Frontend API Base URL

The frontend API client uses `apps/web/src/app/lib/api.ts` with:
```
BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost/xontrix-backend/api'
```

Add a `.env` file at the project root or under `apps/web/`:
```bash
VITE_API_URL=http://localhost/xontrix-backend/api
```

> If you host the backend under a different folder/port, update `VITE_API_URL`.

### 3️⃣ Start the Frontend

```bash
pnpm install
pnpm dev
```

**Dev server**: http://localhost:5173

---

## 🔧 Frontend Configuration

### Firebase

This app already includes Google sign-in via Firebase. To enable it:

1. Copy `apps/web/.env.example` to `apps/web/.env`.
2. Create a Firebase project in the Firebase Console.
3. Add a Web app and enable Google authentication in Firebase Authentication.
4. Paste the generated Firebase config values into `apps/web/.env`.

Example keys you must fill in:

- `VITE_FIREBASE_API_KEY`



- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Once configured, the login page will use Firebase's `signInWithPopup()` flow and then call the backend `users.php?action=google` endpoint.

If any Firebase config value is missing or blank, `isFirebaseConfigured` in `apps/web/src/app/lib/firebase.ts` becomes `false` and the Google button stays disabled.

---

## 🗺️ Routes & Pages

Available routes in the UI:


| Route | Description |
|:------|:------------|
| `/` | Home page |
| `/products` | Product catalog |
| `/products/:id` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout flow |
| `/dashboard` | Dashboard (admin area) |
| `/admin` | Admin panel |
| `/login` | Login page |
| `/about` | About page |
| `/contact` | Contact page |
| `*` | 404 Not Found |

---

## 📁 Project Structure

```
.
├── package.json               # Root dependencies & workspace scripts
├── pnpm-workspace.yaml        # pnpm workspace configuration
├── pnpm-lock.yaml             # pnpm lockfile
├── apps/
│   ├── web/                   # Frontend (React + Vite + Tailwind + shadcn/ui)
│   │   ├── index.html         # Vite entry point
│   │   ├── vite.config.ts     # Vite config
│   │   ├── package.json       # Web app scripts/deps
│   │   └── src/
│   │       ├── main.tsx       # Application bootstrap
│   │       └── app/           # routes, pages, components, context, lib
│   ├── backend/
│   │   └── xontrix-backend/  # PHP/MySQL REST-like API (Apache + MySQL)
│   └── mobile/
│       └── cordova-mobile/   # Cordova mobile app
└── docs/                      # Documentation + screenshots + assets
    └── screenshots/
```



---

## 🔨 Build for Production

```bash
pnpm build
```

**Output**: `dist/`

Serve the `dist/` folder with any static server or deploy via Vercel/Netlify.

---

## 🖼️ Screenshots

A few moments from the Xontrix experience — crafted for fast browsing, confident checkout, and an admin dashboard that brings sales insights to life.

### Screenshots Gallery

| # | Page | Preview |
|---:|---|---|
| 1 | Homepage | ![1_homepage](docs/screenshots/1_homepage.png) |
| 2 | Homepage (alt) | ![1.1_homepage](docs/screenshots/1.1_homepage.png) |
| 3 | Homepage Footer | ![1.2_footer](docs/screenshots/1.2_footer.png) |
| 4 | Shop / Products | ![2_shoppage](docs/screenshots/2_shoppage.png) |
| 5 | “Sulit Deal” / Deals | ![3_sulitdealpage](docs/screenshots/3_sulitdealpage.png) |
| 6 | About | ![4_aboutpage](docs/screenshots/4_aboutpage.png) |
| 7 | Contact | ![5_contactpage](docs/screenshots/5_contactpage.png) |
| 8 | Cart (Empty) | ![6_cartempty](docs/screenshots/6_cartempty.png) |
| 9 | Checkout | ![7_checkout](docs/screenshots/7_checkout.png) |

> Tip: The screenshots are stored under `docs/screenshots/`.

---

## 🗺️ Roadmap


Current high-level items:

- Shopee-like cart experience updates
- Checkout payment & place-order flow refinements

See `TODO.md` for more details.

---

## 📄 Credits & Licensing

- **Design Inspiration**: Figma E-Commerce (see `src/app/Attributions.md` and `Attributions.md`)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Assets**: Product images in `imports/`

Additional attributions and licenses are available in `Attributions.md`.

---

<p align="center">
  <img src="https://img.shields.io/badge/Built_with-React_%2B_TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Styled_with-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Powered_by-PHP_%2B_MySQL-4479A1?style=for-the-badge&logo=php&logoColor=white" />
</p>

