import { useParams, Link, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Star,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import type { Product } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { resolveProductImage } from '../lib/productImages';

/* ──────────────────────────────────────────────
   Image Map — same as ProductCard.tsx
────────────────────────────────────────────── */
const productImageMap: Record<string, string> = {
  '400 holes breadboard':    'src/assets/products/400 holes Breadboard.png',
  '830 holes breadboard':    'src/assets/products/830 Holes Breadboard.png',
  '555 timer':               'src/assets/products/555 Timer.png',
  '7 segment':               'src/assets/products/7 Segment.png',
  'logic ic':                'src/assets/products/Logic IC.png',
  'arduino nano':            'src/assets/products/Arduino Nano.png',
  'arduino uno r3':          'src/assets/products/Arduino Uno r3.png',
  'arduino uno':             'src/assets/products/Arduino Uno.png',
  'esp32':                   'src/assets/products/Esp32 38pins.png',
  'esp8266 expansion':       'src/assets/products/ESP8266 Expansion.png',
  'esp8266':                 'src/assets/products/ESP8266.png',
  'gsm sim800l':             'src/assets/products/GSM SIM800L.png',
  'gsm sim900a':             'src/assets/products/GSM Sim900A.png',
  'ir sensor':               'src/assets/products/IR Sensor.png',
  'line tracking sensor':    'src/assets/products/Line tracking sensor.png',
  'mq 2 smoke detector':     'src/assets/products/MQ 2 Smoke Detector.png',
  'mq-2 smoke':              'src/assets/products/MQ 2 Smoke Detector.png',
  'mq 5 gas detector':       'src/assets/products/MQ 5 Gas detector.png',
  'mq-5 gas':                'src/assets/products/MQ 5 Gas detector.png',
  'rain drop sensor':        'src/assets/products/Rain Drop Sensor.png',
  'raindrop':                'src/assets/products/Rain Drop Sensor.png',
  'jdy-31 bluetooth module': 'src/assets/products/JDY-31 Bluetooth Module.png',
  'bluetooth module':        'src/assets/products/JDY-31 Bluetooth Module.png',
  'rfid module':             'src/assets/products/RFID Module.png',
  'rfid':                    'src/assets/products/RFID Module.png',
  'motor driver controller': 'src/assets/products/Motor Driver Controller.png',
  'motor driver':            'src/assets/products/Motor Driver Controller.png',
  'l298n':                   'src/assets/products/Motor Driver Controller.png',
  'oled 0.96':               'src/assets/products/OLED 0.96.png',
  'oled':                    'src/assets/products/OLED 0.96.png',
  'lcd 1602':                'src/assets/products/LCD 1602.png',
  'lcd':                     'src/assets/products/LCD 1602.png',
  'buzzer':                  'src/assets/products/Buzzer.png',
  'diodes':                  'src/assets/products/Diodes.png',
  'diode':                   'src/assets/products/Diodes.png',
  'electronic kit':          'src/assets/products/Electronic Kit.png',
  'starter kit':             'src/assets/products/Electronic Kit.png',
  'keypad':                  'src/assets/products/Keypad.png',
  'led':                     'src/assets/products/LED.png',
};

/**
 * Resolves the correct local image path from product name.
 * Falls back to product.image if no match found.
 */
function resolveImage(product: Product): string {
  return resolveProductImage(product);
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: '#ffffff' }}
      >
        <h1
          className="text-3xl text-[#111111]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Product Not Found
        </h1>
        <Link to="/products">
          <Button
            className="border border-[#db4444] text-[#db4444] bg-transparent hover:bg-[#db4444] hover:text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const imageSrc = resolveImage(product);
  const available = product.inStock && (product.stock ?? 1) > 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!available) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`);
  };

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: 'Inter, sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Link to="/" className="text-[#7d8184] hover:text-[#db4444] transition-colors">Home</Link>
            <span className="text-[#bdbdbd]">›</span>
            <Link to="/products" className="text-[#7d8184] hover:text-[#db4444] transition-colors">Products</Link>
            <span className="text-[#bdbdbd]">›</span>
            <Link to="/products" className="text-[#7d8184] hover:text-[#db4444] transition-colors">{product.category}</Link>
            <span className="text-[#bdbdbd]">›</span>
            <span className="text-[#db4444]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-[#7d8184] hover:text-[#db4444] transition-colors text-sm font-semibold"
          style={{ fontFamily: 'Inter, sans-serif', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

          {/* ── Image Side ── */}
          <div>
            {/* Main Image */}
            <div
              className="w-full aspect-square flex items-center justify-center overflow-hidden mb-4"
              style={{ background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                style={{ maxHeight: '420px' }}
              />
            </div>

            {/* Thumbnail row — shows same image 3x as placeholders */}
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 flex items-center justify-center overflow-hidden cursor-pointer transition-all"
                  style={{
                    background: '#f5f5f5',
                    border: i === 0
                      ? '1px solid #db4444'
                      : '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Info Side ── */}
          <div>
            {/* Category + Stock */}
            <div className="flex items-center gap-3 mb-3">
              <Badge
                className="bg-transparent text-[#db4444] border border-[#db4444] text-xs"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                {product.category}
              </Badge>
              {available ? (
                <span className="flex items-center gap-1 text-[#00c853] text-xs font-bold">
                  <Check className="w-3 h-3" />
                  In Stock ({product.stock} left)
                </span>
              ) : (
                <span className="text-[#ff3b3b] text-xs font-bold">Out of Stock</span>
              )}
            </div>

            {/* Name */}
            <h1
              className="text-[#111111] mb-4 leading-tight"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '26px' }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-[#db4444] fill-[#db4444]'
                        : 'text-[#d9d9d9]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#111111] font-bold text-sm">{product.rating}</span>
              <span className="text-[#7d8184] text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-5">
              {product.originalPrice && (
                <span className="text-[#7d8184] line-through text-sm block">
                  ₱{product.originalPrice.toFixed(2)}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '32px', color: '#db4444' }}
                >
                  ₱{product.price.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span
                    className="text-[#111111] text-sm px-2 py-1"
                    style={{ background: '#dc2626', fontWeight: 700 }}
                  >
                    -{discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[#7d8184] mb-5 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* AI Recommendation */}
            <div
              className="mb-5 p-4 flex items-start gap-3"
              style={{ background: 'rgba(219,68,68,0.06)', border: '1px solid rgba(219,68,68,0.2)' }}
            >
              <Sparkles className="w-4 h-4 text-[#db4444] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#7d8184]">
                <strong className="text-[#db4444]">AI Recommendation:</strong> This product is highly rated in its category and is a top pick among engineering students in the Philippines.
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[#7d8184] text-sm font-bold uppercase tracking-wider">Qty:</span>
              <div
                className="flex items-center overflow-hidden"
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 text-[#111111] text-lg transition-colors hover:bg-[#db4444] hover:text-white"
                  style={{ background: '#f5f5f5', border: 'none', cursor: 'pointer' }}
                >
                  −
                </button>
                <span
                  className="w-12 text-center text-[#111111] font-bold"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock ?? quantity + 1, quantity + 1))}
                  className="w-10 h-10 text-[#111111] text-lg transition-colors hover:bg-[#db4444] hover:text-white"
                  style={{ background: '#f5f5f5', border: 'none', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!available}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all disabled:opacity-50"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0',
                  background: added ? '#10b981' : '#db4444',
                  color: '#fff',
                  border: 'none',
                  cursor: available ? 'pointer' : 'not-allowed',
                }}
              >
                {added ? (
                  <><Check className="w-4 h-4" /> ADDED TO CART!</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> ADD TO CART</>
                )}
              </button>

              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="w-12 h-12 flex items-center justify-center transition-all"
                style={{
                  background: wishlisted ? 'rgba(220,38,38,0.2)' : '#f5f5f5',
                  border: wishlisted ? '1px solid #dc2626' : '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                }}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'text-[#dc2626] fill-[#dc2626]' : 'text-[#111111]'}`} />
              </button>

              <button
                className="w-12 h-12 flex items-center justify-center transition-all"
                style={{
                  background: '#f5f5f5',
                  border: '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success('Link copied!');
                }}
              >
                <Share2 className="w-5 h-5 text-[#111111]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🚚', label: 'Free Shipping', sub: 'On orders ₱999+' },
                { icon: '🔒', label: 'SSL Secured', sub: 'Safe checkout' },
                { icon: '🔄', label: '7-Day Returns', sub: 'Hassle-free policy' },
                { icon: '✅', label: 'Genuine Parts', sub: '100% authentic' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-3 p-3"
                  style={{ background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <p className="text-[#111111] text-xs font-bold">{b.label}</p>
                    <p className="text-[#7d8184] text-xs">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div
          className="mb-14"
          style={{ background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <Tabs defaultValue="specs">
            <TabsList
              className="w-full justify-start rounded-none gap-0 p-0"
              style={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
            >
              {['specs', 'reviews', 'shipping'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none px-6 py-4 text-[#7d8184] data-[state=active]:text-[#db4444] data-[state=active]:border-b-2 data-[state=active]:border-[#db4444] data-[state=active]:bg-transparent capitalize"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  {tab === 'specs' ? 'Specifications' : tab === 'reviews' ? 'Reviews' : 'Shipping & Returns'}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Specs */}
            <TabsContent value="specs" className="p-6 mt-0">
              {product.specs && Object.keys(product.specs).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 px-2"
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                    >
                      <span className="text-[#7d8184] text-sm font-bold uppercase tracking-wider">{key}</span>
                      <span className="text-[#111111] text-sm font-semibold">{value as string}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#7d8184] text-sm">No specifications available for this product.</p>
              )}
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="p-6 mt-0">
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div
                    className="text-[#db4444]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px' }}
                  >
                    {product.rating}
                  </div>
                  <div className="flex justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#db4444] fill-[#db4444]' : 'text-[#d9d9d9]'}`} />
                    ))}
                  </div>
                  <p className="text-[#7d8184] text-xs">{product.reviews} reviews</p>
                </div>
                <div className="flex-1">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center gap-3 mb-2">
                      <span className="text-[#7d8184] text-xs w-4">{star}★</span>
                      <div className="flex-1 h-2" style={{ background: '#111' }}>
                        <div
                          className="h-full"
                          style={{
                            background: '#db4444',
                            width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '7%' : '3%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              {[
                { name: 'Juan D.', date: 'April 2026', text: 'Great product! Works perfectly for my IoT project. Fast delivery too.', verified: true },
                { name: 'Maria S.', date: 'March 2026', text: 'Legit and authentic. Exactly what I needed for my thesis project.', verified: true },
                { name: 'Carlo R.', date: 'March 2026', text: 'Good quality. Will buy again from Xontrix.', verified: false },
              ].map((r) => (
                <div key={r.name} className="mb-4 p-4" style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#111111] text-sm font-bold">{r.name}</span>
                      {r.verified && (
                        <span className="text-xs px-2 py-0.5" style={{ background: 'rgba(0,200,83,0.15)', color: '#00c853', border: '1px solid rgba(0,200,83,0.3)' }}>
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-[#7d8184] text-xs">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#db4444] fill-[#db4444]" />
                    ))}
                  </div>
                  <p className="text-[#7d8184] text-sm">{r.text}</p>
                </div>
              ))}
            </TabsContent>

            {/* Shipping */}
            <TabsContent value="shipping" className="p-6 mt-0">
              <div className="space-y-4 text-sm text-[#7d8184]">
                {[
                  { icon: '🚚', title: 'Free Standard Shipping', desc: 'On orders ₱999 and above. Delivery within 2–5 business days across the Philippines.' },
                  { icon: '⚡', title: 'Express Shipping — ₱99', desc: 'Same-day dispatch for Metro Manila. 1–2 business days.' },
                  { icon: '🔄', title: '7-Day Return Policy', desc: 'Not satisfied? Return within 7 days for a full refund or replacement.' },
                  { icon: '🛡️', title: '2-Year Warranty', desc: 'All products come with a 2-year manufacturer warranty on manufacturing defects.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4" style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-[#111111] font-bold mb-1">{item.title}</p>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div>
            <h2
              className="text-[#111111] mb-6"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px' }}
            >
              RELATED <span style={{ color: '#db4444' }}>PRODUCTS</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => {
                const relImg = resolveImage(rel);
                return (
                  <Link
                    key={rel.id}
                    to={`/products/${rel.id}`}
                    className="group block"
                    style={{ background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.08)', transition: 'border-color .2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#db4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)')}
                  >
                    <div className="aspect-square overflow-hidden flex items-center justify-center" style={{ background: '#111' }}>
                      <img
                        src={relImg}
                        alt={rel.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <Badge className="mb-1 text-xs bg-transparent text-[#7d8184] border border-[rgba(0,0,0,0.15)]">
                        {rel.category}
                      </Badge>
                      <h3
                        className="text-[#111111] text-sm mb-2 line-clamp-2 group-hover:text-[#db4444] transition-colors"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                      >
                        {rel.name}
                      </h3>
                      <span
                        className="text-[#db4444]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}
                      >
                        ₱{rel.price.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
