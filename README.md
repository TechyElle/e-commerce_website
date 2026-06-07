# Xontrix Integrated Electronics E-Commerce & AI-Powered Business Management Platform

Electronics e-commerce for components & kits, backed by a simple PHP/MySQL API, and designed to be extended with AI/insights. The UI was originally imported from a Figma e-commerce design and built as a React + TypeScript SPA.

## Highlights

- **Electronics product catalog** with product detail pages
- **Cart + Checkout UI** (client-side experience)
- **Admin/Dashboard pages** backed by authenticated API endpoints
- **Backend-driven data** via a PHP/MySQL REST-like API (`xontrix-backend`)
- **shadcn/ui** powered interface components
- **Responsive layout** with Tailwind

## Architecture

This repository is split into two parts:

1. **Frontend (React + Vite)**
   - Lives in: `src/`
   - Runs on: `pnpm dev` (Vite dev server)
   - API client: `src/app/lib/api.ts`

2. **Backend (PHP + MySQL)**
   - Lives in: `xontrix-backend/`
   - Expected to be hosted under an Apache server (e.g., XAMPP)
   - Install & schema: `xontrix-backend/api/install.php`, `xontrix-backend/api/schema.sql`

## Quick Start (Frontend + Backend)

### 1) Run the PHP/MySQL backend (XAMPP)

Follow `xontrix-backend/README.md`:

1. Copy `xontrix-backend` into:

   ```txt
   C:\xampp\htdocs\xontrix-backend
   ```

2. Start Apache + MySQL in XAMPP.

3. Open once to install schema + seed data:

   ```txt
   http://localhost/xontrix-backend/api/install.php
   ```

4. Login (default seeded account):

   ```txt
   Email: admin@xontrix.local
   Password: admin123
   ```

### 2) Configure frontend API base URL

The frontend API client uses:

- `src/app/lib/api.ts`
- `BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost/xontrix-backend/api'`

Add a `.env` file at the project root (example):

```bash
VITE_API_URL=http://localhost/xontrix-backend/api
```

> If you host the backend under a different folder/port, update `VITE_API_URL`.

### 3) Start the frontend

```bash
pnpm install
pnpm dev
```

The dev server runs at: http://localhost:5173

## Frontend Environment Notes

### Firebase
`src/app/lib/firebase.ts` contains placeholder Firebase config. If you don’t use Firebase auth/storage right now, the app treats it as unconfigured:

- `isFirebaseConfigured` becomes `false` when `apiKey` starts with `YOUR_`.

## Routes / Pages

Typical routes available in the UI:

- `/` - Home
- `/products` - Product catalog
- `/products/:id` - Product detail
- `/cart` - Cart
- `/checkout` - Checkout
- `/dashboard` - Dashboard (admin area)
- `/admin` - Admin
- `/login` - Login
- `/about` - About
- `/contact` - Contact
- `*` - 404 Not Found

## Project Structure

```txt
.
├── index.html                 # Vite entry
├── package.json               # Frontend scripts/deps
├── vite.config.ts             # React + Tailwind config
├── src/
│   ├── main.tsx               # App bootstrap
│   ├── app/
│   │   ├── App.tsx            # Root component
│   │   ├── routes.tsx        # Routing
│   │   ├── pages/            # Screens (Home, Products, Cart, etc.)
│   │   ├── components/      # Reusable UI
│   │   ├── context/         # Auth/Cart/Store state
│   │   └── lib/             # API client (src/app/lib/api.ts)
│   ├── imports/              # Local assets (product images, logo)
│   └── styles/               # Tailwind/global styles
└── xontrix-backend/
    └── api/                  # PHP endpoints + schema/install
```

## Build for Production

```bash
pnpm build
```

Output: `dist/`

Serve `dist/` with any static server (or deploy via Vercel/Netlify).

## Roadmap

See `TODO.md`. Current high-level items include:

- Shopee-like cart experience updates
- Checkout payment & place-order flow refinements

## Credits & Licensing

- **Design inspiration**: Figma E-Commerce (see `src/app/Attributions.md` and `Attributions.md`)
- **UI components**: shadcn/ui (Radix UI primitives)
- **Assets**: local product images in `imports/`

`Attributions.md` contains additional attributions/licenses.

