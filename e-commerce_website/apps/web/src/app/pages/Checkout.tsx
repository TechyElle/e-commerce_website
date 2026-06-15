import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  CreditCard,
  Package,
  MapPin,
  MessageSquare,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore, type StoreOrder } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { resolveProductImage } from '../lib/productImages';

const BRAND_RED = '#db4444';

function formatPhp(n: number) {
  return `₱${n.toFixed(2)}`;
}

function formatPhp0(n: number) {
  return `₱${Math.round(n).toFixed(0)}`;
}

export function Checkout() {
  const { cart, clearCart } = useCart();
  const { createOrder, products } = useStore();
  const { user } = useAuth();

  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<StoreOrder | null>(null);
  const [placeError, setPlaceError] = useState<string | null>(null);

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

  const [paymentOption, setPaymentOption] = useState<'gcash' | 'maya' | 'cod' | 'card'>('gcash');

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState({
    name: user?.displayName || 'Juan Dela Cruz',
    phone: '09XXXXXXXXX',
    street: 'Brgy. Example',
    city: 'City',
    province: 'Province',
    zip: '0000',
  });
  const [draftAddress, setDraftAddress] = useState({ ...savedAddress });

  const handleSaveAddress = () => {
    setSavedAddress({ ...draftAddress });
    setIsEditingAddress(false);
  };

  const handleCancelAddress = () => {
    setDraftAddress({ ...savedAddress });
    setIsEditingAddress(false);
  };

  const addressDisplay = `${savedAddress.street}, ${savedAddress.city}, ${savedAddress.province} ${savedAddress.zip}`;

  const merchandiseSubtotal = useMemo(
    () => effectiveCart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [effectiveCart]
  );
  const shippingSubtotal = useMemo(
    () => (merchandiseSubtotal >= 1000 || merchandiseSubtotal === 0 ? 0 : 80),
    [merchandiseSubtotal]
  );
  const totalPayment = useMemo(
    () => merchandiseSubtotal + shippingSubtotal,
    [merchandiseSubtotal, shippingSubtotal]
  );

  const paymentMethodLabel = useMemo(() => {
    if (paymentOption === 'maya') return 'maya';
    if (paymentOption === 'cod') return 'cod';
    if (paymentOption === 'card') return 'card';
    return 'gcash';
  }, [paymentOption]);

  const cardReady = useMemo(() => {
    if (paymentOption !== 'card') return true;
    const digits = cardDetails.number.replace(/\D/g, '');
    const cvcDigits = cardDetails.cvc.replace(/\D/g, '');
    return (
      digits.length >= 13 &&
      digits.length <= 19 &&
      cardDetails.name.trim().length >= 2 &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry.trim()) &&
      cvcDigits.length >= 3 &&
      cvcDigits.length <= 4
    );
  }, [cardDetails, paymentOption]);

  const groupedItems = useMemo(() => {
    const map = new Map<string, typeof cart>();
    for (const item of effectiveCart) {
      const key = item.category || 'Xontrix Shop';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries()).map(([seller, items]) => ({ seller, items }));
  }, [effectiveCart]);

  const stockIssues = useMemo(() => {
    return effectiveCart.filter((item) => {
      const liveProduct = products.find((product) => product.id === item.id);
      const stock = liveProduct?.stock ?? item.stock;
      const inStock = liveProduct?.inStock ?? item.inStock;
      return !inStock || (typeof stock === 'number' && stock < item.quantity);
    });
  }, [effectiveCart, products]);

  const canPlace = effectiveCart.length > 0 && stockIssues.length === 0 && cardReady && !placing && !placedOrder;

  const onPlaceOrder = async () => {
    if (!canPlace) return;
    setPlaceError(null);
    setPlacing(true);
    try {
      const placed = await createOrder({
        items: effectiveCart,
        paymentMethod: paymentMethodLabel,
        customerName: savedAddress.name,
        customerEmail: user?.email || 'guest@xontrix.local',
      });
      setPlacedOrder(placed);
      clearCart();
      window.localStorage.removeItem('xontrix-checkout-items');
    } catch (error) {
      setPlaceError(error instanceof Error ? error.message : 'Unable to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const ACCENT_COLOR = 'var(--accent)';
  const BG_COLOR = 'var(--surface)';

  const inputClass = `h-11 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none transition-colors focus:border-[#db4444]`;
  const labelClass = `mb-1 block text-xs font-bold uppercase text-[#7d8184]`;

  if (effectiveCart.length === 0 && !placedOrder) {
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

          <div className="bg-[#f5f5f5] border border-black/10 rounded-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
              <h2 className="text-lg text-[#111111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                PAYMENT SUMMARY
              </h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7d8184]">Subtotal</span>
                <span className="font-semibold">{formatPhp(placedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d8184]">Shipping</span>
                <span className="font-semibold">
                  {placedOrder.shipping === 0 ? <span className="text-[#10b981]">FREE</span> : formatPhp(placedOrder.shipping)}
                </span>
              </div>
              <div className="border-t border-black/10 pt-2 mt-2 flex justify-between">
                <span className="text-[#111111] text-base font-bold">TOTAL</span>
                <span className="text-xl font-bold" style={{ color: ACCENT_COLOR }}>
                  {formatPhp(placedOrder.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="flex-1">
              <button className="w-full py-3 border border-[rgba(0,0,0,0.12)] bg-white hover:bg-[rgba(219,68,68,0.06)] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                SHOP MORE
              </button>
            </Link>
            <Link to="/" className="flex-1">
              <button className="w-full py-3 cyber-button" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                BACK TO HOME
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const paymentTiles = [
    { key: 'gcash' as const, title: 'GCash', sub: 'Pay instantly', icon: 'G' },
    { key: 'maya' as const, title: 'Maya', sub: 'Pay instantly', icon: 'M' },
    { key: 'cod' as const, title: 'Cash on Delivery', sub: 'Pay when received', icon: '₱' },
    { key: 'card' as const, title: 'Credit / Debit Card', sub: 'Secure checkout', icon: '💳' },
  ];

  return (
    <div className="min-h-screen" style={{ background: BG_COLOR }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Address */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" style={{ color: BRAND_RED }} />
                <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: BRAND_RED }}>
                  Delivery Address
                </h2>
              </div>

              {!isEditingAddress ? (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{savedAddress.name}</span>
                      <span className="text-[#7d8184]">|</span>
                      <span className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{savedAddress.phone}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#444]" style={{ fontFamily: 'Inter, sans-serif' }}>{addressDisplay}</p>
                    <span
                      className="inline-flex items-center border px-3 py-1 text-xs font-bold mt-3"
                      style={{ fontFamily: 'Inter, sans-serif', borderColor: 'rgba(219,68,68,0.4)', color: BRAND_RED }}
                    >
                      Default
                    </span>
                  </div>
                  <button
                    onClick={() => { setDraftAddress({ ...savedAddress }); setIsEditingAddress(true); }}
                    className="inline-flex items-center gap-1 text-sm font-bold shrink-0 hover:underline"
                    style={{ color: BRAND_RED, fontFamily: 'Inter, sans-serif' }}
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Full Name</span>
                      <input className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} value={draftAddress.name} onChange={(e) => setDraftAddress({ ...draftAddress, name: e.target.value })} placeholder="Juan Dela Cruz" />
                    </label>
                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Phone Number</span>
                      <input className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} value={draftAddress.phone} onChange={(e) => setDraftAddress({ ...draftAddress, phone: e.target.value })} placeholder="09XXXXXXXXX" inputMode="tel" />
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Street Address / Barangay</span>
                    <input className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} value={draftAddress.street} onChange={(e) => setDraftAddress({ ...draftAddress, street: e.target.value })} placeholder="123 Rizal St., Brgy. San Antonio" />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>City / Municipality</span>
                      <input className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} value={draftAddress.city} onChange={(e) => setDraftAddress({ ...draftAddress, city: e.target.value })} placeholder="Quezon City" />
                    </label>
                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Province</span>
                      <input className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} value={draftAddress.province} onChange={(e) => setDraftAddress({ ...draftAddress, province: e.target.value })} placeholder="Metro Manila" />
                    </label>
                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>ZIP Code</span>
                      <input className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} value={draftAddress.zip} onChange={(e) => setDraftAddress({ ...draftAddress, zip: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="1100" inputMode="numeric" />
                    </label>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button onClick={handleSaveAddress} className="inline-flex items-center gap-2 px-5 py-2 text-white text-sm font-bold rounded-sm hover:opacity-90" style={{ background: BRAND_RED, fontFamily: 'Inter, sans-serif' }}>
                      <Check className="w-4 h-4" /> Save Address
                    </button>
                    <button onClick={handleCancelAddress} className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-sm border border-black/15 bg-white hover:bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Products Ordered */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <h2 className="text-lg mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: BRAND_RED }}>
                Products Ordered
              </h2>
              <div className="hidden md:grid grid-cols-12 gap-2 text-xs text-[#7d8184] mb-3">
                <div className="col-span-6">Product Name</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Item Subtotal</div>
              </div>

              <div className="space-y-5">
                {groupedItems.map((group) => (
                  <div key={group.seller} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{group.seller}</div>
                      <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: BRAND_RED, fontFamily: 'Inter, sans-serif' }}>
                        <MessageSquare className="w-4 h-4" /> chat now
                      </a>
                    </div>

                    {group.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                        <div className="md:col-span-6 flex items-start gap-3">
                          <div className="w-14 h-14 border border-black/10 rounded-sm overflow-hidden bg-white shrink-0">
                            <img src={resolveProductImage(item)} alt={item.name} className="w-full h-full object-contain p-1" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</div>
                            <div className="text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {Object.keys(item.specs ?? {}).slice(0, 1).map((k) => `${k}: ${item.specs?.[k]}`).join(' • ') || 'Variation: Default'}
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2 text-center text-sm font-bold" style={{ color: BRAND_RED, fontFamily: 'Inter, sans-serif' }}>
                          {formatPhp(item.price)}
                        </div>
                        <div className="md:col-span-2 text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.quantity}
                        </div>
                        <div className="md:col-span-2 text-right text-sm font-bold" style={{ color: BRAND_RED, fontFamily: 'Inter, sans-serif' }}>
                          {formatPhp(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}

                    <input className="w-full h-11 px-3 bg-white border border-black/10 rounded-sm outline-none focus:border-[#db4444] transition-colors" placeholder="Please leave a message..." style={{ fontFamily: 'Inter, sans-serif' }} />

                    <div className="bg-white border border-black/10 rounded-md px-3 py-3">
                      <div className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Estimated delivery: 3-5 days</div>
                      <div className="text-sm font-bold mt-1" style={{ color: BRAND_RED, fontFamily: 'Inter, sans-serif' }}>
                        {shippingSubtotal === 0 ? 'FREE Shipping' : `Shipping: ${formatPhp0(shippingSubtotal)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-black/10 rounded-md p-5 sticky top-20 space-y-5">

              {/* Order Summary */}
              <div>
                <h3 className="text-base font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Order Summary</h3>
                <div className="mt-4 space-y-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="flex justify-between">
                    <span className="text-[#7d8184]">Merchandise Subtotal</span>
                    <span className="font-bold">{formatPhp(merchandiseSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7d8184]">Shipping</span>
                    <span className="font-bold">
                      {shippingSubtotal === 0 ? <span className="text-[#10b981]">FREE</span> : formatPhp(shippingSubtotal)}
                    </span>
                  </div>
                  <div className="border-t border-black/10 pt-3 flex justify-between">
                    <span className="text-[#7d8184]">Total Payment</span>
                    <span className="font-bold text-xl" style={{ color: BRAND_RED }}>{formatPhp(totalPayment)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order button */}
              <button
                onClick={onPlaceOrder}
                disabled={!canPlace}
                className="w-full py-4 text-white font-bold rounded-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: BRAND_RED,
                  opacity: canPlace ? 1 : 0.6,
                  cursor: canPlace ? 'pointer' : 'not-allowed',
                  fontSize: '1rem',
                  letterSpacing: '0.03em',
                }}
              >
                {placing ? 'Placing Order…' : 'Place Order'}
              </button>

              {/* Payment Method */}
              <div>
                <h4 className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif', color: '#111' }}>
                  Payment Method
                </h4>

                <div className="space-y-2">
                  {paymentTiles.map((t) => {
                    const active = paymentOption === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setPaymentOption(t.key)}
                        className="w-full text-left p-3 rounded-md border transition-all"
                        style={{
                          borderColor: active ? BRAND_RED : 'rgba(0,0,0,0.10)',
                          background: active ? 'rgba(219,68,68,0.05)' : '#ffffff',
                          boxShadow: active ? `0 0 0 2px rgba(219,68,68,0.18)` : 'none',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                            style={{ borderColor: active ? BRAND_RED : '#ccc', background: active ? BRAND_RED : 'transparent' }}
                          >
                            {active && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                          </span>
                          <span
                            className="w-8 h-8 rounded-md flex items-center justify-center font-black text-sm shrink-0"
                            style={{ background: active ? 'rgba(219,68,68,0.12)' : 'rgba(0,0,0,0.04)', color: active ? BRAND_RED : '#555' }}
                          >
                            {t.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-sm leading-tight" style={{ fontFamily: 'Inter, sans-serif', color: active ? BRAND_RED : '#111' }}>
                              {t.title}
                            </div>
                            <div className="text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {t.sub}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {(paymentOption === 'gcash' || paymentOption === 'maya') && (
                  <p className="mt-3 text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Payment must be completed within 30 minutes. Available 24/7.
                  </p>
                )}
                {paymentOption === 'cod' && (
                  <p className="mt-3 text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Pay in cash when your order arrives at your door.
                  </p>
                )}

                {/* Card form */}
                {paymentOption === 'card' && (
                  <div className="mt-3 rounded-md border bg-[#fafafa] p-4 space-y-3" style={{ borderColor: 'rgba(219,68,68,0.30)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4" style={{ color: BRAND_RED }} />
                      <span className="font-bold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Card Details</span>
                    </div>

                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Card Number</span>
                      <input
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={cardDetails.number}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 19);
                          const spaced = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
                          setCardDetails({ ...cardDetails, number: spaced });
                        }}
                        placeholder="1234 5678 9012 3456"
                        className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </label>

                    <label className="block">
                      <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Name on Card</span>
                      <input
                        autoComplete="cc-name"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        placeholder="Juan Dela Cruz"
                        className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>Expiry</span>
                        <input
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          value={cardDetails.expiry}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
                            const next = raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
                            setCardDetails({ ...cardDetails, expiry: next });
                          }}
                          placeholder="MM/YY"
                          className={inputClass}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </label>
                      <label className="block">
                        <span className={labelClass} style={{ fontFamily: 'Inter, sans-serif' }}>CVC</span>
                        <input
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          value={cardDetails.cvc}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setCardDetails({ ...cardDetails, cvc: next });
                          }}
                          placeholder="123"
                          className={inputClass}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </label>
                    </div>

                    {!cardReady && (
                      <p className="text-xs font-semibold" style={{ color: BRAND_RED, fontFamily: 'Inter, sans-serif' }}>
                        Please complete all card details before placing your order.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {stockIssues.length > 0 && (
                <p className="text-xs font-semibold text-[#dc2626]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Some selected items are out of stock or exceed available inventory. Please update your cart.
                </p>
              )}
              {placeError && (
                <p className="text-xs font-semibold text-[#dc2626]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {placeError}
                </p>
              )}
              <p className="text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                By placing your order, you agree to the checkout terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {placing && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-black/10 border-t-[rgba(219,68,68,0.7)] animate-spin rounded-full" />
        </div>
      )}
    </div>
  );
}