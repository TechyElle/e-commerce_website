import { Outlet, Link, useLocation } from 'react-router';
import {
  ShoppingCart, User, Search, Menu, X, Truck,
  Zap, Tag, Home, Package, ChevronUp, Clock,
  MessageCircle, Send, Bot, Minimize2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';
import { useState, useEffect, useRef } from 'react';
import logoImg from '../../assets/logo/LOGO.png';
import logoQrImg from '../../assets/logo/LOGO QR.png';
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
      className="bg-black text-white py-2 overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
    >
      <div className="animate-marquee">
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-8 text-sm whitespace-nowrap">
            {item.icon}
            {item.text}
            <span className="text-white/40 mx-4">|</span>
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
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/10 shadow-xl shadow-black/10 z-[100] overflow-hidden rounded-sm">
      {!query && (
        <>
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs text-[#7d8184] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Recent Searches
            </p>
          </div>
          {RECENT_SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              className="w-full text-left px-4 py-2.5 text-sm text-[#4f4f4f] hover:bg-[#f5f5f5] hover:text-[#db4444] flex items-center gap-2 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Clock className="w-3.5 h-3.5 text-[#7d8184]" />
              {s}
            </button>
          ))}
        </>
      )}
      {suggested.length > 0 && (
        <>
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs text-[#7d8184] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Suggested Products
            </p>
          </div>
          {suggested.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f5f5f5] transition-colors"
            >
              <img src={p.image} alt={p.name} className="w-9 h-9 object-contain bg-[#f5f5f5] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#111111] truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {p.name}
                </p>
                <p className="text-xs text-[#db4444]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  ₱{p.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </>
      )}
      {query && suggested.length === 0 && (
        <div className="px-4 py-5 text-sm text-[#7d8184] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          Walang nakitang produkto para sa "{query}"
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   AI ELECTRONICS CONSULTANT CHATBOT
───────────────────────────────────────────────── */

const ELECTRONICS_KNOWLEDGE: Record<string, string> = {
  'arduino': '🤖 Arduino is a microcontroller platform great for beginners! The Arduino Uno R3 (ATmega328P, 5V, 14 digital I/O pins) is perfect for prototyping. Available at Xontrix for ₱320.',
  'esp32': '📡 The ESP32 Dev Board is a powerhouse! Features: WiFi 802.11 b/g/n + Bluetooth BLE, dual-core 240MHz, 4MB flash. Great for IoT projects. Available at Xontrix for ₱285.',
  'dht22': '🌡️ DHT22 (AM2302) Temperature & Humidity Sensor: Range -40°C to 80°C (±0.5°C accuracy), 0-100% RH. Connect VCC→3.3V, GND→GND, DATA→digital pin. Use DHT library in Arduino IDE.',
  'dht11': '🌡️ DHT11 is an entry-level temp/humidity sensor (0-50°C, ±2°C). Cheaper than DHT22 but less accurate. Pull-up resistor (4.7kΩ) needed on DATA pin.',
  'oled': '🖥️ OLED Display 0.96" (128×64px, I2C). Connect: VCC→3.3V/5V, GND→GND, SDA→A4 (Uno)/21 (ESP32), SCL→A5 (Uno)/22 (ESP32). Use Adafruit_SSD1306 library.',
  'resistor': '⚡ Resistors limit current flow. Use Ohm\'s Law: R = V/I. Resistor Pack 600pcs (1% tolerance) at Xontrix covers all common values (10Ω to 1MΩ). ₱49 only!',
  'servo': '🔧 Servo motors: connect Signal→PWM pin (e.g. D9 on Arduino), VCC→5V (external power for multiple servos), GND→shared. Use Servo.h library: myServo.write(angle);',
  'sensor': '📊 For sensors, match voltage levels (3.3V vs 5V) carefully. Use voltage dividers or level shifters when connecting 5V sensors to ESP32 (3.3V logic).',
  'i2c': '🔗 I2C protocol: SDA + SCL lines, up to 127 devices on one bus. Each device has unique address. Use Wire.h library. Scan with I2C Scanner sketch to find addresses.',
  'spi': '🔗 SPI protocol: 4 wires (MOSI, MISO, SCK, CS). Faster than I2C. Great for displays, SD cards, wireless modules.',
  'breadboard': '🧰 Breadboard tip: power rails run horizontally (red=+, blue=−). Component pins in vertical columns share connections. Use jump wires to connect across rows.',
  'led': '💡 LED wiring: always use a current-limiting resistor! Formula: R = (V_supply - V_forward) / I_desired. For 5V → 2V LED at 20mA: R = (5-2)/0.02 = 150Ω.',
  'raspberry': '🍓 Raspberry Pi is a full Linux SBC (single-board computer), unlike Arduino which is a microcontroller. Pi runs Python, Node.js, etc. Better for complex projects needing OS.',
  'shipping': '🚚 Xontrix offers FREE shipping on orders ₱999 and above! Same-day dispatch for orders placed before 12nn.',
  'payment': '💳 Xontrix accepts E-Wallet (GCash/Maya), Credit Card, and Cash on Delivery (COD). Secure checkout guaranteed.',
  'project': '🛠️ For beginner electronics projects, start with: LED blink → button input → LCD display → sensors → wireless comms. Build up complexity gradually!',
};

const QUICK_QUESTIONS = [
  'How do I hook up a DHT22?',
  'Arduino vs ESP32?',
  'What is I2C protocol?',
  'How to wire an LED?',
];

function getAIResponse(query: string): string {
  const q = query.toLowerCase();

  // Product-specific lookup
  for (const [key, answer] of Object.entries(ELECTRONICS_KNOWLEDGE)) {
    if (q.includes(key)) return answer;
  }

  // Arduino vs ESP32 comparison
  if ((q.includes('arduino') && q.includes('esp32')) || q.includes('vs') || q.includes('compare')) {
    return '⚖️ Arduino Uno vs ESP32:\n• Arduino Uno: ATmega328P, 5V, simpler, better for beginners, no WiFi built-in. ₱320\n• ESP32: Dual-core 240MHz, 3.3V, WiFi+BT, 34 GPIO pins, more powerful. ₱285\n→ Choose Arduino for learning, ESP32 for IoT projects!';
  }

  // Product search in store
  const matchedProduct = products.find(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
  if (matchedProduct) {
    return `🔍 Found in our store: **${matchedProduct.name}** — ₱${matchedProduct.price.toFixed(2)}\n${matchedProduct.description}\n\nRating: ⭐ ${matchedProduct.rating}/5 (${matchedProduct.reviews} reviews). ${matchedProduct.stock > 0 ? `In stock (${matchedProduct.stock} units)!` : 'Currently out of stock.'}`;
  }

  // Fallback
  return '🤖 I can help with: product specs, wiring guides, Arduino/ESP32 tips, sensor connections, and more! Try asking "How do I wire a DHT22 sensor?" or "What\'s the difference between Arduino and ESP32?"';
}

function AIElectronicsConsultant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '👋 Hi! I\'m your AI Electronics Consultant. Ask me about products, wiring, sensors, or any electronics question!' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Don't show on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = getAIResponse(text.trim());
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: text.trim() },
      { role: 'ai', text: reply },
    ]);
    setInput('');
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: '#111827',
            border: '1px solid rgba(99,102,241,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            maxHeight: '520px',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-xs font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  AI Electronics Consultant
                </p>
                <p className="text-white/60 text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Powered by Xontrix AI
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ minHeight: 0, maxHeight: 340 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'ai' && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-1.5 shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.2)' }}
                  >
                    <Bot className="w-3.5 h-3.5 text-[#818cf8]" />
                  </div>
                )}
                <div
                  className="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    background: m.role === 'user' ? '#6366f1' : 'rgba(255,255,255,0.07)',
                    color: m.role === 'user' ? 'white' : '#ccc',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-2.5 py-1 rounded-full text-[10px] text-[#818cf8] hover:text-white hover:bg-[#6366f1] transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.25)',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Ask anything about electronics..."
              className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-[#444]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <button
              onClick={() => send(input)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#6366f1] transition-colors shrink-0"
              style={{ background: 'rgba(99,102,241,0.25)' }}
            >
              <Send className="w-3.5 h-3.5 text-[#818cf8]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 md:bottom-8 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95"
        style={{
          background: open
            ? '#4f46e5'
            : 'linear-gradient(135deg, #6366f1, #818cf8)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.5)',
        }}
        aria-label="AI Electronics Consultant"
      >
        {open ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 text-white" />
        )}
        {!open && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: '#10b981', fontFamily: 'Inter, sans-serif' }}
          >
            AI
          </span>
        )}
      </button>
    </>
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
    { name: 'Sulit Deal', path: '/products?deal=sulit' },
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
  }, [location.pathname, location.search]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const mobileNav = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Shop', path: '/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Cart', path: '/cart', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: isAdmin ? 'Admin' : 'Account', path: isAdmin ? '/admin' : '/login', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Ticker */}
      <AnnouncementBar />

      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm shadow-black/5'
            : 'bg-white border-b border-black/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src={logoImg} alt="Xontrix Logo" className="w-10 h-10" />
              <span
                className="text-xl text-[#111111] hidden sm:block"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
              >
                XONTRIX
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const [itemPath, itemSearch = ''] = item.path.split('?');
                const active =
                  location.pathname === itemPath &&
                  location.search === (itemSearch ? `?${itemSearch}` : '');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative py-1 transition-colors text-sm ${
                      active ? 'text-[#db4444]' : 'text-[#111111] hover:text-[#db4444]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#db4444]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search Bar */}
            <div ref={searchRef} className="hidden lg:flex flex-1 max-w-sm relative">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d8184] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Hanapin: Arduino, ESP32, sensors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full h-10 pl-9 pr-3 bg-[#f5f5f5] border border-transparent text-[#111111] text-sm placeholder:text-[#7d8184] focus:border-[#db4444] focus:outline-none focus:ring-1 focus:ring-[#db4444]/20 transition-all rounded-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              {searchFocused && (
                <SearchDropdown query={searchQuery} onSelect={(q) => { setSearchQuery(q); setSearchFocused(false); }} />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link to="/cart">
                <button className="relative w-10 h-10 flex items-center justify-center text-[#111111] hover:text-[#db4444] transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-xs bg-[#db4444] text-white rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
              <Link to={isAdmin ? '/admin' : '/login'}>
                <button className="w-10 h-10 hidden md:flex items-center justify-center text-[#111111] hover:text-[#db4444] transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </Link>
              {/* Mobile burger */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center text-[#111111] hover:text-[#db4444] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[rgba(0,0,0,0.06)] bg-white">
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d8184]" />
                <input
                  type="text"
                  placeholder="Hanapin ng produkto..."
                  className="w-full h-11 pl-9 pr-3 bg-[#f5f5f5] border border-black/10 text-[#111111] text-sm placeholder:text-[#7d8184] focus:border-[#db4444] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 min-h-[44px] transition-colors text-sm ${
                    (() => {
                      const [itemPath, itemSearch = ''] = item.path.split('?');
                      return (
                        location.pathname === itemPath &&
                        location.search === (itemSearch ? `?${itemSearch}` : '')
                      );
                    })()
                      ? 'text-[#db4444] bg-[#fff5f5] border-l-2 border-[#db4444]'
                      : 'text-[#111111] hover:bg-[#f5f5f5] hover:text-[#db4444] border-l-2 border-transparent'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Category Chip Row with fade edges ── */}
        <div className="border-t border-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
              {/* Left fade */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-white to-transparent" />
              {/* Right fade */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-white to-transparent" />

              <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-hide px-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.path}
                    className="px-4 py-1.5 min-h-[36px] flex items-center bg-white border border-black/10 hover:border-[#db4444] hover:bg-[#fff5f5] text-[#4f4f4f] hover:text-[#db4444] whitespace-nowrap transition-all text-sm shrink-0 rounded-sm"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
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
      <main className="pb-20 md:pb-0 bg-white">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-[rgba(0,0,0,0.06)] text-[#111111] mt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="Xontrix Logo" className="w-10 h-10" />
                <span className="text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}>
                  XONTRIX
                </span>
              </div>
              <p className="text-[#7d8184] text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ang inyong trusted source ng quality na electronic components sa Pilipinas.
              </p>
              <div className="bg-[#f5f5f5] border border-black/10 p-4 inline-block">
                <img src={logoQrImg} alt="Scan to Connect" className="w-28 h-auto mb-2" />
                <p className="text-[#db4444] text-xs text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
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
                <h3 className="mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {col.title}
                </h3>
                <ul className="space-y-2 text-sm text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.path} className="hover:text-[#db4444] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-black/10 text-center text-sm text-[#7d8184]">
            <p style={{ fontFamily: 'Inter, sans-serif' }}>
              &copy; 2026 XONTRIX ELECTRONICS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV TAB BAR ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-black/10">
        <div className="flex">
          {mobileNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] transition-all relative ${
                  isActive ? 'text-[#db4444]' : 'text-[#7d8184] hover:text-[#111111]'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#db4444]" />
                )}
                {/* Cart icon needs a badge wrapper */}
                {item.name === 'Cart' ? (
                  <span className="relative">
                    {item.icon}
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[10px] bg-[#db4444] text-white font-bold rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </span>
                ) : (
                  item.icon
                )}
                <span className="text-[10px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── AI ELECTRONICS CONSULTANT ── */}
      <AIElectronicsConsultant />

      {/* ── BACK TO TOP ── */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-24 right-20 z-40 w-11 h-11 flex items-center justify-center bg-[#db4444] text-white hover:bg-[#c73939] transition-all shadow-lg shadow-[#db4444]/25 back-to-top-enter rounded-full"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
