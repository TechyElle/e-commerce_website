Website Features Checklist

✅ Product Management
Add product page
✅ Product details page (mock data, displayed in card)
✅ Add to cart
✅ Update quantity (implicit, adding same item increases quantity)

❌ Payment Integration
GCash
Maya
Cash on Delivery
(Optional) Card payments

✅ Database (PHP + MySQL — DB-backed, localStorage removed)
Store:
✅ Users
✅ Products
✅ Orders
✅ Sales

✅ Inventory System
✅ Auto-deduct stock after checkout (StoreContext.createOrder)
✅ Show "Out of Stock" status

✅ Admin Dashboard ( IMPORTANT)
✅ Admin-only access (protected /admin + /dashboard)
✅ Sales analytics (total revenue, daily/monthly sales)
✅ Order management (view, update status: pending → shipped → delivered)
✅ Product management (add/edit/delete products)
✅ Inventory monitoring (stock tracking + Out of Stock)
✅ User management (view registered users)
✅ Access control (only admin can open /admin page)

✅ Responsive Design
Mobile friendly
Tablet view
Desktop view

❌ Security
Form validation
Form validation (JS)

✅ Navigation / Core Pages
✅ Home
✅ Sign up
✅ Log in
✅ Account dropdown
✅ Category dropdown
✅ Wishlist
✅ Cart
✅ Checkout
✅ About
✅ Contact
✅ 404 Error
✅ Product details page

---

To Do (Delegated + Timeline — Deadline: June 15):

Jayson — Payments + Checkout Wiring (GCash/Maya/COD)
- Update Checkout flow based on payment method
- Add payment status handling UI/state (pending → confirmed) + persist selection
- Deliverable: working payment UX end-to-end (COD immediate; GCash/Maya simulated flow if no gateway yet)
- Deadline: May 25 (draft) / June 1 (integrated)

Gold — PHP + MySQL Real Database Migration (replace localStorage/mock)
✅ Implement PHP+MySQL endpoints: users, products, orders, sales
✅ Refactor StoreContext persistence to use API instead of localStorage
✅ Deliverable: admin CRUD + order creation/status backed by DB
✅ Deadline: May 25 (DB schema + API contracts) DONE / June 8 (integration complete) IN PROGRESS

Nharill — AI Predictions + Product Description/Categories Cleanup
- Replace Dashboard hardcoded analytics/AI insights with computed values from real order + inventory data
- Add/standardize product description/category fields across data + detail views
- Deliverable: AI insights are data-driven (no fixed mock arrays)
- Deadline: May 25 (analytics stubs) / June 8 (dashboard uses real DB data)

Cross-cutting / Final polish
- Inventory auto-deduct + out-of-stock behavior verification with DB-backed data
- Consolidate vanilla files into unified index.html (if still applicable)
- Deadline for stabilization + QA: June 8 / Final demo build: June 15


---

# Apache Cordova (Android-only) Installation Steps
- [x] Step 1: Confirm Node.js + npm installed (`node --version`, `npm --version`)
- [x] Step 2: Confirm Git installed (`git --version`)
- [x] Step 3: Install Cordova CLI globally (`npm install -g cordova`)
- [x] Step 4: Install/verify JDK 17 and configure JAVA_HOME
- [x] Step 5: Install Android Studio + Android SDK (set ANDROID_HOME + PATH)
- [x] Step 6: Create a first Cordova project (`cordova create cordova-mobile com.xontrix.ecommerce XontrixMobile`)
- [x] Step 7: Add Android platform (`cordova platform add android`) and run requirements (`cordova requirements android`)
- [x] Step 8: Build Android APK (`cordova build android`)
- [ ] Step 9: Run on Android device/emulator (`cordova run android`) - waiting for a connected device or started emulator

---

# Local dev run notes
- Vite dev server is running at: http://localhost:5174/
- (Port auto-incremented because 5173 was already in use)

