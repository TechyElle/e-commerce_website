import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, Heart, Check, ShoppingCart, X, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import type { Product } from '../context/CartContext';
import breadboard400 from '../../assets/products/400 holes Breadboard.png';
import breadboard830 from '../../assets/products/830 Holes Breadboard.png';
import timer555 from '../../assets/products/555 Timer.png';
import sevenSegment from '../../assets/products/7 Segment.png';
import logicIc from '../../assets/products/Logic IC.png';
import arduinoNano from '../../assets/products/Arduino Nano.png';
import arduinoUno from '../../assets/products/Arduino Uno.png';
import arduinoUnoR3 from '../../assets/products/Arduino Uno r3.png';
import esp32 from '../../assets/products/Esp32 38pins.png';
import esp8266 from '../../assets/products/ESP8266.png';
import esp8266Expansion from '../../assets/products/ESP8266 Expansion.png';
import gsm800 from '../../assets/products/GSM SIM800L.png';
import gsm900 from '../../assets/products/GSM Sim900A.png';
import irSensor from '../../assets/products/IR Sensor.png';
import lineTracking from '../../assets/products/Line tracking sensor.png';
import mq2 from '../../assets/products/MQ 2 Smoke Detector.png';
import mq5 from '../../assets/products/MQ 5 Gas detector.png';
import rainSensor from '../../assets/products/Rain Drop Sensor.png';
import bluetoothModule from '../../assets/products/JDY-31 Bluetooth Module.png';
import rfidModule from '../../assets/products/RFID Module.png';
import motorDriver from '../../assets/products/Motor Driver Controller.png';
import oled from '../../assets/products/OLED 0.96.png';
import lcd from '../../assets/products/LCD 1602.png';
import buzzer from '../../assets/products/Buzzer.png';
import diodes from '../../assets/products/Diodes.png';
import electronicKit from '../../assets/products/Electronic Kit.png';
import keypad from '../../assets/products/Keypad.png';
import led from '../../assets/products/LED.png';

