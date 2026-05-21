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

✅ Database (Mock / Local Storage)
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

To Do:
Payment Integration (GCash / Maya / COD wiring)
Real Database (Firestore/SQL) integration
Inventory auto-deduct (if migrating away from StoreContext/local)
AI Sales Predictions (replace mock with real model)
PHP + MySQL backend (if migrating away from Firebase)
Product Description
Categories
Consolidate vanilla files into a unified index.html


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
