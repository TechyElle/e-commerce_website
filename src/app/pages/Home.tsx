import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, Clock, Flame, Sparkles,
  ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─────────────────────────────────────────────────
   Scroll-reveal section wrapper
───────────────────────────────────────────────── */
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────────────
   Hero Carousel
───────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    tag: 'WELCOME',
    title: 'XONTRIX\nELECTRONICS',
    subtitle: 'Your trusted source for quality electronic components sa Pilipinas.',
    cta: 'Shop Now',
    link: '/products',
    bg: 'from-[#0a1628] via-[#0d2645] to-[#111111]',
    accent: '#00BFDF',
  },
  {
    id: 1,
    tag: 'NEW ARRIVALS',
    title: 'LATEST\nMICROCONTROLLERS',
    subtitle: 'ESP32, RP2040, STM32 — mga pinakabagong dev boards para sa iyong projects.',
    cta: 'Explore New',
    link: '/products',
    bg: 'from-[#0a2020] via-[#0a2d2d] to-[#111111]',
    accent: '#00BFDF',
  },
  {
    id: 2,
    tag: '🔥 FLASH SALE',
    title: 'SULIT\nDEAL',
    subtitle: 'Hanggang 50% OFF sa piling items — limitadong oras lang!',
    cta: 'Grab Deals',
    link: '/products',
    bg: 'from-[#2a0808] via-[#3d0a0a] to-[#111111]',
    accent: '#ff6b35',
    isCountdown: true,
  },
];