/* ── Image Map ── */
const productImageMap: Record<string, string> = {
  // Breadboards
  '400 holes breadboard':    breadboard400,
  '830 holes breadboard':    breadboard830,
  'breadboard 830':          breadboard830,
  // Timers & ICs
  '555 timer':               timer555,
  '7 segment':               sevenSegment,
  'logic ic':                logicIc,
  // Arduino
  'arduino nano':            arduinoNano,
  'arduino uno r3':          arduinoUnoR3,
  'arduino uno':             arduinoUno,
  // ESP
  'esp32':                   esp32,
  'esp8266 expansion':       esp8266Expansion,
  'esp8266':                 esp8266,
  'nodemcu':                 esp8266,
  // GSM
  'gsm sim800l':             gsm800,
  'gsm sim900a':             gsm900,
  // Sensors
  'ir sensor':               irSensor,
  'line tracking sensor':    lineTracking,
  'mq 2 smoke detector':     mq2,
  'mq 5 gas detector':       mq5,
  'rain drop sensor':        rainSensor,
  'ultrasonic':              irSensor,
  'dht':                     irSensor,
  'bmp280':                  irSensor,
  'mpu6050':                 irSensor,
  // Modules
  'jdy-31 bluetooth module': bluetoothModule,
  'rfid module':             rfidModule,
  'motor driver controller': motorDriver,
  'l298n':                   motorDriver,
  // Displays
  'oled':                    oled,
  'lcd':                     lcd,
  // Other components
  'buzzer':                  buzzer,
  'diodes':                  diodes,
  'electronic kit':          electronicKit,
  'keypad':                  keypad,
  'led':                     led,
  'resistor':                led,
  'capacitor':               diodes,
  'transistor':              logicIc,
  'jumper':                  breadboard400,
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

  if (product.category === 'Microcontrollers') return esp32;
  if (product.category === 'Sensors') return irSensor;
  if (product.category === 'Displays') return oled;
  if (product.category === 'Power') return motorDriver;
  if (product.category === 'Connectors') return breadboard400;
  if (product.category === 'Tools') return electronicKit;
  if (product.category === 'Components') return led;

  return electronicKit;
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
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    if (!available) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-sm border border-black/10 bg-white shadow-2xl shadow-black/10"
        style={{ animation: 'fadeInUp 0.3s ease forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white hover:bg-[#f5f5f5] border border-black/10 transition-colors"
        >
          <X className="w-4 h-4 text-[#111111]" />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-[#f5f5f5] overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between p-5">
            <div>
              <Badge className="mb-2 text-xs bg-transparent text-[#db4444] border border-[#db4444]">
                {product.category}
              </Badge>
              <h3
                className="mb-2 text-[#111111] line-clamp-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                {product.name}
              </h3>
              <p
                className="text-xs text-[#7d8184] mb-3 line-clamp-3"
                style={{ fontFamily: 'Inter, sans-serif' }}
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
                        ? 'text-[#ffad33] fill-[#ffad33]'
                        : 'text-[#d9d9d9]'
                    }`}
                  />
                ))}
                <span
                  className="text-xs text-[#7d8184] ml-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                {product.originalPrice && (
                  <span
                    className="text-xs text-[#7d8184] line-through block"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    ₱{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="text-2xl text-[#db4444]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
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
                    ? 'opacity-50 cursor-not-allowed border border-[#7d8184] text-[#7d8184]'
                    : added
                    ? 'bg-[#10b981] text-white border border-[#10b981]'
                    :  'cyber-button'
                }`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0',
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
                className="w-full min-h-[44px] flex items-center justify-center text-sm text-[#111111] hover:text-[#db4444] border border-black/10 hover:border-[#db4444] transition-all"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0',
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
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
        className={`product-card-pro group relative overflow-hidden rounded-lg border border-black/10 bg-white transition hover:-translate-y-0.5 hover:border-[#1d7dff] hover:shadow-xl hover:shadow-black/10 ${className}`}
        style={{ transitionDelay: `${animDelay}ms` } as React.CSSProperties}
      >
        {/* Product status badge */}
        {available && (
          <>
            {discount > 0 ? (
              <Badge className="absolute top-3 left-3 z-10 border-none bg-[#db4444] text-xs text-white rounded-sm">
                -{discount}% SULIT
              </Badge>
            ) : (
              variant === 'new' && (
                <Badge className="absolute top-3 left-3 z-10 bg-[#00a76f] text-white border-none text-xs rounded-sm">
                  NEW
                </Badge>
              )
            )}
          </>
        )}

        {/* OUT OF STOCK badge */}
        {!available && (
          <div className="absolute top-3 left-3 z-10 bg-[#db4444] text-white text-xs px-2 py-1 font-bold rounded-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            OUT OF STOCK
          </div>
        )}

        {/* Wishlist button */}
        <button
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className={`absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d7dff] ${
            wishlisted
              ? 'bg-[#fff5f5] border-[#db4444]'
              : 'bg-white border-black/10 hover:border-[#db4444] hover:bg-[#fff5f5]'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              wishlisted ? 'text-[#db4444] fill-[#db4444]' : 'text-[#111111]'
            }`}
          />
        </button>

        {/* Image + hover overlay */}
        <Link to={`/products/${product.id}`} className="block">
          <div className="product-image-well relative aspect-square overflow-hidden bg-[#eef3f7]">
            <img
              src={imageSrc}
              alt={product.name}
              className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Quick view overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#07111f]/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                aria-label={`Quick view ${product.name}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickView(true);
                }}
                className="flex min-h-[44px] translate-y-2 items-center gap-2 rounded-md border border-white bg-white px-4 py-2 text-sm text-[#111111] shadow-lg shadow-black/15 transition-all duration-300 hover:border-[#db4444] hover:bg-[#db4444] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white group-hover:translate-y-0"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0',
                }}
              >
                <Eye className="w-4 h-4" />
                QUICK VIEW
              </button>
            </div>
          </div>
        </Link>

        {/* Card content */}
        <div className="p-3 sm:p-4">
          {variant === 'new' && (
            <Badge className="mb-2 text-xs bg-transparent text-[#7d8184] border border-black/10 rounded-sm">
              {product.category}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="mb-2 border border-[#ffd0d0] bg-[#fff5f5] text-xs text-[#db4444] rounded-sm">
              Sulit Deal
            </Badge>
          )}

          <Link to={`/products/${product.id}`}>
            <h3
              className="mb-2 min-h-[40px] text-sm leading-5 text-[#111111] transition-colors line-clamp-2 group-hover:text-[#db4444] sm:text-base"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#ffad33] text-[#ffad33]" />
            <span
              className="text-sm text-[#111111]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {product.rating}
            </span>
            <span
              className="text-sm text-[#7d8184]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ({product.reviews})
            </span>
          </div>

          {/* Price + Cart button */}
          <div className="flex items-center justify-between gap-2">
            <div>
              {product.originalPrice && (
                <span
                  className="text-xs text-[#7d8184] line-through block"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  ₱{product.originalPrice.toFixed(2)}
                </span>
              )}
              <span
                className="text-base text-[#db4444] sm:text-xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                ₱{product.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!available}
              aria-label={`Add ${product.name} to cart`}
              className={`flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md border px-2 py-2 text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d7dff] sm:px-3 ${
                !available
                  ? 'opacity-50 cursor-not-allowed border-[#bdbdbd] text-[#7d8184]'
                : added
                  ? 'bg-[#10b981] border-[#10b981] text-white'
                  : 'bg-[#db4444] border-[#db4444] text-white shadow-sm shadow-[#db4444]/20 hover:bg-[#c73939]'
              }`}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0',
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
