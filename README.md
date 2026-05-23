# E-Commerce Website

This is a modern E-Commerce website for electronics components and kits, built with React, TypeScript, Vite, TailwindCSS, and shadcn/ui. Originally imported from [Figma design](https://www.figma.com/design/0gN8cl3tMhrqdRIk4GiDKp/E-commerce-website).

https://github.com/TechyElle/e-commerce_website

Features:
- Responsive design with TailwindCSS 4
- Client-side routing with React Router
- Product catalog with details and cart functionality
- UI components from shadcn/ui (Radix UI primitives)
- Product images and mock data included

## Prerequisites

- Node.js >= 18
- [pnpm](https://pnpm.io/installation) (recommended, as per lockfile)

## Quick Start

```bash
pnpm install
pnpm dev
```

The development server will start at http://localhost:5173.

## Detailed Setup

1. **Clone the repository** (if not already):
   ```bash
   git clone https://github.com/TechyElle/e-commerce_website.git
   cd e-commerce_website
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```
   If you prefer npm:
   ```bash
   npm install
   ```
   (Note: pnpm is recommended for exact dependency resolution.)

3. **Start development server**:
   ```bash
   pnpm dev
   ```
   - Opens http://localhost:5173
   - Hot reload enabled
   - TypeScript checking on

## Project Structure

```
.
├── index.html          # Entry point
├── package.json        # Dependencies & scripts
├── vite.config.ts      # Vite config (React + Tailwind + aliases)
├── src/
│   ├── main.tsx        # App entry
│   ├── app/
│   │   ├── App.tsx           # Root component
│   │   ├── routes.tsx        # Routing config
│   │   ├── pages/            # Page components (Home, Products, Cart, etc.)
│   │   ├── components/       # UI components (Layout, ProductCard, shadcn/ui)
│   │   ├── context/          # CartContext
│   │   └── data/             # Mock products
│   ├── imports/              # Assets (products images, logo)
│   └── styles/               # Global CSS (Tailwind)
├── pnpm-lock.yaml      # Lockfile
└── ...
```

## Available Pages/Routes

- `/` - Home
- `/products` - Product catalog
- `/products/:id` - Product detail
- `/cart` - Shopping cart
- `/about` - About
- `/contact` - Contact
- `/dashboard` - Dashboard
- `*` - 404 Not Found

## Build for Production

```bash
pnpm build
```

- Outputs to `dist/` folder
- Serve with any static server, e.g., `npx serve dist`
- Or deploy to Vercel/Netlify (Vite supports zero-config).

## Scripts

From `package.json`:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |

## Troubleshooting

- **pnpm not found**: Install with `npm install -g pnpm`
- **Port in use**: `pnpm dev --port 3000`
- **TypeScript errors**: Ensure `@types/*` installed (`pnpm install`)
- **Styles missing**: Tailwind is configured via Vite plugin; clear cache if needed (`rm -rf node_modules/.vite`)

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 4 + shadcn/ui
- **Routing**: React Router
- **Icons**: Lucide React
- **State**: React Context (Cart)

## Credits

- Design: [Figma E-Commerce](https://www.figma.com/design/0gN8cl3tMhrqdRIk4GiDKp/E-commerce-website)
- Components: [shadcn/ui](https://ui.shadcn.com/)
- Product images: Local assets

Enjoy building your e-commerce site!
