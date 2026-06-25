// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router';
import { Heart, ArrowLeft, ShoppingCart, Trash2, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const INITIAL_WISHLIST = [
  { id: 1, name: 'Arduino Uno R3', price: 320, category: 'Microcontrollers', stock: 15, rating: 4.8, image: null },
  { id: 2, name: 'ESP32 Dev Board', price: 285, category: 'Microcontrollers', stock: 23, rating: 4.9, image: null },
  { id: 3, name: 'OLED Display 0.96"', price: 199, category: 'Displays', stock: 8, rating: 4.7, image: null },
  { id: 4, name: 'DHT22 Sensor', price: 295, category: 'Sensors', stock: 0, rating: 4.6, image: null },
  { id: 5, name: 'Resistor Pack 600pcs', price: 49, category: 'Resistors', stock: 50, rating: 4.9, image: null },
];

export function UserWishlist() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [added, setAdded] = useState({});
  const { addToCart } = useCart();

  const removeItem = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: '', quantity: 1 });
    setAdded(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id]: false })), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/profile" className="text-[#7d8184] hover:text-[#db4444] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#111111]">Wishlist</h1>
          <span className="ml-auto text-xs text-[#7d8184] font-semibold">{wishlist.length} items</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Heart className="w-12 h-12 text-[#ccc] mx-auto mb-4" />
            <p className="text-sm font-semibold text-[#111111] mb-1">Your wishlist is empty</p>
            <p className="text-xs text-[#7d8184] mb-4">Save items you love for later</p>
            <Link to="/products" className="px-6 py-2.5 rounded-xl text-white text-sm font-bold inline-block" style={{ background: '#db4444' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                {/* Image placeholder */}
                <div className="w-16 h-16 bg-[#f5f5f5] rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-7 h-7 text-[#ccc]" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#111111] truncate">{item.name}</p>
                  <p className="text-xs text-[#7d8184] mb-1">{item.category}</p>
                  <p className="text-sm font-bold text-[#db4444]">₱{item.price.toFixed(2)}</p>
                  {item.stock === 0 ? (
                    <p className="text-[10px] text-red-500 font-semibold mt-0.5">Out of Stock</p>
                  ) : (
                    <p className="text-[10px] text-green-500 font-semibold mt-0.5">In Stock ({item.stock} units)</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-40"
                    style={{ background: added[item.id] ? '#22c55e' : '#db4444' }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {added[item.id] ? 'Added!' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7d8184] hover:text-red-500 hover:bg-red-50 transition-all border border-[#e5e5e5]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Shop more */}
            <Link to="/products" className="block w-full py-3 rounded-xl text-center text-sm font-bold text-[#db4444] border-2 border-[#db4444] hover:bg-[#fff5f5] transition-colors mt-2">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}