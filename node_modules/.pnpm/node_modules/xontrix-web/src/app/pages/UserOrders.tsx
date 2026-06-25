// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Package, ChevronRight, ArrowLeft, Search, Filter, Eye, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function UserOrders() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statuses = ['All', 'Delivered', 'In Transit', 'Cancelled', 'pending', 'shipped'];

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiUrl = process.env.VITE_API_URL || 'http://localhost/xontrix-backend/api';
        const response = await fetch(`${apiUrl}/orders?email=${encodeURIComponent(user.email)}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load orders');
        }

        const data = await response.json();
        
        // Map backend data to match UI format
        const mappedOrders = data.map(order => ({
          id: order.id,
          date: new Date(order.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1), // capitalize status
          statusColor: getStatusColor(order.status),
          items: order.items || [],
          total: `₱${parseFloat(order.total).toFixed(2)}`,
          address: order.shipping_address || '123 Mabini St, Quezon City',
          subtotal: order.subtotal,
          shipping: order.shipping,
        }));

        setOrders(mappedOrders);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const getStatusColor = (status) => {
    const statusMap = {
      delivered: '#22c55e',
      shipped: '#f59e0b',
      pending: '#3b82f6',
      cancelled: '#ef4444',
    };
    return statusMap[status.toLowerCase()] || '#7d8184';
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || o.status === filter;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#f1b2b2] border-t-[#db4444] animate-spin mx-auto mb-4" />
          <p className="text-[#7d8184] text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/profile" className="text-[#7d8184] hover:text-[#db4444] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#111111]">My Orders</h1>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-1">Make sure your backend is running and XAMPP is on.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-[#7d8184] hover:text-[#db4444] mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </button>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#f5f5f5]">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-[#111111]">{selected.id}</p>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ color: selected.statusColor, background: selected.statusColor + '18' }}>{selected.status}</span>
              </div>
              <p className="text-xs text-[#7d8184]">{selected.date}</p>
            </div>
            <div className="p-5 border-b border-[#f5f5f5]">
              <p className="text-xs font-semibold text-[#7d8184] uppercase mb-3">Items Ordered</p>
              {selected.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#f5f5f5] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-[#7d8184]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#111111] truncate">{item.name}</p>
                      <p className="text-xs text-[#7d8184]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#db4444]">₱{parseFloat(item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="p-5 border-b border-[#f5f5f5]">
              <p className="text-xs font-semibold text-[#7d8184] uppercase mb-2">Delivery Address</p>
              <p className="text-sm text-[#111111]">{selected.address}</p>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="text-[#7d8184]">Subtotal</p>
                <p className="text-[#111111]">₱{parseFloat(selected.subtotal).toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-[#7d8184]">Shipping</p>
                <p className="text-[#111111]">₱{parseFloat(selected.shipping).toFixed(2)}</p>
              </div>
              <div className="border-t border-[#f5f5f5] pt-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#7d8184]">Total Amount</p>
                <p className="text-lg font-bold text-[#db4444]">{selected.total}</p>
              </div>
            </div>
          </div>
          {selected.status === 'Delivered' && (
            <button className="mt-4 w-full py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #db4444, #c73939)' }}>
              Buy Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/profile" className="text-[#7d8184] hover:text-[#db4444] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#111111]">My Orders</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d8184]" />
          <input
            type="text"
            placeholder="Search orders or products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-9 pr-4 bg-white border border-black/10 rounded-xl text-sm text-[#111111] placeholder:text-[#7d8184] focus:border-[#db4444] focus:outline-none"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0"
              style={{ background: filter === s ? '#db4444' : 'white', color: filter === s ? 'white' : '#7d8184', border: '1px solid', borderColor: filter === s ? '#db4444' : '#e5e5e5' }}>
              {s}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <Package className="w-10 h-10 text-[#ccc] mx-auto mb-3" />
              <p className="text-sm text-[#7d8184]">No orders found</p>
            </div>
          ) : filtered.map(order => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-sm font-bold text-[#111111]">{order.id}</p>
                  <p className="text-xs text-[#7d8184]">{order.date}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0" style={{ color: order.statusColor, background: order.statusColor + '18' }}>{order.status}</span>
              </div>
              <p className="text-xs text-[#4f4f4f] mb-3">{order.items.map(i => i.name).join(', ')}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#db4444]">{order.total}</p>
                <button onClick={() => setSelected(order)} className="flex items-center gap-1 text-xs text-[#7d8184] hover:text-[#db4444] transition-colors font-medium">
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}