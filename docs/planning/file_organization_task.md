# File Organization Tasks

## Phase 1 – Root-level file cleanup
- [/] Move `implementation_plan.md` → `docs/`
- [ ] Move `task.md` → `docs/`
- [ ] Move `extracted_text.txt` → `docs/`
- [ ] Move `admin_sample_ui.png` → `docs/screenshots/`

## Phase 2 – Rename & restructure `src/imports/` → `src/assets/`
- [ ] Rename `src/imports/Images/` → `src/assets/images/`
- [ ] Rename `src/imports/Logo & QR/` → `src/assets/logo/`
- [ ] Move product images from `src/imports/Products/Products/` → `src/assets/products/`
- [ ] Delete duplicate `src/imports/Products/Products/` nested folder
- [ ] Delete old empty `src/imports/` folder

## Phase 3 – Misplaced web root files
- [ ] Move `apps/web/PRODUCTS.pdf` → `docs/`
- [ ] Move `apps/web/default_shadcn_theme.css` → `apps/web/src/styles/`

## Phase 4 – Component cleanup
- [ ] Move `components/figma/ImageWithFallback.tsx` → `components/ImageWithFallback.tsx`
- [ ] Delete empty `components/figma/` folder
- [ ] Move `src/app/Attributions.md` → `docs/`

## Phase 5 – Update import paths in source files
- [ ] Update `src/app/lib/productImages.ts` (29 imports: `imports/Products/Products/` → `assets/products/`)
- [ ] Update `src/app/pages/ProductDetail.tsx` (string paths in image map)
- [ ] Update `src/app/pages/Login.tsx` (imports: images + logo)
- [ ] Update `src/app/components/Layout.tsx` (logo imports)
- [ ] Update `src/app/pages/About.tsx` (logo import)
- [ ] Update `src/app/pages/Contact.tsx` (logo import)

## Phase 6 – Verify
- [ ] Confirm dev server builds without errors
