import { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router';
import {
  ArrowRight,
  CreditCard,
  Package,
  MapPin,
  MessageSquare,
  Pencil,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore, type StoreOrder } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

function formatPhp(n: number) {
  return `₱${n.toFixed(2)}`;
}

function formatPhp0(n: number) {
  return `₱${Math.round(n).toFixed(0)}`;
}

export function Checkout() {
  const { cart, clearCart } = useCart();

  // Restore selected items from Cart selection to prevent the empty "NO ITEMS TO CHECKOUT" state.
  // This fixes state-passing loss during /cart -> /checkout route transitions.
  const [checkoutCart, setCheckoutCart] = useState<typeof cart>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('xontrix-checkout-items');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCheckoutCart(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const effectiveCart = checkoutCart.length > 0 ? checkoutCart : cart;

  const { createOrder } = useStore();
  const { user } = useAuth();

  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<StoreOrder | null>(null);

  // UI state
  const [paymentTab, setPaymentTab] = useState<string>('payment_center');
  const [paymentOption, setPaymentOption] = useState<'7eleven' | 'gcash' | 'maya'>('gcash');

  const [recipientName, setRecipientName] = useState(user?.displayName || 'John Doe');
  const [recipientPhone, setRecipientPhone] = useState(
    // AppUser shape may not include a phone field in this project.
    // Keep UI stable with a fallback.
    (user as any)?.phoneNumber || (user as any)?.phone || '09XXXXXXXXX'
  );

  const [addressLine, setAddressLine] = useState('Brgy. Example, City, Country');

  const [defaultAddress, setDefaultAddress] = useState(true);

  const merchandiseSubtotal = useMemo(
    () => effectiveCart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [effectiveCart]
  );
  const shippingSubtotal = useMemo(
    () => (merchandiseSubtotal >= 999 || merchandiseSubtotal === 0 ? 0 : 50),
    [merchandiseSubtotal]
  );

  const adminFee = 10; // UI mock
  const totalPayment = useMemo(() => merchandiseSubtotal + shippingSubtotal + adminFee, [merchandiseSubtotal, shippingSubtotal]);

  const paymentMethodLabel = useMemo(() => {
    // Map radio selection to a stored-ish string
    if (paymentOption === '7eleven') return 'payment_center_7eleven';
    if (paymentOption === 'maya') return 'payment_center_maya';
    return 'payment_center_gcash';
  }, [paymentOption]);

  const groupedItems = useMemo(() => {
    const map = new Map<string, typeof cart>();
    for (const item of cart) {
      const key = item.category || 'Xontrix Shop';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries()).map(([seller, items]) => ({ seller, items }));
  }, [cart]);

  const preferredSellers = useMemo(() => {
    const set = new Set<string>();
    groupedItems.forEach((g) => {
      const s = g.seller.toLowerCase();
      if (s.includes('micro') || s.includes('sensor') || s.includes('passive') || s.includes('display')) {
        set.add(g.seller);
      }
    });
    return set;
  }, [groupedItems]);

  const isPreferred = (seller: string) => preferredSellers.has(seller);

  const canPlace = cart.length > 0 && !placing;

  const onPlaceOrder = async () => {
    if (!canPlace) return;
    setPlacing(true);
    try {
      const placed = await createOrder({
        items: cart,
        paymentMethod: paymentMethodLabel,
        customerName: recipientName,
        customerEmail: user?.email || 'guest@xontrix.local',
      });
      setPlacedOrder(placed);
      clearCart();
    } finally {
      setPlacing(false);
    }
  };

  const PRIMARY_COLOR = 'var(--accent)';
  const ACCENT_COLOR = 'var(--accent)';
  const BG_COLOR = 'var(--surface)';

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl text-[#111111] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            NO ITEMS TO CHECKOUT
          </h2>
          <p className="text-[#7d8184] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Wala kang items sa cart!
          </p>
          <Link to="/products">
            <button className="cyber-button px-8 py-3">
              SHOP NOW
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-20 h-20 mx-auto mb-4 flex items-center justify-center"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '2px solid #10b981',
                boxShadow: '0 0 30px rgba(16,185,129,0.2)',
              }}
            >
              <Package className="w-10 h-10 text-[#10b981]" />
            </div>
            <h1 className="text-3xl sm:text-4xl text-[#111111] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
              ORDER PLACED!
            </h1>
            <p className="text-[#7d8184] text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              Salamat sa iyong order! 🎉
            </p>
            <div className="inline-block mt-3 px-4 py-2 border border-[rgba(219,68,68,0.3)] bg-[rgba(219,68,68,0.08)]">
              <span className="text-[#db4444] text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Order #{placedOrder.id}
              </span>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-black/10 rounded-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
              <h2 className="text-lg text-[#111111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                PAYMENT SUMMARY
              </h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Subtotal
                </span>
                <span className="text-[#111111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {formatPhp(placedOrder.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Shipping
                </span>
                <span className="text-[#111111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {placedOrder.shipping === 0 ? 'FREE' : formatPhp(placedOrder.shipping)}
                </span>
              </div>
              <div className="border-t border-black/10 pt-2 mt-2 flex justify-between">
                <span className="text-[#111111] text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  TOTAL
                </span>
                <span className="text-[#111111] text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: ACCENT_COLOR }}>
                  {formatPhp(placedOrder.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="flex-1">
              <button
                className="w-full py-3 border border-[rgba(0,0,0,0.12)] bg-white hover:bg-[rgba(219,68,68,0.06)] transition-all rounded-md"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#111111' }}
              >
                SHOP MORE
              </button>
            </Link>
            <Link to="/" className="flex-1">
              <button
                className="w-full py-3 cyber-button"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
              >
                BACK TO HOME
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: BG_COLOR }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left (address + products) */}
          <div className="lg:col-span-2 space-y-6">
            {/* SECTION 1 — Delivery Address */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: ACCENT_COLOR }}>
                  Delivery Address
                </h2>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{recipientName}</div>
                    <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{recipientPhone}</div>
                  </div>
                  <div className="mt-2 text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#111111' }}>
                    {addressLine}
                  </div>
                  <div className="mt-3">
                    {defaultAddress && (
                      <span
                        className="inline-flex items-center border border-black/10 px-3 py-1 rounded-sm text-xs font-bold"
                        style={{ fontFamily: 'Inter, sans-serif', color: '#111111' }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // UI only
                    }}
                    className="inline-flex items-center gap-1 text-sm font-bold"
                    style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR }}
                  >
                    <Pencil className="w-4 h-4" />
                    Change
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION 2 — Products Ordered */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: ACCENT_COLOR }}>Products Ordered</h2>
              </div>

              {/* column headers */}
              <div className="hidden md:grid grid-cols-12 gap-2 text-xs text-[#7d8184] mb-3">
                <div className="col-span-6">Product Name</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Item Subtotal</div>
              </div>

              <div className="space-y-5">
                {groupedItems.map((group) => {
                  const preferred = isPreferred(group.seller);
                  return (
                    <div key={group.seller} className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{group.seller}</div>
                          {preferred && (
                            <span className="px-2 py-0.5 text-[11px] rounded-sm border border-[rgba(219,68,68,0.35)] font-bold" style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}>
                              Preferred
                            </span>
                          )}
                        </div>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="inline-flex items-center gap-1 text-sm font-bold"
                          style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          chat now
                        </a>
                      </div>

                      <div className="space-y-3">
                        {group.items.map((item) => (
                          <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                            <div className="md:col-span-6 flex items-start gap-3">
                              <div className="w-14 h-14 border border-black/10 rounded-sm overflow-hidden bg-white shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: '#111111' }}>
                                  {item.name}
                                </div>
                                <div className="text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {Object.keys(item.specs ?? {}).slice(0, 1).map((k) => `${k}: ${item.specs?.[k]}`).join(' • ') || 'Variation: Default'}
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-2 text-center text-sm" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR, fontWeight: 800 }}>
                              {formatPhp(item.price)}
                            </div>

                            <div className="md:col-span-2 text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {item.quantity}
                            </div>

                            <div className="md:col-span-2 text-right text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#111111' }}>
                              <span style={{ fontWeight: 900, color: ACCENT_COLOR }}>{formatPhp(item.price * item.quantity)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* E-Invoice row */}
                      <div className="bg-[#f5f5f5] border border-black/10 rounded-md px-3 py-2 flex items-center justify-between gap-3">
                        <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#111111', fontWeight: 700 }}>E-Invoice</div>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR }}>
                          Request Now
                        </a>
                      </div>

                      {/* Shop Voucher row */}
                      <div className="bg-[#f5f5f5] border border-black/10 rounded-md px-3 py-2 flex items-center justify-between gap-3">
                        <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#111111', fontWeight: 700 }}>Shop Voucher</div>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR }}>
                          Select Voucher
                        </a>
                      </div>

                      {/* Message for Sellers */}
                      <input
                        className="w-full h-11 px-3 bg-white border border-black/10 rounded-sm"
                        placeholder="Please leave a message..."
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />

                      {/* Shipping Option row */}
                      <div className="bg-white border border-black/10 rounded-md px-3 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: '#111111' }}>
                              Estimated delivery
                            </div>
                            <div className="text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                              3-5 days • Express Courier • Late delivery protection available
                            </div>
                            <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR, fontWeight: 900 }}>
                              {shippingSubtotal === 0 ? 'FREE Shipping' : `Shipping: ${formatPhp0(shippingSubtotal)}`}
                            </div>
                          </div>
                          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR }}>
                            Change
                          </a>
                        </div>

                        {/* Shopee Self Pick-up alternate */}
                        <div className="mt-3 flex items-center justify-between bg-[#f5f5f5] border border-black/10 rounded-md px-3 py-2">
                          <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#111111' }}>
                            Shopee Self Pick-up
                          </div>
                          <div className="text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Available at selected locations
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3 — Payment Method tabs */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: ACCENT_COLOR }}>
                Payment Method
              </h2>

              <div className="mt-4 border-b border-black/10 flex flex-wrap gap-2">
                {[
                  { id: 'shopeepay', label: 'ShopeePay Balance', value: '₱0.00' },
                  { id: 'spaylater', label: 'SPayLater', value: '₱0.00' },
                  { id: 'cod', label: 'Cash on Delivery' },
                  { id: 'payment_center', label: 'Payment Center / E-Wallet' },
                  { id: 'bank', label: 'Linked Bank Accounts' },
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'onlinebank', label: 'Online Banking' },
                  { id: 'gpay', label: 'Google Pay' },
                ].map((t) => {
                  const active = paymentTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setPaymentTab(t.id)}
                      className="px-3 py-2 text-sm font-bold"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: active ? ACCENT_COLOR : '#111111',
                        borderBottom: active ? `2px solid ${ACCENT_COLOR}` : '2px solid transparent',
                      }}
                    >
                      <span className="block">{t.label}</span>
                      {'value' in t && t.value ? (
                        <span className="block text-xs font-extrabold" style={{ color: active ? ACCENT_COLOR : '#7d8184' }}>
                          {t.value}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Under Payment Center tab: radio list */}
              {paymentTab === 'payment_center' && (
                <div className="mt-4 space-y-3">
                  {/* 7-Eleven */}
                  <label className="flex items-start gap-3 p-3 border border-black/10 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="pc"
                      checked={paymentOption === '7eleven'}
                      onChange={() => setPaymentOption('7eleven')}
                      className="mt-1"
                      style={{ accentColor: ACCENT_COLOR }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md border border-black/10 flex items-center justify-center text-sm font-extrabold" style={{ color: '#111111' }}>
                          7
                        </div>
                        <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          7-Eleven
                        </div>
                      </div>
                      <div className="text-sm text-[#7d8184] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Open 24/7. Amount will reflect within 24 hrs after payment. Partner may charge fee.
                        <span className="block">Min. cash in is <span style={{ color: ACCENT_COLOR, fontWeight: 900 }}>₱50</span>.</span>
                      </div>
                    </div>
                  </label>

                  {/* GCash */}
                  <label className="flex items-start gap-3 p-3 border border-black/10 rounded-md cursor-pointer" style={{ borderColor: paymentOption === 'gcash' ? `rgba(219,68,68,0.35)` : undefined }}>
                    <input
                      type="radio"
                      name="pc"
                      checked={paymentOption === 'gcash'}
                      onChange={() => setPaymentOption('gcash')}
                      className="mt-1"
                      style={{ accentColor: ACCENT_COLOR }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'rgba(219,68,68,0.12)' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: ACCENT_COLOR }}>G</span>
                        </div>
                        <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          GCash
                        </div>
                      </div>
                      <div className="text-sm text-[#7d8184] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Payment (min. <span style={{ color: ACCENT_COLOR, fontWeight: 900 }}>₱50</span>) should be completed within 30 mins.
                        Accessible 24/7 and may entail additional <span style={{ color: ACCENT_COLOR, fontWeight: 900 }}>2%</span> fee.
                      </div>
                    </div>
                  </label>

                  {/* Maya */}
                  <label className="flex items-start gap-3 p-3 border border-black/10 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="pc"
                      checked={paymentOption === 'maya'}
                      onChange={() => setPaymentOption('maya')}
                      className="mt-1"
                      style={{ accentColor: ACCENT_COLOR }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md border border-black/10 flex items-center justify-center text-sm font-extrabold" style={{ color: ACCENT_COLOR }}>
                          M
                        </div>
                        <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Maya
                        </div>
                      </div>
                      <div className="text-sm text-[#7d8184] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Payment (min. <span style={{ color: ACCENT_COLOR, fontWeight: 900 }}>₱50</span>) should be completed within 30 mins. Accessible 24/7.
                      </div>
                    </div>
                  </label>
                </div>
              )}

              {paymentTab !== 'payment_center' && (
                <div className="mt-4 text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  UI preview only. Switch to <span style={{ color: ACCENT_COLOR, fontWeight: 900 }}>Payment Center / E-Wallet</span> to choose 7-Eleven / GCash / Maya.
                </div>
              )}
            </div>
          </div>

          {/* Right — Order Summary bottom right */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-black/10 rounded-md p-5 sticky top-20">
              <h3 className="text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: '#111111' }}>
                Order Summary
              </h3>

              <div className="mt-4 space-y-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex justify-between">
                  <span className="text-[#7d8184]">Merchandise Subtotal</span>
                  <span style={{ fontWeight: 900 }}>{formatPhp(merchandiseSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7d8184]">Shipping Subtotal</span>
                  <span style={{ fontWeight: 900 }}>{shippingSubtotal === 0 ? 'FREE' : formatPhp(shippingSubtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[#7d8184]">Admin fee</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-black/10 text-xs" title="Mock fee for UI">
                      ?
                    </span>
                  </div>
                  <span style={{ fontWeight: 900 }}>{formatPhp0(adminFee)}</span>
                </div>

                <div className="border-t border-black/10 pt-3 flex justify-between">
                  <span className="text-[#7d8184]">Total Payment</span>
                  <span style={{ color: ACCENT_COLOR, fontWeight: 1000, fontSize: '20px' }}>
                    {formatPhp(totalPayment)}
                  </span>
                </div>
              </div>

              <button
                onClick={onPlaceOrder}
                disabled={!canPlace}
                className="mt-5 w-full py-4 text-white font-bold rounded-md transition-all"
                style={{ fontFamily: 'Inter, sans-serif', background: ACCENT_COLOR, opacity: canPlace ? 1 : 0.6 }}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>

              <div className="mt-3 text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                By placing your order, you agree to the checkout terms. (UI mock)
              </div>
            </div>
          </div>
        </div>

        {/* Loading overlay when placing */}
        {placing && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-black/10 border-t-[rgba(219,68,68,0.7)] animate-spin rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}

