import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Package, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { useStore, type StoreOrder } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export function Checkout() {
  const { cart, clearCart } = useCart();
  const { createOrder } = useStore();
  const { user } = useAuth();
  const [order, setOrder] = useState<StoreOrder | null>(null);

  useEffect(() => {
    if (order || cart.length === 0) return;
    const paymentMethod = window.localStorage.getItem('xontrix-payment-method') || 'cod';
    const placedOrder = createOrder({
      items: cart,
      paymentMethod,
      customerName: user?.displayName || 'Walk-in Customer',
      customerEmail: user?.email || 'guest@xontrix.local',
    });
    setOrder(placedOrder);
    clearCart();
  }, [cart, clearCart, createOrder, order, user]);

  if (cart.length === 0 && !order) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-4">
        <div className="text-center">
          <h2
            className="text-3xl text-[#111111] mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            NO ITEMS TO CHECKOUT
          </h2>
          <p
            className="text-[#7d8184] mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
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

  if (!order) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-4">
        <div className="w-12 h-12 border-4 border-[#db4444] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Success Header */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '2px solid #10b981',
              boxShadow: '0 0 30px rgba(16,185,129,0.2)',
            }}
          >
            <CheckCircle className="w-10 h-10 text-[#10b981]" />
          </div>
          <h1
            className="text-3xl sm:text-4xl text-[#111111] mb-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
          >
            ORDER PLACED!
          </h1>
          <p
            className="text-[#7d8184] text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Salamat sa iyong order! 🎉
          </p>
          <div
            className="inline-block mt-3 px-4 py-2 border border-[rgba(219,68,68,0.3)] bg-[rgba(219,68,68,0.08)]"
          >
            <span
              className="text-[#db4444] text-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Order #{order.id}
            </span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] p-6 mb-6">

          {/* Order Items */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-[#db4444]" />
            <h2
              className="text-lg text-[#111111]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              ORDER ITEMS
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b border-[rgba(0,0,0,0.06)] last:border-0"
              >
                <div className="w-12 h-12 bg-[#ffffff] flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[#111111] text-sm line-clamp-1"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-[#7d8184] text-xs"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <span
                  className="text-[#db4444] text-sm flex-shrink-0"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  ₱{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#db4444]" />
            <h2
              className="text-lg text-[#111111]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              PAYMENT SUMMARY
            </h2>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span
                className="text-[#7d8184]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Subtotal
              </span>
              <span
                className="text-[#111111]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                ₱{order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-[#7d8184]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Shipping
              </span>
              <span
                className={order.shipping === 0 ? 'text-[#10b981]' : 'text-[#111111]'}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {order.shipping === 0 ? 'FREE' : `₱${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-[rgba(0,0,0,0.1)] pt-2 mt-2 flex justify-between">
              <span
                className="text-[#111111] text-base"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                TOTAL
              </span>
              <span
                className="text-[#db4444] text-xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                ₱{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1" onClick={clearCart}>
            <button
              className="w-full cyber-button py-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              BACK TO HOME
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </button>
          </Link>
          <Link to="/products" className="flex-1" onClick={clearCart}>
            <button
              className="w-full py-3 border border-[#db4444] text-[#db4444] hover:bg-[#db4444] hover:text-white transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              SHOP MORE
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
