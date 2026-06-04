import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  CreditCard,
  Package,
  MapPin,
  MessageSquare,
  Pencil,
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
  const { createOrder, products } = useStore();
  const { user } = useAuth();

  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<StoreOrder | null>(null);
  const [placeError, setPlaceError] = useState<string | null>(null);

  // Restore selected items from Cart selection
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

  // UI state
  const [paymentTab, setPaymentTab] = useState<string>('payment_center');
  const [paymentOption, setPaymentOption] = useState<'7eleven' | 'gcash' | 'maya' | 'cod' | 'card'>('gcash');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [recipientName] = useState(user?.displayName || 'Juan Dela Cruz');
  const [recipientPhone] = useState('09XXXXXXXXX');
  const [addressLine] = useState('Brgy. Example, City, Country');

  const merchandiseSubtotal = useMemo(
    () => effectiveCart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [effectiveCart]
  );
  const shippingSubtotal = useMemo(
    () => (merchandiseSubtotal >= 999 || merchandiseSubtotal === 0 ? 0 : 50),
    [merchandiseSubtotal]
  );
  const adminFee = 10;
  const totalPayment = useMemo(
    () => merchandiseSubtotal + shippingSubtotal + adminFee,
    [merchandiseSubtotal, shippingSubtotal]
  );

  const paymentMethodLabel = useMemo(() => {
    if (paymentOption === '7eleven') return 'payment_center_7eleven';
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
        customerName: recipientName,
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

  return (
    <div className="min-h-screen" style={{ background: BG_COLOR }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Address */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: ACCENT_COLOR }}>
                  Delivery Address
                </h2>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{recipientName}</div>
                    <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{recipientPhone}</div>
                  </div>
                  <div className="mt-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{addressLine}</div>
                  <span className="inline-flex items-center border border-black/10 px-3 py-1 text-xs font-bold mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Default
                  </span>
                </div>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-sm font-bold shrink-0" style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}>
                  <Pencil className="w-4 h-4" /> Change
                </a>
              </div>
            </div>

            {/* Products Ordered */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <h2 className="text-lg mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: ACCENT_COLOR }}>
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
                      <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}>
                        <MessageSquare className="w-4 h-4" /> chat now
                      </a>
                    </div>

                    {group.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                        <div className="md:col-span-6 flex items-start gap-3">
                          <div className="w-14 h-14 border border-black/10 rounded-sm overflow-hidden bg-white shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</div>
                            <div className="text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {Object.keys(item.specs ?? {}).slice(0, 1).map((k) => `${k}: ${item.specs?.[k]}`).join(' • ') || 'Variation: Default'}
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2 text-center text-sm font-bold" style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}>
                          {formatPhp(item.price)}
                        </div>
                        <div className="md:col-span-2 text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.quantity}
                        </div>
                        <div className="md:col-span-2 text-right text-sm font-bold" style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}>
                          {formatPhp(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}

                    <input className="w-full h-11 px-3 bg-white border border-black/10 rounded-sm" placeholder="Please leave a message..." style={{ fontFamily: 'Inter, sans-serif' }} />

                    <div className="bg-white border border-black/10 rounded-md px-3 py-3">
                      <div className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Estimated delivery: 3-5 days
                      </div>
                      <div className="text-sm font-bold mt-1" style={{ color: ACCENT_COLOR, fontFamily: 'Inter, sans-serif' }}>
                        {shippingSubtotal === 0 ? 'FREE Shipping' : `Shipping: ${formatPhp0(shippingSubtotal)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-black/10 rounded-md p-5">
              <h2 className="text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, color: ACCENT_COLOR }}>
                Payment Method
              </h2>

              <div className="mt-4 border-b border-black/10 flex flex-wrap gap-2">
                {[
                  { id: 'payment_center', label: 'E-Wallet (GCash / Maya)' },
                  { id: 'card', label: 'Card' },
                  { id: 'cod', label: 'Cash on Delivery' },
                ].map((t) => {
                  const active = paymentTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setPaymentTab(t.id);
                        if (t.id === 'cod') setPaymentOption('cod');
                        else if (t.id === 'card') setPaymentOption('card');
                        else setPaymentOption('gcash');
                      }}
                      className="px-3 py-2 text-sm font-bold"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: active ? ACCENT_COLOR : '#111111',
                        borderBottom: active ? `2px solid ${ACCENT_COLOR}` : '2px solid transparent',
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {paymentTab === 'payment_center' && (
                <div className="mt-4 space-y-3">
                  <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer" style={{ borderColor: paymentOption === 'gcash' ? 'rgba(219,68,68,0.35)' : 'rgba(0,0,0,0.1)' }}>
                    <input type="radio" name="pc" checked={paymentOption === 'gcash'} onChange={() => setPaymentOption('gcash')} className="mt-1" style={{ accentColor: ACCENT_COLOR }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'rgba(219,68,68,0.12)' }}>
                          <span style={{ fontWeight: 900, color: ACCENT_COLOR }}>G</span>
                        </div>
                        <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>GCash</div>
                      </div>
                      <div className="text-sm text-[#7d8184] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Payment should be completed within 30 mins. Accessible 24/7.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer" style={{ borderColor: paymentOption === 'maya' ? 'rgba(219,68,68,0.35)' : 'rgba(0,0,0,0.1)' }}>
                    <input type="radio" name="pc" checked={paymentOption === 'maya'} onChange={() => setPaymentOption('maya')} className="mt-1" style={{ accentColor: ACCENT_COLOR }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md border border-black/10 flex items-center justify-center font-bold" style={{ color: ACCENT_COLOR }}>M</div>
                        <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Maya</div>
                      </div>
                      <div className="text-sm text-[#7d8184] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Payment should be completed within 30 mins. Accessible 24/7.
                      </div>
                    </div>
                  </label>
                </div>
              )}

              {paymentTab === 'card' && (
                <div className="mt-4 rounded-md border border-black/10 bg-[#f5f5f5] p-4">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>Card Number</span>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={cardDetails.number}
                      onChange={(event) => setCardDetails({ ...cardDetails, number: event.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="h-11 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none focus:border-[var(--accent)]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </label>
                  <label className="mt-3 block">
                    <span className="mb-1 block text-xs font-bold uppercase text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>Name on Card</span>
                    <input
                      autoComplete="cc-name"
                      value={cardDetails.name}
                      onChange={(event) => setCardDetails({ ...cardDetails, name: event.target.value })}
                      placeholder="Juan Dela Cruz"
                      className="h-11 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none focus:border-[var(--accent)]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1 block text-xs font-bold uppercase text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>Expiry</span>
                      <input
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={cardDetails.expiry}
                        onChange={(event) => setCardDetails({ ...cardDetails, expiry: event.target.value })}
                        placeholder="MM/YY"
                        className="h-11 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none focus:border-[var(--accent)]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-bold uppercase text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>CVC</span>
                      <input
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={cardDetails.cvc}
                        onChange={(event) => setCardDetails({ ...cardDetails, cvc: event.target.value })}
                        placeholder="123"
                        className="h-11 w-full rounded-sm border border-black/10 bg-white px-3 text-sm outline-none focus:border-[var(--accent)]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </label>
                  </div>
                  {!cardReady && (
                    <p className="mt-3 text-xs font-semibold text-[#dc2626]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Complete the card details before placing the order.
                    </p>
                  )}
                </div>
              )}

              {paymentTab === 'cod' && (
                <div className="mt-4 p-4 border border-black/10 rounded-md bg-[#f5f5f5]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <div className="font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Cash on Delivery</div>
                      <div className="text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>Pay when you receive your order.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-black/10 rounded-md p-5 sticky top-20">
              <h3 className="text-base font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Order Summary</h3>
              <div className="mt-4 space-y-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex justify-between">
                  <span className="text-[#7d8184]">Merchandise Subtotal</span>
                  <span className="font-bold">{formatPhp(merchandiseSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7d8184]">Shipping</span>
                  <span className="font-bold">{shippingSubtotal === 0 ? <span className="text-[#10b981]">FREE</span> : formatPhp(shippingSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7d8184]">Admin fee</span>
                  <span className="font-bold">{formatPhp0(adminFee)}</span>
                </div>
                <div className="border-t border-black/10 pt-3 flex justify-between">
                  <span className="text-[#7d8184]">Total Payment</span>
                  <span className="font-bold text-xl" style={{ color: ACCENT_COLOR }}>{formatPhp(totalPayment)}</span>
                </div>
              </div>

              <button
                onClick={onPlaceOrder}
                disabled={!canPlace}
                className="mt-5 w-full py-4 text-white font-bold transition-all"
                style={{ fontFamily: 'Inter, sans-serif', background: ACCENT_COLOR, opacity: canPlace ? 1 : 0.6, cursor: canPlace ? 'pointer' : 'not-allowed' }}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>

              {stockIssues.length > 0 && (
                <div className="mt-3 text-xs font-semibold text-[#dc2626]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Some selected items are out of stock or exceed available inventory. Please update your cart.
                </div>
              )}

              {placeError && (
                <div className="mt-3 text-xs font-semibold text-[#dc2626]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {placeError}
                </div>
              )}

              <div className="mt-3 text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                By placing your order, you agree to the checkout terms.
              </div>
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
