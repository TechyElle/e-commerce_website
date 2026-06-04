# Website Features Checklist

Use this file for update tracking and QA before demo/deployment.

## Product Management

- [x] Add product page/admin form
- [x] Product details page
- [x] Add to cart
- [x] Remove from cart
- [x] Update quantity
- [x] Quantity capped by available stock

## Payment Integration

- [x] GCash checkout option
- [x] Maya checkout option
- [x] Cash on Delivery checkout option
- [ ] Optional card payments
- [ ] Real payment gateway/API processing

## Database: PHP and MySQL with XAMPP

- [x] Users table/API
- [x] Products table/API
- [x] Orders table/API
- [x] Sales analytics API

## Inventory System

- [x] Auto-deduct stock after checkout
- [x] Reject checkout when requested quantity exceeds stock
- [x] Show "Out of Stock" status on product cards/details/admin inventory
- [x] Prevent adding out-of-stock products to cart

## Admin Dashboard

- [x] Admin-only access for `/admin`
- [x] Backend admin checks for admin APIs
- [x] Sales analytics: total, daily, monthly revenue
- [x] Order management: pending -> shipped -> delivered
- [x] Product management: add/edit/delete products
- [x] Inventory monitoring and stock tracking
- [x] User management: view registered users
- [x] Access control for admin routes
- [ ] QA with non-admin account blocked from `/admin`

## Responsive Design

- [x] Mobile friendly layout
- [x] Tablet view
- [x] Desktop view
- [ ] Manual responsive QA in browser/device

## Security

- [x] Login/register form validation
- [x] Password hashing in PHP backend
- [x] Session-based login system
- [x] Protected admin routes in frontend
- [x] Role-based backend access control
- [ ] Google authentication
- [ ] Production hardening: protect/delete `install.php`
- [ ] Production hardening: HTTPS, secure environment credentials, CSRF strategy

## APK / Device Install

- [x] Cordova mobile project exists
- [ ] Build APK and install on device
- [ ] Confirm Apache and MySQL are reachable from the device
- [ ] Confirm map/navigation requirement: "Apache and Waze to use"

## Final QA Commands

- [x] Run `npm run build`
- [ ] Run frontend locally with XAMPP backend
- [ ] Test checkout creates order and deducts stock
- [ ] Test admin product/order/user workflows
