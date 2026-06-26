import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  BarChart3,
  Box,
  Edit3,
  ImagePlus,
  Package,
  Save,
  ShoppingCart,
  Trash2,
  Users,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Calendar,
  Award,
  FileText,
  Brain,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Printer,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useStore, type OrderStatus, type StoreProduct } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import {
  BASE_URL,
  salesApi,
  type SalesSummary,
  type ApiLoyaltyCustomer,
  type ApiCalendarEvent,
  type ApiOrder,
} from '../lib/api';

// ── Helpers ───────────────────────────────────────────────────────────────────

const php = (v: number) =>
  `₱${v.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const emptyProduct = {
  name: '',
  price: 0,
  image: '',
  category: 'Components',
  description: '',
  rating: 4.8,
  reviews: 0,
  stock: 10,
};

// ── Seeded monthly chart data (Jan-Jun 2026 based on seeded orders) ────────────
const MONTHLY_CHART = [
  { label: 'JAN', revenue: 15000 },
  { label: 'FEB', revenue: 18500 },
  { label: 'MAR', revenue: 21000 },
  { label: 'APR', revenue: 26000 },
  { label: 'MAY', revenue: 31500 },
  { label: 'JUN', revenue: 48500 },
];

// ── AI Advisor rule engine ────────────────────────────────────────────────────
function generateAdvisorAnswer(query: string, summary: SalesSummary | null): string {
  const q = query.toLowerCase();
  const rev = summary?.total_revenue ?? 0;
  const mRev = summary?.month_revenue ?? 0;
  const gr = summary?.growth_rate ?? 0;
  const ta = summary?.target_achievement ?? 0;
  const top = summary?.best_sellers?.[0]?.name ?? 'N/A';
  const deals = summary?.active_deals ?? 0;
  const pending = summary?.pending_count ?? 0;
  const shipped = summary?.shipped_count ?? 0;
  const delivered = summary?.delivered_count ?? 0;

  if (q.includes('sales') || q.includes('revenue') || q.includes('month')) {
    return `📊 Sales this month: **${php(mRev)}** (${gr >= 0 ? '+' : ''}${gr}% vs last month). Total all-time revenue is **${php(rev)}**. Target achievement is **${ta}%** for June 2026.`;
  }
  if (q.includes('top product') || q.includes('best seller')) {
    return `🏆 Top product this month: **${top}**. It leads in units sold and contributes the most to monthly revenue. Consider restocking and promoting it heavily.`;
  }
  if (q.includes('growth') || q.includes('trend')) {
    return `📈 Month-over-month growth is **${gr >= 0 ? '+' : ''}${gr}%**. The store is on a ${gr >= 0 ? 'positive upward' : 'declining'} trend. ${gr > 10 ? 'Excellent momentum — capitalize by running flash deals.' : 'Consider targeted promotions to accelerate growth.'}`;
  }
  if (q.includes('order') || q.includes('status')) {
    return `📦 Current order status: **${pending}** pending, **${shipped}** shipped, **${delivered}** delivered. There are **${deals}** active deals. Prioritize fulfilling the ${pending} pending orders today.`;
  }
  if (q.includes('target') || q.includes('goal')) {
    return `🎯 Target achievement for June 2026: **${ta}%** of the ₱60,000 PHP monthly target. ${ta >= 100 ? '🎉 Target exceeded!' : `Need ₱${php(60000 - mRev)} more to hit 100%.`}`;
  }
  if (q.includes('sign') || q.includes('fewer') || q.includes('signup')) {
    return `👥 User acquisition may be slowing. Recommended actions: (1) Run a referral discount campaign, (2) Add Google/Facebook sign-in options, (3) Offer first-time buyer promos (e.g. 10% off first order).`;
  }
  if (q.includes('insight') || q.includes('quick')) {
    return `⚡ Quick Insight: Revenue is ${php(mRev)} this month (+${gr}%). Top seller is ${top}. ${pending} orders need fulfillment. Target at ${ta}%. Focus: restock low-stock items and run a weekend flash sale!`;
  }
  return `🤖 I can help you analyze: sales performance, top products, order status, growth trends, and target achievement. Based on current data — monthly revenue is **${php(mRev)}** and growth is **${gr >= 0 ? '+' : ''}${gr}%**. What specific metric would you like to explore?`;
}

// ── Gradient Sales Chart (matches sample UI) ─────────────────────────────────
function SalesPerformanceChart({
  data,
}: {
  data: { label: string; revenue: number }[];
}) {
  const [hov, setHov] = useState<number | null>(null);
  const maxV = Math.max(...data.map((d) => d.revenue), 1);
  const chartH = 180;
  const padL = 44;
  const padB = 32;
  const padT = 24;
  const padR = 16;
  const w = 600;
  const h = chartH + padT + padB;
  const barW = (w - padL - padR) / data.length;

  const bars = data.map((d, i) => {
    const bh = ((d.revenue / maxV) * chartH);
    const x = padL + i * barW + barW * 0.15;
    const y = padT + chartH - bh;
    return { ...d, bh, x, y, bw: barW * 0.7, i };
  });

  const yTicks = [0, 1000, 2000, 3000, 4000, 5000];

  return (
    <div className="w-full select-none">
      {hov !== null && (
        <div
          className="mb-2 text-xs px-3 py-1.5 rounded-full inline-block"
          style={{
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.4)',
            color: '#a5b4fc',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {data[hov]?.revenue.toLocaleString()} activities · Conversion rate 89% · Drop-off 11%
        </div>
      )}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {bars.map((b) => (
            <linearGradient key={b.i} id={`barGrad${b.i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={hov === b.i ? '#818cf8' : '#6366f1'} stopOpacity="0.9" />
              <stop offset="100%" stopColor={hov === b.i ? '#a5b4fc' : '#818cf8'} stopOpacity="0.25" />
            </linearGradient>
          ))}
        </defs>

        {/* Y-axis ticks */}
        {yTicks.map((tick) => {
          const y = padT + chartH - (tick / 5000) * chartH;
          return (
            <g key={tick}>
              <line
                x1={padL}
                y1={y}
                x2={w - padR}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <text
                x={padL - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#555"
                fontFamily="Inter, sans-serif"
              >
                {tick >= 1000 ? `${tick / 1000}k` : tick}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {bars.map((b) => (
          <g key={b.i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.bw}
              height={b.bh}
              fill={`url(#barGrad${b.i})`}
              rx="3"
              style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              opacity={hov !== null && hov !== b.i ? 0.4 : 1}
              onMouseEnter={() => setHov(b.i)}
              onMouseLeave={() => setHov(null)}
            />
            {/* X label */}
            <text
              x={b.x + b.bw / 2}
              y={padT + chartH + 18}
              textAnchor="middle"
              fontSize="11"
              fill="#666"
              fontFamily="Inter, sans-serif"
            >
              {b.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Analytics MoM chart ────────────────────────────────────────────────────────
function AnalyticsBarChart({
  data,
  color = '#6366f1',
}: {
  data: { label: string; revenue: number }[];
  color?: string;
}) {
  const [hov, setHov] = useState<number | null>(null);
  const maxV = Math.max(...data.map((d) => d.revenue), 1);
  const chartH = 200;
  return (
    <div className="w-full select-none">
      <div className="flex gap-2 items-end" style={{ height: `${chartH}px` }}>
        {data.map((d, i) => (
          <div
            key={i}
            className="flex-1 relative cursor-pointer transition-all duration-200"
            style={{ height: `${(d.revenue / maxV) * 100}%`, minHeight: 4 }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            <div
              className="w-full h-full rounded-t-sm"
              style={{
                background:
                  hov === i
                    ? `linear-gradient(to top, ${color}, #a5b4fc)`
                    : `linear-gradient(to top, ${color}99, ${color})`,
                boxShadow: hov === i ? `0 0 14px ${color}88` : 'none',
              }}
            />
            {hov === i && (
              <div
                className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#111] border border-[#6366f1] px-2 py-1 text-[10px] text-white whitespace-nowrap z-30 rounded"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {php(d.revenue)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[10px] text-[#555]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mini calendar ─────────────────────────────────────────────────────────────
function CalendarView({ events }: { events: ApiCalendarEvent[] }) {
  const today = new Date();
  const [cur, setCur] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [sel, setSel] = useState<string | null>(null);

  const daysInMonth = new Date(cur.year, cur.month + 1, 0).getDate();
  const firstDay = new Date(cur.year, cur.month, 1).getDay();
  const monthStr = `${cur.year}-${String(cur.month + 1).padStart(2, '0')}`;

  const evtByDay: Record<string, ApiCalendarEvent[]> = {};
  events.forEach((e) => {
    if (e.date.startsWith(monthStr)) {
      const d = e.date.slice(8, 10).replace(/^0/, '');
      if (!evtByDay[d]) evtByDay[d] = [];
      evtByDay[d].push(e);
    }
  });

  const typeColor: Record<string, string> = {
    success: '#10b981',
    warning: '#f59e0b',
    info: '#6366f1',
    danger: '#ef4444',
  };

  const typeIcon: Record<string, React.ReactNode> = {
    success: <CheckCircle className="w-4 h-4 text-[#10b981]" />,
    warning: <Clock className="w-4 h-4 text-[#f59e0b]" />,
    info: <Info className="w-4 h-4 text-[#6366f1]" />,
    danger: <AlertTriangle className="w-4 h-4 text-[#ef4444]" />,
  };

  const monthLabel = new Date(cur.year, cur.month).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const selEvents = sel ? evtByDay[sel] ?? [] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar grid */}
      <div className="lg:col-span-2">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCur((c) => {
              const d = new Date(c.year, c.month - 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })}
            className="p-2 hover:bg-white/5 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#aaa]" />
          </button>
          <h3
            className="text-white font-semibold"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {monthLabel}
          </h3>
          <button
            onClick={() => setCur((c) => {
              const d = new Date(c.year, c.month + 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })}
            className="p-2 hover:bg-white/5 rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#aaa]" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {days.map((d) => (
            <div
              key={d}
              className="text-center text-[11px] text-[#555] py-1"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = String(i + 1);
            const dayEvts = evtByDay[day] ?? [];
            const isToday =
              today.getFullYear() === cur.year &&
              today.getMonth() === cur.month &&
              today.getDate() === i + 1;
            const isSelected = sel === day;
            return (
              <button
                key={day}
                onClick={() => setSel(isSelected ? null : day)}
                className={`relative min-h-[52px] p-1.5 rounded text-left transition-all ${
                  isSelected
                    ? 'bg-[#6366f1]/20 border border-[#6366f1]'
                    : isToday
                    ? 'bg-white/5 border border-white/20'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <span
                  className={`text-xs font-semibold ${
                    isToday ? 'text-[#6366f1]' : 'text-[#ccc]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {day}
                </span>
                <div className="flex flex-wrap gap-0.5 mt-0.5">
                  {dayEvts.slice(0, 2).map((e, ei) => (
                    <span
                      key={ei}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: typeColor[e.type] }}
                    />
                  ))}
                  {dayEvts.length > 2 && (
                    <span className="text-[8px] text-[#555]">+{dayEvts.length - 2}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event sidebar */}
      <div>
        <h3
          className="text-white font-semibold mb-3 text-sm"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {sel ? `Events for ${monthLabel.split(' ')[0]} ${sel}` : 'Upcoming Events'}
        </h3>
        <div className="space-y-3">
          {(sel ? selEvents : events.slice(0, 6)).map((evt) => (
            <div
              key={evt.id}
              className="p-3 rounded border border-white/8 bg-white/3"
              style={{ borderColor: `${typeColor[evt.type]}33` }}
            >
              <div className="flex items-start gap-2">
                {typeIcon[evt.type]}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs text-white font-semibold truncate"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {evt.title}
                  </p>
                  <p className="text-[10px] text-[#666] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {evt.date}
                  </p>
                  <p className="text-[11px] text-[#aaa] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {evt.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {!sel && events.length === 0 && (
            <p className="text-[#555] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              No events this month.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Invoice Print Modal ────────────────────────────────────────────────────────
function InvoiceModal({ order, onClose }: { order: ApiOrder; onClose: () => void }) {
  const handlePrint = () => window.print();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg"
        style={{ background: '#111', border: '1px solid rgba(99,102,241,0.4)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div>
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              Invoice #{order.id.slice(0, 8).toUpperCase()}
            </h2>
            <p className="text-[#666] text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
              {new Date(order.created_at).toLocaleDateString('en-PH', { dateStyle: 'long' })}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded transition-colors"
            >
              <X className="w-4 h-4 text-[#aaa]" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Bill To</p>
              <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{order.customer_name}</p>
              <p className="text-[#888] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{order.customer_email}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Payment</p>
              <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{order.payment_method}</p>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  order.status === 'delivered'
                    ? 'bg-[#10b981]/15 text-[#10b981]'
                    : order.status === 'shipped'
                    ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                    : 'bg-[#6366f1]/15 text-[#6366f1]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Items table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Item', 'Qty', 'Unit Price', 'Total'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] text-[#555] uppercase tracking-wider px-0 py-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(order.items ?? []).map((item, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2.5 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</td>
                    <td className="py-2.5 text-[#aaa]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.quantity}</td>
                    <td className="py-2.5 text-[#aaa]" style={{ fontFamily: 'Inter, sans-serif' }}>{php(item.price)}</td>
                    <td className="py-2.5 text-white font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{php(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-white/8 pt-4 space-y-1 text-right">
            <div className="flex justify-between text-sm text-[#aaa]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>Subtotal</span><span>{php(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#aaa]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : php(order.shipping)}</span>
            </div>
            <div
              className="flex justify-between text-base text-white font-bold pt-1 border-t border-white/8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>TOTAL</span><span className="text-[#6366f1]">{php(order.total)}</span>
            </div>
          </div>

          <p
            className="text-center text-[11px] text-[#444]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Thank you for shopping at XONTRIX Electronics. ₱999+ orders qualify for FREE shipping.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Component ──────────────────────────────────────────────────────
export function Admin() {
  const {
    products,
    orders,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    refreshOrders,
    refreshUsers,
  } = useStore();
  const { user, isAdmin, signOut } = useAuth();
  const [draft, setDraft] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [salesSummary, setSalesSummary] = useState<SalesSummary | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Invoice modal
  const [invoiceOrder, setInvoiceOrder] = useState<ApiOrder | null>(null);
  const [invoiceSearch, setInvoiceSearch] = useState('');

  // AI Advisor
  const [advisorMessages, setAdvisorMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [advisorInput, setAdvisorInput] = useState('');
  const advisorEndRef = useRef<HTMLDivElement>(null);

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    refreshOrders().catch(() => undefined);
    refreshUsers().catch(() => undefined);
    salesApi.summary().then(setSalesSummary).catch(() => undefined);
  }, [isAdmin, refreshOrders, refreshUsers]);

  useEffect(() => {
    advisorEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [advisorMessages]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploadError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${BASE_URL}/upload.php`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setDraft((prev) => ({ ...prev, image: data.url }));
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setDraft((prev) => ({ ...prev, image: '' }));
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const beginEdit = (product: StoreProduct) => {
    setEditingId(product.id);
    setPreviewUrl(product.image || null);
    setDraft({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      stock: product.stock,
    });
  };

  const resetDraft = () => {
    setEditingId(null);
    setDraft(emptyProduct);
    setPreviewUrl(null);
    setUploadError(null);
    setProductError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveProduct = async () => {
    const name = draft.name.trim();
    const category = draft.category.trim();
    const description = draft.description.trim();
    const image = draft.image.trim();
    if (!name || !category || !description || !image) {
      setProductError('Name, category, description, and image are required.');
      return;
    }
    if (!Number.isFinite(draft.price) || draft.price <= 0) {
      setProductError('Price must be greater than zero.');
      return;
    }
    if (!Number.isInteger(draft.stock) || draft.stock < 0) {
      setProductError('Stock must be a whole number of zero or higher.');
      return;
    }
    setProductError(null);
    setSavingProduct(true);
    try {
      const payload = { ...draft, name, category, description, image };
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }
      await salesApi.summary().then(setSalesSummary).catch(() => undefined);
      resetDraft();
    } catch (error) {
      setProductError(error instanceof Error ? error.message : 'Unable to save product.');
    } finally {
      setSavingProduct(false);
    }
  };

  const sendAdvisorMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text: text.trim() };
    const aiReply = { role: 'ai' as const, text: generateAdvisorAnswer(text.trim(), salesSummary) };
    setAdvisorMessages((prev) => [...prev, userMsg, aiReply]);
    setAdvisorInput('');
  };

  // KPI derived values
  const kpi = useMemo(() => {
    const totalRevenue = salesSummary?.total_revenue ?? 0;
    const monthRevenue = salesSummary?.month_revenue ?? 0;
    const growthRate = salesSummary?.growth_rate ?? 0;
    const targetAchievement = salesSummary?.target_achievement ?? 0;
    const activeDeals = salesSummary?.active_deals ?? 0;
    const pending = salesSummary?.pending_count ?? 0;
    const shipped = salesSummary?.shipped_count ?? 0;
    const delivered = salesSummary?.delivered_count ?? 0;
    const returned = 0; // not tracked in current schema
    const totalOrders = salesSummary?.total_orders ?? 0;
    return { totalRevenue, monthRevenue, growthRate, targetAchievement, activeDeals, pending, shipped, delivered, returned, totalOrders };
  }, [salesSummary]);

  const calendarEvents = salesSummary?.calendar_events ?? [];
  const loyaltyCustomers: ApiLoyaltyCustomer[] = salesSummary?.loyalty_customers ?? [];
  const feedback = salesSummary?.feedback ?? [];

  const filteredOrders = orders.filter(
    (o) =>
      invoiceSearch === '' ||
      o.customerName.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(invoiceSearch.toLowerCase())
  );

  const quickPrompts = [
    'Top product this month?',
    'Why fewer signups?',
    'Sales growth trend?',
    'Need quick insights',
  ];

  const badgeColor: Record<string, string> = {
    Platinum: '#a78bfa',
    Gold: '#fbbf24',
    Silver: '#94a3b8',
    Bronze: '#b45309',
  };
  const badgeBg: Record<string, string> = {
    Platinum: 'rgba(167,139,250,0.15)',
    Gold: 'rgba(251,191,36,0.15)',
    Silver: 'rgba(148,163,184,0.15)',
    Bronze: 'rgba(180,83,9,0.15)',
  };

  return (
    <div className="min-h-screen" style={{ background: '#0f1117' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p
              className="text-sm mb-1"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#818cf8' }}
            >
              ADMIN PANEL
            </p>
            <h1
              className="text-3xl sm:text-4xl text-white"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            >
              Welcome to Sales Dashboard
            </h1>
            <p className="text-[#555] text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Signed in as {user?.email}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/products"
              className="px-4 py-2 border border-[#6366f1] text-[#818cf8] hover:bg-[#6366f1] hover:text-white transition-all text-sm rounded"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View Store
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-2 border border-[#ef4444]/60 text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-all text-sm rounded"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="h-auto flex-wrap gap-1 mb-8 p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              { value: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-3.5 h-3.5" /> },
              { value: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-3.5 h-3.5" /> },
              { value: 'invoices', label: 'Invoices', icon: <FileText className="w-3.5 h-3.5" /> },
              { value: 'calendar', label: 'Calendar', icon: <Calendar className="w-3.5 h-3.5" /> },
              { value: 'loyalty', label: 'Loyalty', icon: <Award className="w-3.5 h-3.5" /> },
              { value: 'products', label: 'Products', icon: <Box className="w-3.5 h-3.5" /> },
              { value: 'orders', label: 'Orders', icon: <ShoppingCart className="w-3.5 h-3.5" /> },
              { value: 'inventory', label: 'Inventory', icon: <Package className="w-3.5 h-3.5" /> },
              { value: 'users', label: 'Users', icon: <Users className="w-3.5 h-3.5" /> },
            ].map(({ value, label, icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-1.5 px-3 py-2 text-xs capitalize rounded-lg text-white/75 data-[state=active]:bg-[#6366f1] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {icon}
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ══════════════════════════════════════════════════════════════════
              DASHBOARD TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="dashboard">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: 'Total Revenue',
                  value: php(kpi.totalRevenue),
                  change: `+${kpi.growthRate}% vs last month`,
                  up: kpi.growthRate >= 0,
                  icon: <BarChart3 className="w-4 h-4" />,
                },
                {
                  label: 'Growth Rate',
                  value: `${kpi.growthRate >= 0 ? '+' : ''}${kpi.growthRate}%`,
                  change: `${kpi.growthRate >= 0 ? '+' : ''}${kpi.growthRate}% vs last month`,
                  up: kpi.growthRate >= 0,
                  icon: <TrendingUp className="w-4 h-4" />,
                },
                {
                  label: 'Target Achievement',
                  value: `${kpi.targetAchievement}%`,
                  change: `+15% vs last month`,
                  up: true,
                  icon: <Target className="w-4 h-4" />,
                },
                {
                  label: 'Active Deals',
                  value: `${kpi.activeDeals}`,
                  change: `+6.2% vs last month`,
                  up: true,
                  icon: <Zap className="w-4 h-4" />,
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="p-5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs text-[#666]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {c.label}
                    </span>
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-lg"
                      style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}
                    >
                      {c.icon}
                    </div>
                  </div>
                  <div
                    className="text-2xl text-white mb-1.5"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
                  >
                    {c.value}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs ${c.up ? 'text-[#10b981]' : 'text-[#ef4444]'}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {c.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {c.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Sales Chart + AI Advisor side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Sales Performance Chart */}
              <div
                className="lg:col-span-2 p-5 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-white font-semibold"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    Sales Performance
                  </h2>
                  <span
                    className="text-xs px-2.5 py-1 rounded-lg text-[#818cf8]"
                    style={{
                      background: 'rgba(99,102,241,0.12)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Last 6 months
                  </span>
                </div>
                <SalesPerformanceChart data={MONTHLY_CHART} />
              </div>

              {/* AI Strategic Advisor */}
              <div
                className="p-5 rounded-xl flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  minHeight: 340,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-white font-semibold"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    AI Assistant
                  </h2>
                  <Brain className="w-4 h-4 text-[#818cf8]" />
                </div>

                {advisorMessages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: 'rgba(99,102,241,0.15)' }}
                    >
                      <Sparkles className="w-7 h-7 text-[#818cf8]" />
                    </div>
                    <p
                      className="text-[#888] text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      What are you currently working on?
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
                    {advisorMessages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[88%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                            m.role === 'user'
                              ? 'bg-[#6366f1] text-white'
                              : 'text-[#ccc]'
                          }`}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            background: m.role === 'ai' ? 'rgba(255,255,255,0.06)' : undefined,
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    <div ref={advisorEndRef} />
                  </div>
                )}

                {/* Quick prompts */}
                {advisorMessages.length === 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {quickPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendAdvisorMessage(p)}
                        className="px-2.5 py-1 text-[10px] rounded-full text-[#aaa] hover:text-white hover:border-[#6366f1] transition-all"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div
                  className="flex items-center gap-2 mt-auto rounded-xl px-3 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <input
                    value={advisorInput}
                    onChange={(e) => setAdvisorInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendAdvisorMessage(advisorInput)}
                    placeholder="Need quick insights..."
                    className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-[#555]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <button
                    onClick={() => sendAdvisorMessage(advisorInput)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#6366f1] transition-colors"
                    style={{ background: 'rgba(99,102,241,0.3)' }}
                  >
                    <Send className="w-3.5 h-3.5 text-[#818cf8]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Track Order Status */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h2
                className="text-white font-semibold mb-1"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Track Order Status
              </h2>
              <p
                className="text-[#555] text-xs mb-5"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Analyze growth and changes in visitor patterns
              </p>

              {/* Status counters */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  { label: 'New Order', count: kpi.pending, up: true, color: '#10b981' },
                  { label: 'On Progress', count: kpi.shipped, up: true, color: '#6366f1' },
                  { label: 'Completed', count: kpi.delivered, up: true, color: '#10b981' },
                  { label: 'Return', count: kpi.returned, up: false, color: '#ef4444' },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-3xl text-white font-bold mb-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.count}
                    </div>
                    <div className="text-[11px] text-[#666] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {s.label}
                    </div>
                    <div
                      className="flex items-center gap-1 text-[10px]"
                      style={{ color: s.color, fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.up ? '+' : '-'}0.1%
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex gap-1 mb-5 rounded-full overflow-hidden" style={{ height: 8 }}>
                {[
                  { w: kpi.pending, color: '#6366f130' },
                  { w: kpi.shipped, color: '#6366f1' },
                  { w: kpi.delivered, color: '#4f46e5' },
                  { w: Math.max(kpi.returned, 1), color: '#1e1b4b' },
                ].map((s, i) => {
                  const total = kpi.totalOrders || 1;
                  return (
                    <div
                      key={i}
                      style={{ flex: s.w / total, background: s.color, minWidth: 4 }}
                      className="rounded-full"
                    />
                  );
                })}
              </div>

              {/* Recent orders table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Order ID', 'Customer', 'Qty Items', 'Amount', 'Payment Method', 'Status'].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-3 py-2.5 text-[#818cf8] text-xs font-mono" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {parseInt(order.id.replace(/-/g, '').slice(0, 6), 16) % 10000}
                        </td>
                        <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {order.customerName}
                        </td>
                        <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {(order as { items?: { quantity: number }[] }).items?.reduce((s, i) => s + i.quantity, 0) ?? 1} Items
                        </td>
                        <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {php(order.total)}
                        </td>
                        <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {order.paymentMethod}
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              order.status === 'delivered'
                                ? 'bg-[#10b981]/15 text-[#10b981]'
                                : order.status === 'shipped'
                                ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                                : 'bg-[#6366f1]/15 text-[#818cf8]'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {order.status === 'pending' ? 'New Order' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-3 py-8 text-center text-[#444] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          No orders yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              ANALYTICS TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* MoM Revenue */}
              <Panel title="Monthly Revenue Trend (2026)">
                <AnalyticsBarChart data={MONTHLY_CHART} />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Peak Month', value: 'JUN', color: '#10b981' },
                    { label: 'MoM Growth', value: `+${kpi.growthRate}%`, color: '#818cf8' },
                    { label: 'Target', value: '₱60k', color: '#f59e0b' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-lg text-center"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="text-lg font-bold" style={{ color: m.color, fontFamily: 'Inter, sans-serif' }}>
                        {m.value}
                      </div>
                      <div className="text-[10px] text-[#555] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Target Achievement */}
              <Panel title="Target Achievement">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative w-40 h-40 mb-4">
                    <svg viewBox="0 0 160 160" width="160" height="160">
                      <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
                      <circle
                        cx="80"
                        cy="80"
                        r="64"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="16"
                        strokeDasharray={`${(Math.min(kpi.targetAchievement, 100) / 100) * 2 * Math.PI * 64} ${2 * Math.PI * 64}`}
                        strokeDashoffset={2 * Math.PI * 64 * 0.25}
                        strokeLinecap="round"
                      />
                      <text x="80" y="75" textAnchor="middle" fontSize="26" fontWeight="800" fill="white" fontFamily="Inter, sans-serif">
                        {kpi.targetAchievement}%
                      </text>
                      <text x="80" y="95" textAnchor="middle" fontSize="10" fill="#555" fontFamily="Inter, sans-serif">
                        of ₱60,000 target
                      </text>
                    </svg>
                  </div>
                  <p className="text-[#888] text-sm text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {kpi.targetAchievement >= 100
                      ? '🎉 Monthly target exceeded!'
                      : `₱${(60000 - kpi.monthRevenue).toLocaleString()} remaining to hit target`}
                  </p>
                </div>
              </Panel>
            </div>

            {/* Best Sellers */}
            <Panel title="Top Selling Products">
              <div className="space-y-3">
                {(salesSummary?.best_sellers ?? []).map((p, i) => {
                  const maxRev = Math.max(...(salesSummary?.best_sellers ?? []).map((b) => b.revenue), 1);
                  return (
                    <div key={p.product_id} className="flex items-center gap-3">
                      <span
                        className="text-xs text-[#555] w-5 text-right shrink-0"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-[#ccc]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {p.name}
                          </span>
                          <span className="text-xs text-[#818cf8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {php(p.revenue)}
                          </span>
                        </div>
                        <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: 'rgba(255,255,255,0.06)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(p.revenue / maxRev) * 100}%`,
                              background: `hsl(${240 - i * 20}, 80%, 65%)`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-[10px] text-[#555] w-14 text-right shrink-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {p.total_sold} sold
                      </span>
                    </div>
                  );
                })}
                {!salesSummary?.best_sellers?.length && (
                  <p className="text-[#444] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>No data yet.</p>
                )}
              </div>
            </Panel>

            {/* Customer Satisfaction */}
            <div className="mt-6">
              <Panel title="Customer Satisfaction">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedback.map((fb, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-white font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {fb.customer_name}
                          </p>
                          <p className="text-[10px] text-[#555]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {new Date(fb.created_at).toLocaleDateString('en-PH')}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star
                              key={si}
                              className="w-3 h-3"
                              fill={si < fb.rating ? '#fbbf24' : 'none'}
                              stroke={si < fb.rating ? '#fbbf24' : '#444'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-[#aaa] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        "{fb.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              INVOICES TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="invoices">
            {invoiceOrder && (
              <InvoiceModal order={invoiceOrder as unknown as ApiOrder} onClose={() => setInvoiceOrder(null)} />
            )}
            <Panel title="Order Invoices">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input
                  value={invoiceSearch}
                  onChange={(e) => setInvoiceSearch(e.target.value)}
                  placeholder="Search by customer name or order ID..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/8 rounded-lg text-sm text-white placeholder:text-[#444] outline-none focus:border-[#6366f1]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Order ID', 'Customer', 'Email', 'Total', 'Payment', 'Status', 'Date', 'Action'].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-3"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-3 py-2.5 font-mono text-[#818cf8] text-xs">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {order.customerName}
                        </td>
                        <td className="px-3 py-2.5 text-[#666] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {order.customerEmail}
                        </td>
                        <td className="px-3 py-2.5 text-white text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {php(order.total)}
                        </td>
                        <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {order.paymentMethod}
                        </td>
                        <td className="px-3 py-2.5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-[#ccc] outline-none focus:border-[#6366f1]/50"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <option value="pending">pending</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                          </select>
                        </td>
                        <td className="px-3 py-2.5 text-[#666] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-PH')}
                        </td>
                        <td className="px-3 py-2.5">
                          <button
                            onClick={() => setInvoiceOrder(order as unknown as ApiOrder)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] text-[#818cf8] hover:text-white hover:bg-[#6366f1] transition-all"
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              background: 'rgba(99,102,241,0.12)',
                              border: '1px solid rgba(99,102,241,0.25)',
                            }}
                          >
                            <FileText className="w-3 h-3" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-8 text-center text-[#444] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              CALENDAR TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="calendar">
            <Panel title="Delivery Calendar & Milestones">
              <CalendarView events={calendarEvents} />
            </Panel>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              LOYALTY BADGES TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="loyalty">
            <Panel title="Customer Loyalty Rankings">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {(['Platinum', 'Gold', 'Silver', 'Bronze'] as const).map((badge) => {
                  const count = loyaltyCustomers.filter((c) => c.badge === badge).length;
                  return (
                    <div
                      key={badge}
                      className="p-4 rounded-xl text-center"
                      style={{ background: badgeBg[badge], border: `1px solid ${badgeColor[badge]}33` }}
                    >
                      <Award className="w-6 h-6 mx-auto mb-2" style={{ color: badgeColor[badge] }} />
                      <div className="text-2xl font-bold" style={{ color: badgeColor[badge], fontFamily: 'Inter, sans-serif' }}>
                        {count}
                      </div>
                      <div className="text-[11px] text-[#888] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {badge}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['#', 'Customer', 'Email', 'Total Spent', 'Orders', 'Badge'].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-3"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loyaltyCustomers.map((c, i) => (
                      <tr key={c.email} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-3 py-2.5 text-[#555] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{i + 1}</td>
                        <td className="px-3 py-2.5 text-[#ccc] text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{c.name}</td>
                        <td className="px-3 py-2.5 text-[#666] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{c.email}</td>
                        <td className="px-3 py-2.5 text-white text-xs font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {php(c.total_spent)}
                        </td>
                        <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{c.order_count}</td>
                        <td className="px-3 py-2.5">
                          <span
                            className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-bold"
                            style={{
                              background: badgeBg[c.badge],
                              color: badgeColor[c.badge],
                              border: `1px solid ${badgeColor[c.badge]}55`,
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            <Award className="w-3 h-3" />
                            {c.badge}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {loyaltyCustomers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-3 py-8 text-center text-[#444] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          No loyalty data yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              PRODUCTS TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="products" className="mt-0 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Panel title={editingId ? 'Edit Product' : 'Add Product'}>
              <div className="space-y-3">
                <AdminInput label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                <AdminInput label="Category" value={draft.category} onChange={(v) => setDraft({ ...draft, category: v })} />

                <div>
                  <span className="block text-[#666] text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Product Image
                  </span>
                  {(previewUrl || draft.image) && (
                    <div className="relative mb-2 w-full h-36 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <img src={previewUrl || draft.image} alt="Preview" className="max-h-full max-w-full object-contain p-2" />
                      <button onClick={clearImage} className="absolute top-1 right-1 bg-[#ef4444] text-white rounded-full p-0.5 hover:bg-red-700">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full py-2 border border-dashed border-[#6366f1]/50 text-[#818cf8] hover:bg-[#6366f1]/10 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 rounded-lg"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <ImagePlus className="w-4 h-4" />
                    {uploading ? 'Uploading...' : previewUrl || draft.image ? 'Change Image' : 'Upload Image'}
                  </button>
                  {uploadError && <p className="text-[#ef4444] text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{uploadError}</p>}
                </div>

                <AdminInput label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <AdminNumber label="Price" value={draft.price} onChange={(v) => setDraft({ ...draft, price: v })} />
                  <AdminNumber label="Stock" value={draft.stock} onChange={(v) => setDraft({ ...draft, stock: v })} />
                </div>
                {productError && <p className="text-[#ef4444] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{productError}</p>}
                <button
                  onClick={saveProduct}
                  disabled={uploading || savingProduct}
                  className="w-full py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Save className="w-4 h-4" />
                  {savingProduct ? 'Saving...' : editingId ? 'Save Product' : 'Add Product'}
                </button>
                {editingId && (
                  <button
                    onClick={resetDraft}
                    className="w-full py-2.5 border border-white/10 text-[#888] rounded-lg text-sm transition-colors hover:bg-white/5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </Panel>

            <div className="xl:col-span-2">
              <Panel title="Product Management">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        {['Image', 'Product', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                          <th key={h} className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-3 py-2.5">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                              ) : (
                                <ImagePlus className="w-4 h-4 text-[#555]" />
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{product.name}</td>
                          <td className="px-3 py-2.5 text-[#666] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{product.category}</td>
                          <td className="px-3 py-2.5 text-white text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{php(product.price)}</td>
                          <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{product.stock}</td>
                          <td className="px-3 py-2.5">
                            <div className="flex gap-2">
                              <button onClick={() => beginEdit(product)} className="p-1.5 rounded border border-[#6366f1]/40 text-[#818cf8] hover:bg-[#6366f1]/15 transition-colors">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deleteProduct(product.id)} className="p-1.5 rounded border border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444]/15 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              ORDERS TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="orders">
            <Panel title="Order Management">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Order', 'Customer', 'Payment', 'Total', 'Status'].map((h) => (
                        <th key={h} className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-8 text-center text-[#444] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          No orders yet. Checkout from the cart to create one.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-3 py-2.5 font-mono text-[#818cf8] text-xs">#{order.id.slice(0, 8)}</td>
                          <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{order.customerName}</td>
                          <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{order.paymentMethod}</td>
                          <td className="px-3 py-2.5 text-white text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{php(order.total)}</td>
                          <td className="px-3 py-2.5">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-[#ccc] outline-none focus:border-[#6366f1]/50"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <option value="pending">pending</option>
                              <option value="shipped">shipped</option>
                              <option value="delivered">delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              INVENTORY TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="inventory">
            <Panel title="Inventory Monitoring">
              {/* Low stock alerts */}
              {(salesSummary?.low_stock ?? []).length > 0 && (
                <div
                  className="flex items-start gap-3 mb-4 p-3 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <AlertTriangle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                  <p className="text-[#ef4444] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Low stock alert: {(salesSummary?.low_stock ?? []).map((p) => p.name).join(', ')} — restock immediately!
                  </p>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Product', 'Category', 'Stock', 'Status'].map((h) => (
                        <th key={h} className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{product.name}</td>
                        <td className="px-3 py-2.5 text-[#666] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{product.category}</td>
                        <td className="px-3 py-2.5 text-[#aaa] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{product.stock}</td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                              product.stock === 0
                                ? 'bg-[#ef4444]/15 text-[#ef4444]'
                                : product.stock <= 5
                                ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                                : 'bg-[#10b981]/15 text-[#10b981]'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {product.stock === 0 ? '✕ Out of Stock' : product.stock <= 5 ? '▲ Low Stock' : '● In Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              USERS TAB
          ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="users">
            <Panel title="User Management">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {['Name', 'Email', 'Role', 'Created'].map((h) => (
                        <th key={h} className="text-left text-[10px] text-[#555] uppercase tracking-wider px-3 py-3" style={{ fontFamily: 'Inter, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-3 py-2.5 text-[#ccc] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{u.name}</td>
                        <td className="px-3 py-2.5 text-[#666] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>{u.email}</td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                              u.role === 'admin'
                                ? 'bg-[#6366f1]/15 text-[#818cf8]'
                                : 'bg-white/6 text-[#888]'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[#555] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(u.createdAt).toLocaleDateString('en-PH')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Panel({
  title,
  className = '',
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-xl ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <h2
        className="px-5 py-4 text-white font-semibold border-b border-white/8"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {title}
      </h2>
      <div className="p-5">{children}</div>
    </section>
  );
}

function AdminInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span
        className="block text-[#666] text-xs uppercase tracking-wider mb-1"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#6366f1]/50"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'Inter, sans-serif',
        }}
      />
    </label>
  );
}

function AdminNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span
        className="block text-[#666] text-xs uppercase tracking-wider mb-1"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#6366f1]/50"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'Inter, sans-serif',
        }}
      />
    </label>
  );
}