function HeroCarousel({ timeLeft }: { timeLeft: { hours: number; minutes: number; seconds: number } }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Reset timer on manual nav
  const handleManualNav = (fn: () => void) => {
    if (timerRef.current) clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5500);
  };

  return (
    <div className="relative overflow-hidden bg-[#111111]" style={{ height: 'clamp(280px, 52vw, 520px)' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ transform: i === current ? 'translateX(0)' : i < current ? 'translateX(-4%)' : 'translateX(4%)' }}
        >
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`} />
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-20" />
          {/* Glow orb */}
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: `radial-gradient(circle, ${slide.accent}, transparent 70%)` }}
          />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center">
            <div className="max-w-2xl">
              {/* Tag */}
              <span
                className="inline-block mb-3 px-3 py-1 text-xs border"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: slide.accent,
                  borderColor: slide.accent,
                  background: `${slide.accent}18`,
                }}
              >
                {slide.tag}
              </span>

              <h1
                className="mb-4 text-white whitespace-pre-line"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                  lineHeight: 1.0,
                  fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                  letterSpacing: '-0.02em',
                  textShadow: `0 0 40px ${slide.accent}44`,
                }}
              >
                {slide.title}
              </h1>

              <p
                className="mb-6 text-[#cccccc]"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                  maxWidth: '520px',
                }}
              >
                {slide.subtitle}
              </p>

              {/* Countdown on slide 3 */}
              {slide.isCountdown && (
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="w-5 h-5 text-[#ff6b35] shrink-0" />
                  <span className="text-sm text-[#ff6b35] mr-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                    Magtatapos sa:
                  </span>
                  {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <span
                        className="timer-digit inline-block min-w-[52px] py-1 text-center bg-[rgba(0,0,0,0.6)] border border-[#dc2626] text-[#ff4444] text-3xl"
                        style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900 }}
                      >
                        {String(val).padStart(2, '0')}
                      </span>
                      {idx < 2 && (
                        <span className="text-[#ff4444] text-3xl timer-digit" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900 }}>
                          :
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}

              <Link to={slide.link}>
                <button
                  className="inline-flex items-center gap-2 px-8 min-h-[48px] border text-sm transition-all hover:shadow-lg"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: slide.accent,
                    borderColor: slide.accent,
                    background: `${slide.accent}12`,
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = slide.accent;
                    (e.currentTarget as HTMLButtonElement).style.color = '#111111';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px ${slide.accent}66`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${slide.accent}12`;
                    (e.currentTarget as HTMLButtonElement).style.color = slide.accent;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow buttons */}
      <button
        onClick={() => handleManualNav(prev)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.15)] hover:border-[#00BFDF] hover:bg-[rgba(0,191,223,0.15)] text-white hover:text-[#00BFDF] transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleManualNav(next)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.15)] hover:border-[#00BFDF] hover:bg-[rgba(0,191,223,0.15)] text-white hover:text-[#00BFDF] transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleManualNav(() => goTo(idx))}
            className={`transition-all duration-400 ${
              idx === current
                ? 'w-8 h-2.5 bg-[#00BFDF] shadow-[0_0_8px_rgba(0,191,223,0.8)]'
                : 'w-2.5 h-2.5 bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.6)]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-6 right-6 z-20 text-xs text-[#aaaaaa]"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Sulit Deal Card
───────────────────────────────────────────────── */
function SulitCard({
  product,
  discount,
  stockPercent,
  isUrgent,
  delay,
  revealed,
}: {
  product: typeof products[0];
  discount: number;
  stockPercent: number;
  isUrgent: boolean;
  delay: number;
  revealed: boolean;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`group relative bg-[#111111] border border-[rgba(255,255,255,0.08)] hover:border-[#ff6b35] card-lift card-lift-orange overflow-hidden ${
        revealed ? 'reveal-visible' : 'reveal-hidden'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Urgency pulse badge */}
      {isUrgent && (
        <div className="absolute top-2 left-2 z-10 animate-pulse-urgent">
          <span
            className="flex items-center gap-1 px-1.5 py-0.5 bg-[#dc2626] text-white text-[10px]"
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
          >
            <Zap className="w-2.5 h-2.5" />
            MABILIS NA!
          </span>
        </div>
      )}

      {discount > 0 && (
        <Badge className="absolute top-2 right-2 z-10 bg-[#dc2626] text-white border-none text-xs">
          -{discount}%
        </Badge>
      )}

      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-[#1e1e1e]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/products/${product.id}`}>
          <h3
            className="text-sm mb-1.5 group-hover:text-[#ff6b35] transition-colors line-clamp-2 text-white"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="mb-2">
          {product.originalPrice && (
            <span className="text-[11px] text-[#aaaaaa] line-through block" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              ₱{product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-base text-[#dc2626]" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
            ₱{product.price.toFixed(2)}
          </span>
        </div>

        {/* Animated stock bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-[#1e1e1e] overflow-hidden mb-1">
            <div
              className="h-full animate-fill-bar"
              style={{
                '--bar-target': `${stockPercent}%`,
                '--bar-delay': `${delay + 200}ms`,
                background: isUrgent
                  ? 'linear-gradient(90deg, #dc2626, #ff4444)'
                  : 'linear-gradient(90deg, #ff6b35, #ff8c5a)',
              } as React.CSSProperties}
            />
          </div>
          <p
            className={`text-[11px] ${isUrgent ? 'text-[#dc2626]' : 'text-[#ff6b35]'}`}
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
          >
            {isUrgent ? '⚡ Nalalapit na maubusan!' : `Natitira: ${product.saleStock} pcs`}
          </p>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full min-h-[36px] text-xs border transition-all ${
            added
              ? 'bg-[#10b981] border-[#10b981] text-white'
              : 'bg-transparent border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-black'
          }`}
          style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, letterSpacing: '0.06em' }}
        >
          {added ? '✓ ADDED!' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────── */
export function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const sulitRef = useRef<HTMLElement>(null);
  const [sulitVisible, setSulitVisible] = useState(false);

  const topProducts = products.filter((p) => !p.isNew && !p.isSale).slice(0, 6);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const sulitDeals = products.filter((p) => p.isSale);

  // Countdown timer
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Sulit section reveal for progress bar animation
  useEffect(() => {
    const el = sulitRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSulitVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel timeLeft={timeLeft} />

      {/* ── TOP PRODUCTS ── */}
      <RevealSection className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-8 bg-[#00BFDF] shadow-[0_0_8px_rgba(0,191,223,0.6)]" />
              <h2 className="text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: 'clamp(1.3rem, 3vw, 1.875rem)' }}>
                TOP PRODUCTS
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 text-[#00BFDF] hover:text-white transition-colors text-sm"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
                animDelay={i * 60}
              />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── SULIT DEAL ── */}
      <section
        ref={sulitRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-[#1e1e1e] ${sulitVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-8 p-5 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] border border-[rgba(220,38,38,0.4)] shadow-lg shadow-[rgba(220,38,38,0.15)]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Flame className="w-7 h-7 text-[#ff6b35]" />
                <h2
                  className="text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', letterSpacing: '0.05em' }}
                >
                  🔥 SULIT DEAL
                </h2>
                <span className="hidden sm:block text-sm text-[rgba(255,255,255,0.7)]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  — Flash Sale hanggang 50% OFF!
                </span>
              </div>

              {/* Big timer */}
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white opacity-80 shrink-0" />
                <div className="flex items-center gap-1">
                  {[
                    { val: timeLeft.hours, label: 'HRS' },
                    { val: timeLeft.minutes, label: 'MIN' },
                    { val: timeLeft.seconds, label: 'SEC' },
                  ].map((unit, idx) => (
                    <span key={idx} className="flex items-end gap-1">
                      <span className="flex flex-col items-center">
                        <span
                          className="timer-digit px-2 py-1 bg-[rgba(0,0,0,0.5)] border border-[rgba(220,38,38,0.5)] text-[#ff4444] min-w-[44px] text-center text-2xl"
                          style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900 }}
                        >
                          {String(unit.val).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] text-[rgba(255,255,255,0.5)] mt-0.5" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {unit.label}
                        </span>
                      </span>
                      {idx < 2 && (
                        <span className="text-[#ff4444] text-2xl mb-3 timer-digit" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900 }}>
                          :
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sulitDeals.map((product, i) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              const stockPercent = product.saleStock ? product.saleStock : 60;
              const isUrgent = stockPercent <= 20;

              return (
                <SulitCard
                  key={product.id}
                  product={product}
                  discount={discount}
                  stockPercent={stockPercent}
                  isUrgent={isUrgent}
                  delay={i * 80}
                  revealed={sulitVisible}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <RevealSection className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-[#00BFDF]" />
              <h2
                className="text-white"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: 'clamp(1.3rem, 3vw, 1.875rem)' }}
              >
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 text-[#00BFDF] hover:text-white transition-colors text-sm"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="new"
                animDelay={i * 50}
              />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── PROMO BANNER ── */}
      <RevealSection className="py-12 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden border border-[rgba(0,191,223,0.2)] bg-gradient-to-r from-[#0a1628] to-[#111111] p-8 md:p-12">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div
              className="absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl opacity-10"
              style={{ background: 'radial-gradient(circle, #00BFDF, transparent 70%)' }}
            />
            <div className="relative max-w-xl">
              <span
                className="inline-block mb-3 text-xs text-[#00BFDF] border border-[rgba(0,191,223,0.4)] px-3 py-1"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600, letterSpacing: '0.12em' }}
              >
                EXCLUSIVE OFFER
              </span>
              <h2
                className="text-white mb-3"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)' }}
              >
                LIBRENG SHIPPING SA LAHAT NG ORDERS!
              </h2>
              <p className="text-[#aaaaaa] mb-6 text-base" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Mag-order ng ₱999 o higit pa at libre na ang shipping mo kahit saan sa Pilipinas.
              </p>
              <Link to="/products">
                <button
                  className="inline-flex items-center gap-2 px-8 min-h-[48px] bg-[#00BFDF] text-black text-sm hover:bg-[#00d4f5] hover:shadow-[0_0_24px_rgba(0,191,223,0.5)] transition-all"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}
                >
                  SHOP NOW <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
