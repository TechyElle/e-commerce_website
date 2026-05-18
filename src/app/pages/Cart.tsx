import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');

if (cart.length === 0) {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">

        {/* Animated cart icon */}
        <div className="relative inline-block mb-8">
          <div
            className="w-32 h-32 rounded-none flex items-center justify-center mx-auto"
            style={{
              background: 'rgba(0,191,223,0.08)',
              border: '2px solid rgba(0,191,223,0.3)',
              boxShadow: '0 0 40px rgba(0,191,223,0.15)',
            }}
          >
            <ShoppingBag className="w-16 h-16 text-[#00BFDF]" />
          </div>
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-none"
            style={{
              border: '1px solid rgba(0,191,223,0.15)',
              transform: 'scale(1.15)',
            }}
          />
        </div>

        {/* Text */}
        <h2
          className="text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
        >
          CART IS EMPTY
        </h2>
        <p
          className="text-[#aaaaaa] mb-8 text-lg"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          Wala pang laman ang cart mo. 😢{'\n'}
          Mag-browse ng mga products at mag-dagdag!
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {['Arduino', 'ESP32', 'Sensors'].map((item) => (
            <Link
              key={item}
              to="/products"
              className="p-3 border border-[rgba(255,255,255,0.08)] hover:border-[#00BFDF] text-[#aaaaaa] hover:text-[#00BFDF] transition-all text-sm"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Button */}
        <Link to="/products">
          <button
            className="cyber-button px-10 py-3"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            START SHOPPING
            <ArrowRight className="ml-2 w-4 h-4 inline" />
          </button>
        </Link>

      </div>
    </div>
  );
}

  const shipping = cartTotal >= 999 ? 0 : 50;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
            SHOPPING CART
          </h1>
          <button
            onClick={clearCart}
            className="px-6 py-2 text-sm bg-transparent text-[#dc2626] border border-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-all"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-[#1e1e1e] border border-[rgba(255,255,255,0.1)]">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.id}`}
                      className="flex-shrink-0"
                    >
                      <div className="w-24 h-24 bg-[#111111] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.id}`}
                        className="hover:text-[#00BFDF]"
                      >
                        <h3 className="text-lg mb-1 line-clamp-1 text-white" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-[#aaaaaa] mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {item.category}
                      </p>
                      <p className="text-xl text-[#ff6b35]" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                        ₱{item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#dc2626] hover:text-[#dc2626] hover:bg-[rgba(220,38,38,0.1)]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-[#111111] border border-[rgba(255,255,255,0.1)] hover:border-[#00BFDF] text-white flex items-center justify-center transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-white" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={typeof item.stock === 'number' && item.quantity >= item.stock}
                          className="w-8 h-8 bg-[#111111] border border-[rgba(255,255,255,0.1)] hover:border-[#00BFDF] text-white flex items-center justify-center transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 bg-[#1e1e1e] border border-[rgba(255,255,255,0.1)]">
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6 text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                  ORDER SUMMARY
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Subtotal</span>
                    <span className="text-white" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                      ₱{cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Shipping</span>
                    <span className="text-white" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                      {shipping === 0 ? (
                        <span className="text-[#10b981]">FREE</span>
                      ) : (
                        `₱${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <Separator className="my-4 bg-[rgba(255,255,255,0.1)]" />

                <div className="flex justify-between mb-6">
                  <span className="text-xl text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>Total</span>
                  <span className="text-2xl text-[#ff6b35]" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                    ₱{total.toFixed(2)}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="mb-4 p-3 bg-[rgba(0,191,223,0.1)] border border-[rgba(0,191,223,0.3)] text-sm text-[#00BFDF]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    Add ₱{(999 - cartTotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                {/* Payment Method */}
                <div className="mb-4">
                  <p className="text-sm text-[#aaaaaa] mb-3"
                    style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
                    PAYMENT METHOD
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'gcash', label: 'GCash', emoji: '📱' },
                      { id: 'maya', label: 'Maya', emoji: '💳' },
                      { id: 'cod', label: 'Cash on Delivery', emoji: '💵' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                          paymentMethod === method.id
                          ? 'border-[#00BFDF] bg-[rgba(0,191,223,0.08)] text-white'
                          : 'border-[rgba(255,255,255,0.1)] text-[#aaaaaa] hover:border-[#00BFDF]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="accent-[#00BFDF]"
                        />
                        <span>{method.emoji}</span>
                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                          {method.label}
                        </span>
                      </label>
                  ))}
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full"
                onClick={() => window.localStorage.setItem('xontrix-payment-method', paymentMethod)}
              >
                <button className="w-full cyber-button mb-3 py-3">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-4 h-4 inline" />
                </button>
              </Link>

                <Link to="/products">
                  <button className="w-full py-3 text-sm bg-transparent text-[#00BFDF] border border-[#00BFDF] hover:bg-[#00BFDF] hover:text-black transition-all" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                    Continue Shopping
                  </button>
                </Link>

                <div className="mt-6 space-y-3 text-sm text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[#10b981]">✓</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#10b981]">✓</span>
                    <span>Cash on Delivery available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#10b981]">✓</span>
                    <span>7-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
