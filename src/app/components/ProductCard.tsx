import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, Heart, Check, ShoppingCart, X, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';

/* ── Image Map ── */
const productImageMap: Record<string, string> = {
  // Breadboards
  '400 holes breadboard':    'src/imports/Products/Products/400 holes Breadboard.png',
  '830 holes breadboard':    'src/imports/Products/Products/830 Holes Breadboard.png',
  // Timers & ICs
  '555 timer':               'src/imports/Products/Products/555 Timer.png',
  '7 segment':               'src/imports/Products/Products/7 Segment.png',
  'logic ic':                'src/imports/Products/Products/Logic IC.png',
  // Arduino
  'arduino nano':            'src/imports/Products/Products/Arduino Nano.png',
  'arduino uno r3':          'src/imports/Products/Products/Arduino Uno r3.png',
  'arduino uno':             'src/imports/Products/Products/Arduino Uno.png',
  // ESP
  'esp32':                   'src/imports/Products/Products/Esp32 38pins.png',
  'esp8266 expansion':       'src/imports/Products/Products/ESP8266 Expansion.png',
  'esp8266':                 'src/imports/Products/Products/ESP8266.png',
  // GSM
  'gsm sim800l':             'src/imports/Products/Products/GSM SIM800L.png',
  'gsm sim900a':             'src/imports/Products/Products/GSM Sim900A.png',
  // Sensors
  'ir sensor':               'src/imports/Products/Products/IR Sensor.png',
  'line tracking sensor':    'src/imports/Products/Products/Line tracking sensor.png',
  'mq 2 smoke detector':     'src/imports/Products/Products/MQ 2 Smoke Detector.png',
  'mq 5 gas detector':       'src/imports/Products/Products/MQ 5 Gas detector.png',
  'rain drop sensor':        'src/imports/Products/Products/Rain Drop Sensor.png',
  // Modules
  'jdy-31 bluetooth module': 'src/imports/Products/Products/JDY-31 Bluetooth Module.png',
  'rfid module':             'src/imports/Products/Products/RFID Module.png',
  'motor driver controller': 'src/imports/Products/Products/Motor Driver Controller.png',
  // Displays
  'oled 0.96':               'src/imports/Products/Products/OLED 0.96.png',
  'lcd 1602':                'src/imports/Products/Products/LCD 1602.png',
  // Other components
  'buzzer':                  'src/imports/Products/Products/Buzzer.png',
  'diodes':                  'src/imports/Products/Products/Diodes.png',
  'electronic kit':          'src/imports/Products/Products/Electronic Kit.png',
  'keypad':                  'src/imports/Products/Products/Keypad.png',
  'led':                     'src/imports/Products/Products/LED.png',
};

/**
 * Looks up the local image path by matching product name (case-insensitive).
 * Falls back to the original product.image if no match is found.
 */
function resolveImage(product: Product): string {
  const key = product.name.toLowerCase().trim();
  for (const [mapKey, path] of Object.entries(productImageMap)) {
    if (key.includes(mapKey)) return path;
  }
  return product.image; // fallback to original
}

