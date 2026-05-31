## TODO

- [x] Implement Shopee-like Cart page UI in `src/app/pages/Cart.tsx`

  - [ ] Group items by seller/shop (mock seller label) and show Preferred badge

  - [ ] Item rows: thumbnail, name, variation/size, unit price (sale crossed-out), qty stepper, subtotal, delete
  - [ ] Bundle deal banner per shop group (mock logic)
  - [ ] Voucher section + shipping promo text
  - [ ] Sticky bottom bar: Select All, Delete, Remove inactive, Move to My Likes, total/saved, Check Out button
  - [ ] Platform Voucher row + Shopee Coins row (disabled state if insufficient)
- [ ] Replace Checkout success flow with Place Order / Payment UI in `src/app/pages/Checkout.tsx`
  - [ ] Delivery Address section
  - [ ] Products ordered table (seller w/ Preferred + chat now, E-invoice request, shop voucher select, message input, shipping option row with change, Self pick-up alternate)
  - [ ] Payment method tabs + Payment Center/E-wallet radio list (7-Eleven, GCash default selected, Maya)
  - [ ] Order summary card with admin fee tooltip icon and large Place Order CTA
  - [ ] Place Order triggers `createOrder` and then shows a success screen (or redirect)
- [ ] Verify app manually via `npm run dev`


