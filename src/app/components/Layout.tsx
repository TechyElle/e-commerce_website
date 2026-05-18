import { Outlet, Link, useLocation } from 'react-router';
import {
  ShoppingCart, User, Search, Menu, X, Truck,
  Zap, Tag, Home, Package, ChevronUp, Clock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';
import { useState, useEffect, useRef } from 'react';
import logoImg from '../../imports/Logo & QR/LOGO.png';
import logoQrImg from '../../imports/Logo & QR/LOGO QR.png';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';

/* ─────────────────────────────────────────────────
   ANNOUNCEMENT BAR — Marquee ticker
───────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { icon: <Truck className="w-4 h-4 shrink-0" />, text: 'Libre ang shipping sa orders na ₱999 pataas!' },
  { icon: <Zap className="w-4 h-4 shrink-0 text-yellow-400" />, text: 'Flash Sale: Hanggang 50% OFF sa piling items — ngayon lang!' },
  { icon: <Tag className="w-4 h-4 shrink-0 text-green-400" />, text: 'NEW: Raspberry Pi 5 4GB — available na sa stock!' },
  { icon: <Clock className="w-4 h-4 shrink-0 text-orange-400" />, text: 'Sulit Deal magtatapos sa loob ng 24 oras — huwag palampasin!' },
  { icon: <Truck className="w-4 h-4 shrink-0" />, text: 'Same-day dispatch para sa orders bago mag-12nn!' },
  { icon: <Zap className="w-4 h-4 shrink-0 text-yellow-400" />, text: 'Use code XONTRIX20 para sa 20% off sa unang order mo!' },
];

function AnnouncementBar() {
  // Duplicate for seamless loop
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="bg-gradient-to-r from-[#0a2540] via-[#0d3460] to-[#0a2540] text-white py-2 overflow-hidden border-b border-[rgba(0,191,223,0.2)]"
      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
    >
      <div className="animate-marquee">
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-8 text-sm whitespace-nowrap">
            {item.icon}
            {item.text}
            <span className="text-[#00BFDF] mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SEARCH DROPDOWN
───────────────────────────────────────────────── */
const RECENT_SEARCHES = ['Arduino Uno', 'ESP32', 'DHT11 Sensor', 'OLED Display'];

interface SearchDropdownProps {
  query: string;
  onSelect: (q: string) => void;
}

function SearchDropdown({ query, onSelect }: SearchDropdownProps) {
  const suggested = query
    ? products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1e1e1e] border border-[rgba(0,191,223,0.3)] shadow-xl shadow-[rgba(0,0,0,0.5)] z-[100] overflow-hidden">
      {!query && (
        <>
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs text-[#aaaaaa] uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Recent Searches
            </p>
          </div>
          {RECENT_SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              className="w-full text-left px-4 py-2.5 text-sm text-[#cccccc] hover:bg-[rgba(0,191,223,0.08)] hover:text-[#00BFDF] flex items-center gap-2 transition-colors"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              <Clock className="w-3.5 h-3.5 text-[#555]" />
              {s}
            </button>
          ))}
        </>
      )}
      {suggested.length > 0 && (
        <>
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs text-[#aaaaaa] uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Suggested Products
            </p>
          </div>
          {suggested.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[rgba(0,191,223,0.08)] transition-colors"
            >
              <img src={p.image} alt={p.name} className="w-9 h-9 object-cover bg-[#111111] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                  {p.name}
                </p>
                <p className="text-xs text-[#ff6b35]" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                  ₱{p.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </>
      )}
      {query && suggested.length === 0 && (
        <div className="px-4 py-5 text-sm text-[#aaaaaa] text-center" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Walang nakitang produkto para sa "{query}"
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MAIN LAYOUT
───────────────────────────────────────────────── */
export function Layout() {
  const { cartCount } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Sulit Deal', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { label: 'All', path: '/products' },
    { label: 'Microcontrollers', path: '/products?category=Microcontrollers' },
    { label: 'Sensors', path: '/products?category=Sensors' },
    { label: 'Displays', path: '/products?category=Displays' },
    { label: 'Resistors', path: '/products?category=Resistors' },
    { label: 'Capacitors', path: '/products?category=Capacitors' },
    { label: 'Transistors', path: '/products?category=Transistors' },
    { label: 'Kits', path: '/products?category=Kits' },
    { label: 'Modules', path: '/products?category=Modules' },
    { label: 'Components', path: '/products?category=Components' },
  ];

  /* Scroll listeners */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close search dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const mobileNav = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Shop', path: '/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Cart', path: '/cart', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: isAdmin ? 'Admin' : 'Account', path: isAdmin ? '/admin' : '/login', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#111111] pcb-pattern">
      {/* Announcement Ticker */}
      <AnnouncementBar />

      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(30,30,30,0.92)] backdrop-blur-md border-b border-[rgba(0,191,223,0.15)] shadow-lg shadow-[rgba(0,0,0,0.4)]'
            : 'bg-[#1e1e1e] border-b border-[rgba(255,255,255,0.08)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src={logoImg} alt="Xontrix Logo" className="w-10 h-10" />
              <span
                className="text-xl text-white hidden sm:block"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                XONTRIX
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative py-1 transition-colors text-sm ${
                      active ? 'text-[#00BFDF]' : 'text-[#aaaaaa] hover:text-white'
                    }`}
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#00BFDF] shadow-[0_0_8px_rgba(0,191,223,0.6)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search Bar */}
            <div ref={searchRef} className="hidden lg:flex flex-1 max-w-sm relative">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Hanapin: Arduino, ESP32, sensors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full h-10 pl-9 pr-3 bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white text-sm placeholder:text-[#555] focus:border-[#00BFDF] focus:outline-none focus:ring-1 focus:ring-[rgba(0,191,223,0.3)] transition-all"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>
              {searchFocused && (
                <SearchDropdown query={searchQuery} onSelect={(q) => { setSearchQuery(q); setSearchFocused(false); }} />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link to="/cart">
                <button className="relative w-10 h-10 flex items-center justify-center text-[#aaaaaa] hover:text-[#00BFDF] transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-xs bg-[#00BFDF] text-black rounded-none font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
              <Link to={isAdmin ? '/admin' : '/login'}>
                <button className="w-10 h-10 hidden md:flex items-center justify-center text-[#aaaaaa] hover:text-[#00BFDF] transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </Link>
              {/* Mobile burger */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center text-[#aaaaaa] hover:text-[#00BFDF] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(255,255,255,0.08)] bg-[#1a1a1a]">
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                <input
                  type="text"
                  placeholder="Hanapin ng produkto..."
                  className="w-full h-11 pl-9 pr-3 bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white text-sm placeholder:text-[#555] focus:border-[#00BFDF] focus:outline-none"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 min-h-[44px] transition-colors text-sm ${
                    location.pathname === item.path
                      ? 'text-[#00BFDF] bg-[rgba(0,191,223,0.08)] border-l-2 border-[#00BFDF]'
                      : 'text-[#aaaaaa] hover:bg-[rgba(255,255,255,0.04)] hover:text-white border-l-2 border-transparent'
                  }`}
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Category Chip Row with fade edges ── */}
        <div className="border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Left fade */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#1e1e1e] to-transparent" />
              {/* Right fade */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-[#1e1e1e] to-transparent" />

              <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-hide px-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.path}
                    className="px-4 py-1.5 min-h-[36px] flex items-center bg-[#111111] border border-[rgba(255,255,255,0.08)] hover:border-[#00BFDF] hover:bg-[rgba(0,191,223,0.08)] text-[#aaaaaa] hover:text-[#00BFDF] whitespace-nowrap transition-all text-sm shrink-0"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1e1e1e] border-t border-[rgba(255,255,255,0.08)] text-white mt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="Xontrix Logo" className="w-10 h-10" />
                <span className="text-xl" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                  XONTRIX
                </span>
              </div>
              <p className="text-[#aaaaaa] text-sm mb-6" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Ang inyong trusted source ng quality na electronic components sa Pilipinas.
              </p>
              <div className="bg-[#111111] border border-[rgba(255,255,255,0.08)] p-4 inline-block">
                <img src={logoQrImg} alt="Scan to Connect" className="w-28 h-auto mb-2" />
                <p className="text-[#00BFDF] text-xs text-center" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.06em' }}>
                  SCAN TO CONNECT
                </p>
              </div>
            </div>
            {[
              { title: 'Shop', links: [{ label: 'All Products', path: '/products' }, { label: 'New Arrivals', path: '/products' }, { label: 'Best Sellers', path: '/products' }] },
              { title: 'Support', links: [{ label: 'Help Center', path: '#' }, { label: 'Shipping Info', path: '#' }, { label: 'Returns', path: '#' }] },
              { title: 'Company', links: [{ label: 'About Us', path: '/about' }, { label: 'Contact', path: '/contact' }, { label: 'Careers', path: '#' }] },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="mb-4" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
                  {col.title}
                </h3>
                <ul className="space-y-2 text-sm text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.path} className="hover:text-[#00BFDF] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.08)] text-center text-sm text-[#aaaaaa]">
            <p style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              &copy; 2026 XONTRIX ELECTRONICS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV TAB BAR ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[rgba(18,18,18,0.97)] backdrop-blur-md border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex">
          {mobileNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] transition-all relative ${
                  isActive ? 'text-[#00BFDF]' : 'text-[#666] hover:text-[#aaa]'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#00BFDF] shadow-[0_0_8px_rgba(0,191,223,0.8)]" />
                )}
                {/* Cart icon needs a badge wrapper */}
                {item.name === 'Cart' ? (
                  <span className="relative">
                    {item.icon}
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[10px] bg-[#00BFDF] text-black font-bold">
                        {cartCount}
                      </span>
                    )}
                  </span>
                ) : (
                  item.icon
                )}
                <span className="text-[10px]" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── BACK TO TOP ── */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-8 right-5 z-40 w-11 h-11 flex items-center justify-center bg-[#00BFDF] text-black hover:bg-[#00d4f5] transition-all shadow-lg shadow-[rgba(0,191,223,0.35)] back-to-top-enter"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
