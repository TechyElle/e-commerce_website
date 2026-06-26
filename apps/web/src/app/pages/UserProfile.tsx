// @ts-nocheck
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  User,
  Mail,
  ShoppingBag,
  Heart,
  MapPin,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Package,
  Clock,
  Star,
  Edit3,
  Camera,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';


/* ────────────────────────────────────────────────
   MOCK ORDER HISTORY (displayed as sample data)
──────────────────────────────────────────────── */
const MOCK_ORDERS = [
  {
    id: 'XON-2026-0041',
    date: 'June 18, 2026',
    status: 'Delivered',
    statusColor: '#22c55e',
    items: 'Arduino Uno R3, DHT22 Sensor',
    total: '₱615.00',
  },
  {
    id: 'XON-2026-0038',
    date: 'June 10, 2026',
    status: 'In Transit',
    statusColor: '#f59e0b',
    items: 'ESP32 Dev Board × 2',
    total: '₱570.00',
  },
  {
    id: 'XON-2026-0031',
    date: 'May 29, 2026',
    status: 'Delivered',
    statusColor: '#22c55e',
    items: 'OLED Display 0.96", Resistor Pack',
    total: '₱248.00',
  },
];


const STATS = [
  { label: 'Total Orders', value: '12', icon: <ShoppingBag className="w-5 h-5" /> },
  { label: 'Items Purchased', value: '38', icon: <Package className="w-5 h-5" /> },
  { label: 'Wishlist', value: '5', icon: <Heart className="w-5 h-5" /> },
  { label: 'Reviews Given', value: '7', icon: <Star className="w-5 h-5" /> },
];


const MENU_ITEMS = [
  { icon: <ShoppingBag className="w-5 h-5" />, label: 'My Orders', desc: 'Track and view past orders', path: '/orders' },
  { icon: <Heart className="w-5 h-5" />, label: 'Wishlist', desc: 'Saved items for later', path: '/wishlist' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Addresses', desc: 'Manage delivery addresses', path: '/addresses' },
  { icon: <Bell className="w-5 h-5" />, label: 'Notifications', desc: 'Email & SMS preferences', path: '/notifications' },
  { icon: <Shield className="w-5 h-5" />, label: 'Security', desc: 'Password & account safety', path: '/security' },
];


export function UserProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);


  const displayName = user?.displayName || 'Xontrix User';
  const email = user?.email || '';


  // Generate initials for avatar
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);


  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate('/login');
  };


  const joinDate = user?.uid?.startsWith('user-')
    ? new Date(Number(user.uid.replace('user-', ''))).toLocaleDateString('en-PH', {
        month: 'long',
        year: 'numeric',
      })
    : 'June 2026';


  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* ── HERO BANNER ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          minHeight: 200,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: '#db4444' }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10"
          style={{ background: '#db4444' }}
        />


        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #db4444, #c73939)',
                  border: '3px solid rgba(255,255,255,0.2)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {initials}
              </div>
              <button
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                style={{ background: '#db4444' }}
                title="Change photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>


            {/* Name & email */}
            <div className="text-center sm:text-left flex-1 pb-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-white text-2xl font-bold">{displayName}</h1>
                <button
                  className="text-white/50 hover:text-white transition-colors"
                  title="Edit profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/60 text-sm flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {email}
              </p>
              <p className="text-white/40 text-xs mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Clock className="w-3 h-3" />
                Member since {joinDate}
              </p>
            </div>


            {/* Verified badge */}
            <div
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shrink-0"
              style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Verified Customer
            </div>
          </div>
        </div>
      </div>


      {/* ── STATS ROW ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-[#db4444] mb-1">{s.icon}</div>
              <p className="text-2xl font-bold text-[#111111]">{s.value}</p>
              <p className="text-xs text-[#7d8184] text-center mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>


      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column — Menu */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[#f5f5f5]">
              <p className="text-xs font-semibold text-[#7d8184] uppercase tracking-wide">
                Account Settings
              </p>
            </div>
            {MENU_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#fff5f5] transition-colors group ${
                  i < MENU_ITEMS.length - 1 ? 'border-b border-[#f5f5f5]' : ''
                }`}
              >
                <div className="text-[#7d8184] group-hover:text-[#db4444] transition-colors shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111111] group-hover:text-[#db4444] transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#7d8184] truncate">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#ccc] group-hover:text-[#db4444] transition-colors shrink-0" />
              </Link>
            ))}
          </div>


          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all hover:bg-red-50 disabled:opacity-60"
            style={{
              borderColor: '#db4444',
              color: '#db4444',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <LogOut className="w-4 h-4" />
            {signingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>


        {/* Right column — Orders */}
        <div className="lg:col-span-2 space-y-3">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[#f5f5f5] flex items-center justify-between">
              <p className="text-xs font-semibold text-[#7d8184] uppercase tracking-wide">
                Recent Orders
              </p>
              <Link
                to="#"
                className="text-xs font-semibold text-[#db4444] hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-[#f5f5f5]">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="px-4 py-4 hover:bg-[#fafafa] transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <p className="text-sm font-bold text-[#111111]">{order.id}</p>
                      <p className="text-xs text-[#7d8184]">{order.date}</p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0"
                      style={{
                        color: order.statusColor,
                        background: order.statusColor + '18',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#4f4f4f] mb-2">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#db4444]">{order.total}</p>
                    <button className="text-xs text-[#7d8184] hover:text-[#db4444] transition-colors font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Account Info Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[#f5f5f5]">
              <p className="text-xs font-semibold text-[#7d8184] uppercase tracking-wide">
                Account Info
              </p>
            </div>
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#7d8184]" />
                </div>
                <div>
                  <p className="text-xs text-[#7d8184]">Full Name</p>
                  <p className="text-sm font-semibold text-[#111111]">{displayName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#7d8184]" />
                </div>
                <div>
                  <p className="text-xs text-[#7d8184]">Email Address</p>
                  <p className="text-sm font-semibold text-[#111111]">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#7d8184]" />
                </div>
                <div>
                  <p className="text-xs text-[#7d8184]">Account Type</p>
                  <p className="text-sm font-semibold text-[#111111]">Customer</p>
                </div>
              </div>
            </div>
          </div>


          {/* Shop CTA */}
          <div
            className="rounded-xl p-5 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #db4444, #c73939)' }}
          >
            <div>
              <p className="text-white font-bold text-sm">Continue Shopping</p>
              <p className="text-white/70 text-xs mt-0.5">
                Explore microcontrollers, sensors &amp; more
              </p>
            </div>
            <Link
              to="/products"
              className="px-4 py-2 rounded-lg text-[#db4444] text-sm font-bold bg-white hover:bg-[#f5f5f5] transition-colors shrink-0"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