/* ──────────────────────────────────────────────
   Quick-View Modal
────────────────────────────────────────────── */
interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const imageSrc = resolveImage(product);
  const available = product.inStock && (product.stock ?? 1) > 0;

  const handleAdd = () => {
    if (!available) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-[#1e1e1e] border border-[rgba(0,191,223,0.3)] shadow-2xl shadow-[rgba(0,191,223,0.1)] overflow-hidden"
        style={{ animation: 'fadeInUp 0.3s ease forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="grid grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-[#111111] overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Details */}
          <div className="p-5 flex flex-col justify-between">
            <div>
              <Badge className="mb-2 text-xs bg-transparent text-[#00BFDF] border border-[#00BFDF]">
                {product.category}
              </Badge>
              <h3
                className="mb-2 text-white line-clamp-3"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
              >
                {product.name}
              </h3>
              <p
                className="text-xs text-[#aaaaaa] mb-3 line-clamp-3"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-[#00BFDF] fill-[#00BFDF]'
                        : 'text-[#444]'
                    }`}
                  />
                ))}
                <span
                  className="text-xs text-[#aaaaaa] ml-1"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                {product.originalPrice && (
                  <span
                    className="text-xs text-[#aaaaaa] line-through block"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    ₱{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="text-2xl text-[#ff6b35]"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                  >
                    ₱{product.price.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <span className="text-xs bg-[#dc2626] text-white px-1.5 py-0.5">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleAdd}
                disabled={!available}
                className={`w-full min-h-[44px] flex items-center justify-center gap-2 transition-all text-sm ${
                  !available
                    ? 'opacity-50 cursor-not-allowed border border-[#555] text-[#555]'
                    : added
                    ? 'bg-[#10b981] text-white border border-[#10b981]'
                    :  'cyber-button'
                }`}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    ADDED!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    ADD TO CART
                  </>
                )}
              </button>

              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className="w-full min-h-[44px] flex items-center justify-center text-sm text-[#aaaaaa] hover:text-white border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] transition-all"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ProductCard
────────────────────────────────────────────── */
interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'new';
  className?: string;
  animDelay?: number;
}

export function ProductCard({
  product,
  variant = 'default',
  className = '',
  animDelay = 0,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const imageSrc = resolveImage(product);
  const available = product.inStock && (product.stock ?? 1) > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!available) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {quickView && (
        <QuickViewModal product={product} onClose={() => setQuickView(false)} />
      )}

      <div
        className={`group relative bg-[#1e1e1e] border border-[rgba(255,255,255,0.08)] hover:border-[#00BFDF] card-lift overflow-hidden ${className}`}
        style={{ transitionDelay: `${animDelay}ms` } as React.CSSProperties}
      >
        {/* NEW badge - only show if in stock */}
        {variant === 'new' && available && (
          <Badge className="absolute top-3 left-3 z-10 bg-[#10b981] text-white border-none text-xs">
            NEW
          </Badge>
        )}

        {/* OUT OF STOCK badge */}
        {!available && (
          <div className="absolute top-3 left-3 z-10 bg-[#dc2626] text-white text-xs px-2 py-1 font-bold"
            style={{ fontFamily: 'Orbitron, sans-serif' }}>
            OUT OF STOCK
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all border ${
            wishlisted
              ? 'bg-[rgba(220,38,38,0.2)] border-[#dc2626]'
              : 'bg-[rgba(0,0,0,0.55)] border-[rgba(255,255,255,0.1)] hover:border-[#00BFDF] hover:bg-[rgba(0,191,223,0.15)]'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              wishlisted ? 'text-[#dc2626] fill-[#dc2626]' : 'text-white'
            }`}
          />
        </button>

        {/* Image + hover overlay */}
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-[#111111]">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickView(true);
                }}
                className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-[rgba(0,0,0,0.7)] border border-[#00BFDF] text-[#00BFDF] hover:bg-[#00BFDF] hover:text-black transition-all translate-y-2 group-hover:translate-y-0 duration-300 text-sm"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                <Eye className="w-4 h-4" />
                QUICK VIEW
              </button>
            </div>
          </div>
        </Link>

        {/* Card content */}
        <div className="p-4">
          {variant === 'new' && (
            <Badge className="mb-2 text-xs bg-transparent text-[#aaaaaa] border border-[rgba(255,255,255,0.15)]">
              {product.category}
            </Badge>
          )}

          <Link to={`/products/${product.id}`}>
            <h3
              className="mb-2 group-hover:text-[#00BFDF] transition-colors line-clamp-2 text-white"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[#00BFDF] text-sm">★</span>
            <span
              className="text-sm text-white"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {product.rating}
            </span>
            <span
              className="text-sm text-[#aaaaaa]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              ({product.reviews})
            </span>
          </div>

          {/* Price + Cart button */}
          <div className="flex items-center justify-between gap-2">
            <div>
              {product.originalPrice && (
                <span
                  className="text-xs text-[#aaaaaa] line-through block"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  ₱{product.originalPrice.toFixed(2)}
                </span>
              )}
              <span
                className="text-xl text-[#ff6b35]"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                ₱{product.price.toFixed(2)}
              </span>
            </div>

              <button
              onClick={handleAddToCart}
              disabled={!available}
              className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs border transition-all ${
                !available
                  ? 'opacity-50 cursor-not-allowed border-[#555] text-[#555]'
                  : added
                  ? 'bg-[#10b981] border-[#10b981] text-white'
                  : 'bg-transparent border-[#00BFDF] text-[#00BFDF] hover:bg-[#00BFDF] hover:text-black'
              }`}
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  ADDED!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  ADD
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
