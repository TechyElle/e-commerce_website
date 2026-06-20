# File Organization Plan – Xontrix AI-Powered E-Commerce

## Overview
The project is a **monorepo** (`apps/web`, `apps/backend`, `apps/mobile`) with documentation in `docs/`. 
Several structural issues were found during the audit. The changes below clean them up **without breaking any existing imports** (import paths within source files are updated accordingly).

---

## Issues Found

| # | Issue | Location |
|---|-------|----------|
| 1 | Loose files in project root that belong elsewhere | `implementation_plan.md`, `task.md`, `extracted_text.txt`, `admin_sample_ui.png` |
| 2 | `src/imports/` is a non-standard name for an assets folder | `apps/web/src/imports/` |
| 3 | `src/imports/Products/Products/` — duplicate nested folder | `apps/web/src/imports/Products/Products/` |
| 4 | `src/imports/Logo & QR/` — folder name with spaces & special char | `apps/web/src/imports/Logo & QR/` |
| 5 | `default_shadcn_theme.css` in web root, duplicates `src/styles/default_theme.css` | `apps/web/default_shadcn_theme.css` |
| 6 | `PRODUCTS.pdf` (product catalog) sitting in web root | `apps/web/PRODUCTS.pdf` |
| 7 | `src/app/components/figma/ImageWithFallback.tsx` — a utility component in a `figma/` subfolder | `apps/web/src/app/components/figma/` |
| 8 | `src/app/Attributions.md` — doc file inside source code tree | `apps/web/src/app/Attributions.md` |
| 9 | `src/app/data/products.ts` — data layer mixed with app logic | `apps/web/src/app/data/` |

---

## Proposed Changes

### 1. Root-level loose files → `docs/`

Move these files from `e-commerce_website-main/` to `docs/`:

| File | Destination |
|------|-------------|
| `implementation_plan.md` | `docs/implementation_plan.md` |
| `task.md` | `docs/task.md` |
| `extracted_text.txt` | `docs/extracted_text.txt` |
| `admin_sample_ui.png` | `docs/screenshots/admin_sample_ui.png` |

---

### 2. Rename `src/imports/` → `src/assets/`

The conventional name for static asset folders in Vite/React projects is `assets`.

| Old Path | New Path |
|----------|----------|
| `apps/web/src/imports/` | `apps/web/src/assets/` |

Sub-folder renames inside the new `assets/`:

| Old | New |
|-----|-----|
| `assets/Images/` | `assets/images/` *(lowercase)* |
| `assets/Products/` | `assets/products/` *(lowercase)* |
| `assets/Logo & QR/` | `assets/logo/` *(no spaces/special chars)* |

Also, the duplicate nested `assets/products/Products/` folder will be **deleted** — its files are exact duplicates already present in `assets/products/`.

> [!IMPORTANT]
> All `import` statements referencing `src/imports/...` or `src/imports/Products/`, etc. must be updated in source files. The key files to update are `src/app/lib/productImages.ts` and any other file with these import paths.

---

### 3. Move `PRODUCTS.pdf` → `docs/`

| Old | New |
|-----|-----|
| `apps/web/PRODUCTS.pdf` | `docs/PRODUCTS.pdf` |

---

### 4. Move `default_shadcn_theme.css` → `src/styles/`

This file is a theme CSS file and belongs with the other style files.

| Old | New |
|-----|-----|
| `apps/web/default_shadcn_theme.css` | `apps/web/src/styles/default_shadcn_theme.css` |

---

### 5. Flatten `components/figma/` → `components/`

The `figma/` subfolder only contains one file (`ImageWithFallback.tsx`) and the name `figma` is misleading (it's a utility component, not a Figma-specific export).

| Old | New |
|-----|-----|
| `apps/web/src/app/components/figma/ImageWithFallback.tsx` | `apps/web/src/app/components/ImageWithFallback.tsx` |

> [!IMPORTANT]
> Any import of `ImageWithFallback` from other files must be updated.

---

### 6. Move `src/app/Attributions.md` → `docs/`

Attribution markdown is documentation, not source code.

| Old | New |
|-----|-----|
| `apps/web/src/app/Attributions.md` | `docs/Attributions.md` *(consolidate with `docs/Attributions.md` that already exists there)* |

---

## Open Questions

> [!IMPORTANT]
> **Should `src/app/data/` be renamed to `src/app/services/` or kept as `data/`?**  
> It currently holds `products.ts` which fetches/shapes product data. Renaming it to `services/` is more conventional for API/data layer files, but it's a minor change. If you prefer to keep `data/` as-is, the rest of the plan is unaffected.

> [!NOTE]
> The `apps/backend/xontrix-backend/` nested folder (backend inside a folder named `backend`) is redundant nesting. The plan **does not** restructure this as it may affect server deployment configs.

---

## Verification Plan

### Manual Verification
- Run `npm run dev` (or `pnpm run dev`) in `apps/web/` after changes to confirm no broken imports
- Check that all product images render correctly in the browser
- Verify that authentication (Login page) still shows the login image

### Files to update for import paths
- `apps/web/src/app/lib/productImages.ts` — references `../imports/Products/...`
- Any component that imports from `figma/ImageWithFallback`
- `vite.config.ts` — if it has any path aliases pointing to `imports/`
