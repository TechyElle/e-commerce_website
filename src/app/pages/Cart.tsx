import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

type CartItem = ReturnType<typeof useCart>['cart'][number];

function formatPhp(n: number) {
  return `₱${n.toFixed(2)}`;
}

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const ACCENT_COLOR = 'var(--accent)';
  const BG_COLOR = 'var(--surface)';

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [expandTotal, setExpandTotal] = useState(false);

  // UI mock
  const shipping = cartTotal >= 999 ? 0 : 50;

  const getSellerKey = (item: CartItem) => item.category || 'Xontrix Shop';

  const shopGroups = useMemo(() => {
    const map = new Map<string, CartItem[]>();
    for (const item of cart) {
      const key = getSellerKey(item);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries()).map(([shopId, items]) => ({ shopId, items }));
  }, [cart]);

  const preferredShops = useMemo(() => {
    const preferred = new Set<string>();
    for (const g of shopGroups) {
      const s = g.shopId.toLowerCase();
      if (s.includes('micro') || s.includes('sensor') || s.includes('passive') || s.includes('display')) {
        preferred.add(g.shopId);
      }
    }
    return preferred;
  }, [shopGroups]);

  const selectedItems = useMemo(() => cart.filter((i) => selectedIds.has(i.id)), [cart, selectedIds]);

  const selectedCount = useMemo(() => selectedItems.reduce((acc, i) => acc + i.quantity, 0), [selectedItems]);

  const selectedSubtotal = useMemo(
    () => selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [selectedItems]
  );

  const selectedTotal = useMemo(() => {
    if (selectedItems.length === 0) return 0;
    return selectedSubtotal + (selectedSubtotal >= 999 || selectedSubtotal === 0 ? 0 : shipping);
  }, [selectedItems.length, selectedSubtotal, shipping]);

  const canCheckout = selectedCount > 0;

  const saved = useMemo(() => {
    const saleSavings = cart.reduce((sum, i) => {
      const isOnSale = Boolean(i.isSale && i.originalPrice && i.originalPrice > i.price);
      return sum + (isOnSale ? (i.originalPrice! - i.price) * i.quantity : 0);
    }, 0);
    return Math.max(0, Math.round(saleSavings));
  }, [cart]);

  // Initial state is UNCHECKED

  useEffect(() => {
    const cartIds = new Set(cart.map((c) => c.id));
    setSelectedIds((prev) => {
      let changed = false;
      const next = new Set<string>();
      for (const id of prev) {
        if (cartIds.has(id)) next.add(id);
        else changed = true;
      }
      return changed ? next : prev;
    });
  }, [cart]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleShop = (shopId: string, itemsInShop: CartItem[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected = itemsInShop.every((i) => next.has(i.id));
      if (allSelected) itemsInShop.forEach((i) => next.delete(i.id));
      else itemsInShop.forEach((i) => next.add(i.id));
      return next;
    });
  };

  const onCheckout = () => {
    if (!canCheckout) return;

    // Persist selected items so Checkout can render them even if Store/Cart rerenders.
    try {
      window.localStorage.setItem('xontrix-checkout-items', JSON.stringify(selectedItems));
    } catch {
      // ignore
    }

    window.location.href = '/checkout';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div
            className="relative inline-block mb-8"
          >
            <div
              className="w-32 h-32 rounded-none flex items-center justify-center mx-auto"
              style={{
                background: 'rgba(219,68,68,0.08)',
                border: '2px solid rgba(219,68,68,0.3)',
                boxShadow: '0 0 40px rgba(219,68,68,0.15)',
              }}
            >
              <ShoppingBag className="w-16 h-16 text-[#db4444]" />
            </div>
            <div
              className="absolute inset-0 rounded-none"
              style={{
                border: '1px solid rgba(219,68,68,0.15)',
                transform: 'scale(1.15)',
              }}
            />
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#111111] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            CART IS EMPTY
          </h2>
          <p className="text-[#7d8184] mb-8 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Wala pang laman ang cart mo. 😢{'\n'}Mag-browse ng mga products at mag-dagdag!
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {['Arduino', 'ESP32', 'Sensors'].map((item) => (
              <Link
                key={item}
                to="/products"
                className="p-3 border border-[rgba(0,0,0,0.08)] hover:border-[#db4444] text-[#7d8184] hover:text-[#db4444] transition-all text-sm"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {item}
              </Link>
            ))}
          </div>
          <Link to="/products">
            <button className="cyber-button px-10 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              START SHOPPING
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const totalItemCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen" style={{ background: BG_COLOR }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl sm:text-4xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
            SHOPPING CART
          </h1>
          <button
            onClick={clearCart}
            className="px-5 py-2 text-sm bg-transparent text-[#dc2626] border border-[#dc2626] hover:bg-[#dc2626] hover:text-[#111111] transition-all rounded-sm"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            Delete
          </button>
        </div>

        <div className="space-y-4">
          {shopGroups.map(({ shopId, items }) => {
            const preferred = preferredShops.has(shopId);
            const shopAllSelected = items.every((i) => selectedIds.has(i.id));
            const shopSelectedCount = items
              .filter((i) => selectedIds.has(i.id))
              .reduce((acc, i) => acc + i.quantity, 0);

            const bundleDiscountPct = items.length >= 2 ? 2 : 0;
            const nextForDiscount = bundleDiscountPct ? `Add 1 more for ${bundleDiscountPct}% off` : null;

            return (
              <div key={shopId} className="bg-white border border-black/10 rounded-md overflow-hidden">
                {nextForDiscount && (
                  <div className="px-4 py-2 text-sm flex items-center justify-between border-b border-black/10">
                    <span className="text-[var(--accent)] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {nextForDiscount}
                    </span>
                    <span className="text-[#7d8184] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Bundle deal
                    </span>
                  </div>
                )}

                <div className="px-4 py-3 border-b border-black/10 flex items-center gap-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={shopAllSelected}
                      onChange={() => toggleShop(shopId, items)}
                      className="w-5 h-5"
                      style={{ accentColor: ACCENT_COLOR }}
                    />
                    <span className="font-semibold" style={{ fontFamily: 'Inter, sans-serif', color: '#111111' }}>
                      {shopId}
                    </span>
                  </label>

                  {preferred && (
                    <span
                      className="ml-2 px-2 py-0.5 text-xs rounded-sm border"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        borderColor: 'rgba(219,68,68,0.35)',
                        color: ACCENT_COLOR,
                        fontWeight: 800,
                      }}
                    >
                      Preferred
                    </span>
                  )}

                  <span className="ml-auto text-xs text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {shopSelectedCount} selected
                  </span>
                </div>

                <div className="divide-y divide-black/5">
                  {items.map((item) => {
                    const onSale = Boolean(item.isSale && item.originalPrice && item.originalPrice > item.price);
                    const variation =
                      Object.keys(item.specs ?? {})
                        .slice(0, 1)
                        .map((k) => `${k}: ${item.specs?.[k]}`)
                        .join(' • ') || 'Variation: Default';
                    const itemSubtotal = item.price * item.quantity;

                    return (
                      <div key={item.id} className="px-4 py-3 flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="mt-2 w-5 h-5"
                          style={{ accentColor: ACCENT_COLOR }}
                        />

                        <Link to={`/products/${item.id}`} className="flex-shrink-0">
                          <div className="w-16 h-16 bg-white border border-black/10 rounded-sm overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${item.id}`} className="block hover:text-[var(--accent)]">
                            <div className="font-semibold text-[#111111] line-clamp-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                              {item.name}
                            </div>
                          </Link>

                          <div className="text-sm text-[#7d8184] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {variation}
                          </div>

                          <div className="mt-2 flex items-baseline gap-2">
                            {onSale && (
                              <div className="text-sm text-[#7d8184] line-through" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {`₱${(item.originalPrice ?? item.price).toFixed(2)}`}
                              </div>
                            )}
                            <div className="text-base font-bold" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR }}>
                              {formatPhp(item.price)}
                            </div>
                          </div>

                          <div className="mt-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <span className="text-[#7d8184]">Subtotal:</span>{' '}
                            <span className="font-bold" style={{ color: ACCENT_COLOR }}>
                              {formatPhp(itemSubtotal)}
                            </span>
                          </div>
                        </div>

                        <div className="w-44 flex flex-col items-end gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-9 h-9 border border-black/10 rounded-sm bg-white hover:border-[var(--accent)] flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                            </button>

                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value) || 1))}
                              className="w-14 h-9 text-center border border-black/10 rounded-sm bg-white"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            />

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={typeof item.stock === 'number' && item.quantity >= item.stock}
                              className="w-9 h-9 border border-black/10 rounded-sm bg-white hover:border-[var(--accent)] flex items-center justify-center disabled:opacity-50 disabled:hover:border-black/10"
                            >
                              <Plus className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                            </button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[var(--accent)] hover:bg-[rgba(219,68,68,0.08)] hover:text-[var(--accent)] px-2 w-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>Delete</span>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 flex items-center gap-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedCount > 0 && selectedIds.size === cart.length}
                ref={(el) => {
                  if (!el) return;
                  el.indeterminate = selectedCount > 0 && selectedCount < totalItemCount;
                }}
                onChange={() => {
                  if (selectedIds.size === cart.length) setSelectedIds(new Set());
                  else setSelectedIds(new Set(cart.map((c) => c.id)));
                }}
                className="w-5 h-5"
                style={{ accentColor: ACCENT_COLOR }}
              />
              <span className="text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                Select All ({totalItemCount})
              </span>
            </label>

            <div className="flex items-center gap-3 flex-1">
              <button className="text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif', color: ACCENT_COLOR }}>
                Delete
              </button>
              <button className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#7d8184' }}>
                Remove inactive products
              </button>
              <button className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#7d8184' }}>
                Move to My Likes
              </button>
            </div>

            <div className="min-w-[260px] text-right">
              <button
                type="button"
                onClick={() => setExpandTotal((v) => !v)}
                disabled={selectedCount === 0}
                className="flex items-center justify-end gap-2 w-full text-sm"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#111111',
                  opacity: selectedCount === 0 ? 0.6 : 1,
                  cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <span className="font-semibold">Total ({selectedCount} items):</span>
                <span className="font-bold" style={{ color: ACCENT_COLOR }}>
                  {`₱${selectedTotal.toFixed(0)}`}
                </span>
                <span className="text-[#7d8184]">▾</span>
              </button>

              {expandTotal && (
                <div className="text-xs mt-1 text-[#7d8184] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Saved ₱{saved}
                </div>
              )}

              <button
                onClick={canCheckout ? onCheckout : undefined}
                disabled={!canCheckout}
                className="mt-2 w-full rounded-sm transition-all py-3 font-bold"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: ACCENT_COLOR,
                  color: '#ffffff',
                  opacity: canCheckout ? 1 : 0.5,
                  cursor: canCheckout ? 'pointer' : 'not-allowed',
                }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

