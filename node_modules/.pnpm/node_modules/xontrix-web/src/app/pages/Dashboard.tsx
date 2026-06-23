import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Sparkles,
  AlertCircle,
  Activity,
  Brain,
  Zap,
  Target,
  Calendar,
  Truck,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// ─── Data ──────────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '₱346,580',
    change: 12.5,
    trend: 'up' as const,
    icon: DollarSign,
    sub: 'vs last month',
  },
  {
    id: 'orders',
    label: 'Orders Today',
    value: '47',
    change: 8.2,
    trend: 'up' as const,
    icon: ShoppingCart,
    sub: 'vs yesterday',
  },
  {
    id: 'avg',
    label: 'Avg. Order Value',
    value: '₱1,245',
    change: 5.3,
    trend: 'up' as const,
    icon: Activity,
    sub: 'vs last month',
  },
  {
    id: 'conv',
    label: 'Conversion Rate',
    value: '3.8%',
    change: -0.4,
    trend: 'down' as const,
    icon: Target,
    sub: 'vs last month',
  },
];

const monthlySales = [
  { label: 'Jan', value: 45000 },
  { label: 'Feb', value: 52000 },
  { label: 'Mar', value: 48000 },
  { label: 'Apr', value: 61000 },
  { label: 'May', value: 72000 },
  { label: 'Jun', value: 68000 },
];

const weeklySales = [
  { label: 'Wk 1', value: 15200 },
  { label: 'Wk 2', value: 18400 },
  { label: 'Wk 3', value: 16800 },
  { label: 'Wk 4', value: 21500 },
];

const trend30Days: number[] = [
  1850, 2100, 1920, 2350, 2800, 3100, 2750,
  2400, 2650, 2900, 3200, 3450, 2980, 2720,
  3100, 3350, 2900, 3150, 3480, 3800, 3600,
  3250, 3400, 3700, 4100, 3850, 3600, 3900, 4200, 4500,
];

const inventoryItems = [
  { id: 'p1', product: 'Arduino Uno R3', category: 'Microcontrollers', stock: 45, status: 'In Stock' },
  { id: 'p2', product: 'ESP32 Dev Board', category: 'Microcontrollers', stock: 8, status: 'Low' },
  { id: 'p3', product: 'Raspberry Pi 4 Model B', category: 'Microcontrollers', stock: 3, status: 'Critical' },
  { id: 'p4', product: 'DHT22 Temperature Sensor', category: 'Sensors', stock: 52, status: 'In Stock' },
  { id: 'p5', product: 'HC-SR04 Ultrasonic Sensor', category: 'Sensors', stock: 12, status: 'Low' },
  { id: 'p6', product: 'OLED Display 0.96"', category: 'Displays', stock: 28, status: 'In Stock' },
  { id: 'p7', product: 'L298N Motor Driver', category: 'Power', stock: 2, status: 'Critical' },
  { id: 'p8', product: 'LED Assortment 500pcs', category: 'Components', stock: 35, status: 'In Stock' },
  { id: 'p9', product: 'Breadboard 830 Points', category: 'Tools', stock: 7, status: 'Low' },
  { id: 'p10', product: 'NRF24L01+ Wireless', category: 'Wireless', stock: 19, status: 'In Stock' },
];

const categoryDistribution = [
  { name: 'Microcontrollers', value: 35, color: '#00BFDF' },
  { name: 'Sensors', value: 22, color: '#0dd3f5' },
  { name: 'Power', value: 15, color: '#f59e0b' },
  { name: 'Displays', value: 12, color: '#8b5cf6' },
  { name: 'Components', value: 10, color: '#10b981' },
  { name: 'Other', value: 6, color: '#6366f1' },
];

const financialMonthly = [
  { month: 'Jan', revenue: 45000, expenses: 28000 },
  { month: 'Feb', revenue: 52000, expenses: 31000 },
  { month: 'Mar', revenue: 48000, expenses: 29500 },
  { month: 'Apr', revenue: 61000, expenses: 35000 },
  { month: 'May', revenue: 72000, expenses: 42000 },
  { month: 'Jun', revenue: 68000, expenses: 39000 },
];

const totalRevenue = financialMonthly.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = financialMonthly.reduce((s, d) => s + d.expenses, 0);
const netProfit = totalRevenue - totalExpenses;

const transactions = [
  { date: 'May 02, 2026', orderId: '#XT-00847', customer: 'Juan dela Cruz', amount: 2850, status: 'Completed' },
  { date: 'May 02, 2026', orderId: '#XT-00846', customer: 'Maria Santos', amount: 1245, status: 'Processing' },
  { date: 'May 01, 2026', orderId: '#XT-00845', customer: 'Jose Reyes', amount: 580, status: 'Completed' },
  { date: 'May 01, 2026', orderId: '#XT-00844', customer: 'Ana Garcia', amount: 3480, status: 'Shipped' },
  { date: 'Apr 30, 2026', orderId: '#XT-00843', customer: 'Pedro Bautista', amount: 895, status: 'Completed' },
  { date: 'Apr 30, 2026', orderId: '#XT-00842', customer: 'Carmen Flores', amount: 165, status: 'Cancelled' },
  { date: 'Apr 29, 2026', orderId: '#XT-00841', customer: 'Rafael Torres', amount: 2120, status: 'Completed' },
];

const aiInsights = [
  {
    id: 'forecast',
    icon: TrendingUp,
    title: 'Sales Forecast',
    description:
      'Revenue is projected to reach ₱78,500 next week — a 15.4% increase based on seasonal trends and current cart volume.',
    accent: '#00BFDF',
    bg: 'rgba(0,191,223,0.08)',
    border: 'rgba(0,191,223,0.2)',
  },
  {
    id: 'restock',
    icon: AlertCircle,
    title: 'Restock Alert',
    description:
      'L298N Motor Driver (2 units) and Raspberry Pi 4 (3 units) will stock out within 3–5 days at current sell-through rate.',
    accent: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    id: 'peakday',
    icon: Calendar,
    title: 'Peak Day Prediction',
    description:
      'Saturday May 3, 2026 is predicted to be your peak sales day — expect 40% above-average order volume based on weekly patterns.',
    accent: '#00BFDF',
    bg: 'rgba(0,191,223,0.08)',
    border: 'rgba(0,191,223,0.2)',
  },
  {
    id: 'revenue-est',
    icon: Zap,
    title: 'Monthly Revenue Estimate',
    description:
      'May 2026 is on track to hit ₱285,000 total — up ₱23,000 vs April if the current order trend holds through the month end.',
    accent: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
];

// ─── Sub-components: Charts ────────────────────────────────────────────────────

function BarChartViz({
  data,
  color = '#00BFDF',
}: {
  data: { label: string; value: number }[];
  color?: string;
}) {
  const [tooltip, setTooltip] = useState<number | null>(null);
  const maxVal = Math.max(...data.map((d) => d.value));
  const chartH = 180;

  return (
    <div className="w-full select-none">
      <div className="flex gap-1 sm:gap-2">
        {/* Y-axis */}
        <div
          className="flex flex-col-reverse justify-between text-right pr-1"
          style={{ height: `${chartH}px`, minWidth: '36px' }}
        >
          {[0, 0.5, 1].map((t) => (
            <span
              key={t}
              className="text-[9px] text-[#444]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              ₱{((maxVal * t) / 1000).toFixed(0)}k
            </span>
          ))}
        </div>
        {/* Chart area */}
        <div className="flex-1 relative" style={{ height: `${chartH}px` }}>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((t) => (
            <div
              key={t}
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                bottom: `${t * 100}%`,
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}
            />
          ))}
          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-1 sm:gap-2">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex-1 relative cursor-pointer"
                style={{ height: `${(item.value / maxVal) * 100}%` }}
                onMouseEnter={() => setTooltip(i)}
                onMouseLeave={() => setTooltip(null)}
              >
                <div
                  className="w-full h-full transition-colors duration-150"
                  style={{
                    backgroundColor: tooltip === i ? '#00d4f5' : color,
                    boxShadow: tooltip === i ? `0 0 12px 2px ${color}50` : 'none',
                  }}
                />
                {tooltip === i && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0a0a0a] border border-[#00BFDF] px-2 py-0.5 text-[10px] text-white whitespace-nowrap z-30 pointer-events-none"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    ₱{item.value.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* X labels */}
      <div className="flex gap-1 sm:gap-2 mt-1" style={{ marginLeft: '37px' }}>
        {data.map((item, i) => (
          <div key={i} className="flex-1 text-center">
            <span
              className="text-[9px] sm:text-[10px] text-[#555]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChartSVG({ data }: { data: number[] }) {
  const vw = 600, vh = 160;
  const padL = 8, padR = 8, padT = 12, padB = 28;
  const cW = vw - padL - padR;
  const cH = vh - padT - padB;
  const minV = Math.min(...data);
  const maxV = Math.max(...data);
  const range = maxV - minV || 1;

  const toX = (i: number) => padL + (i / (data.length - 1)) * cW;
  const toY = (v: number) => padT + cH - ((v - minV) / range) * cH;

  const linePath = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(' ');
  const areaPath =
    linePath +
    ` L${toX(data.length - 1).toFixed(1)},${(padT + cH).toFixed(1)} L${toX(0).toFixed(1)},${(padT + cH).toFixed(1)} Z`;

  const dotIndexes = data.reduce<number[]>((acc, _, i) => {
    if (i % 5 === 0 || i === data.length - 1) acc.push(i);
    return acc;
  }, []);

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      width="100%"
      height="160"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00BFDF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00BFDF" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line
          key={i}
          x1={padL}
          y1={padT + t * cH}
          x2={vw - padR}
          y2={padT + t * cH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}
      {/* Vertical day lines */}
      {dotIndexes.map((idx) => (
        <line
          key={idx}
          x1={toX(idx)}
          y1={padT}
          x2={toX(idx)}
          y2={padT + cH}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
      ))}
      {/* Area */}
      <path d={areaPath} fill="url(#lineAreaGrad)" />
      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#00BFDF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots */}
      {dotIndexes.map((idx) => (
        <circle
          key={idx}
          cx={toX(idx)}
          cy={toY(data[idx])}
          r="3.5"
          fill="#00BFDF"
          stroke="#111111"
          strokeWidth="1.5"
        />
      ))}
      {/* X labels */}
      {dotIndexes.map((idx) => (
        <text
          key={idx}
          x={toX(idx)}
          y={vh - 5}
          textAnchor="middle"
          fontSize="10"
          fill="#444"
          fontFamily="Rajdhani, sans-serif"
        >
          D{idx + 1}
        </text>
      ))}
    </svg>
  );
}

function DonutChartSVG({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const [hov, setHov] = useState<number | null>(null);
  const cx = 100, cy = 100, r = 68, sw = 22;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);

  let cumulative = 0;
  const segs = data.map((seg) => {
    const arcLen = (seg.value / total) * circ;
    const rot = (cumulative / total) * 360;
    cumulative += seg.value;
    return { ...seg, arcLen, rot };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
      <div className="flex-shrink-0">
        <svg viewBox="0 0 200 200" width="180" height="180">
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={sw}
          />
          {segs.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={hov === i ? sw + 5 : sw}
              strokeDasharray={`${seg.arcLen} ${circ}`}
              strokeDashoffset={circ / 4}
              transform={`rotate(${seg.rot} ${cx} ${cy})`}
              style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            />
          ))}
          {hov !== null ? (
            <>
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                fontSize="20"
                fontWeight="700"
                fill="white"
                fontFamily="Orbitron, sans-serif"
              >
                {segs[hov].value}%
              </text>
              <text
                x={cx}
                y={cy + 14}
                textAnchor="middle"
                fontSize="8"
                fill="#aaa"
                fontFamily="Rajdhani, sans-serif"
              >
                {segs[hov].name.toUpperCase()}
              </text>
            </>
          ) : (
            <>
              <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontSize="11"
                fill="#555"
                fontFamily="Rajdhani, sans-serif"
              >
                STOCK
              </text>
              <text
                x={cx}
                y={cy + 14}
                textAnchor="middle"
                fontSize="11"
                fill="#555"
                fontFamily="Rajdhani, sans-serif"
              >
                SPLIT
              </text>
            </>
          )}
        </svg>
      </div>
      <div className="flex flex-col gap-2.5 w-full sm:w-auto">
        {data.map((seg, i) => (
          <div
            key={i}
            className="flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            <div
              className="w-3 h-3 flex-shrink-0 transition-all duration-150"
              style={{
                backgroundColor: seg.color,
                boxShadow: hov === i ? `0 0 8px ${seg.color}` : 'none',
              }}
            />
            <span
              className="text-sm text-[#aaaaaa] flex-1"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {seg.name}
            </span>
            <span
              className="text-sm text-white"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
            >
              {seg.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupedBarChartViz({
  data,
}: {
  data: { month: string; revenue: number; expenses: number }[];
}) {
  const [hov, setHov] = useState<{ i: number; t: 'r' | 'e' } | null>(null);
  const maxV = Math.max(...data.flatMap((d) => [d.revenue, d.expenses]));
  const chartH = 180;

  return (
    <div className="w-full select-none">
      <div className="flex gap-1 sm:gap-2">
        {/* Y-axis */}
        <div
          className="flex flex-col-reverse justify-between text-right pr-1"
          style={{ height: `${chartH}px`, minWidth: '36px' }}
        >
          {[0, 0.5, 1].map((t) => (
            <span
              key={t}
              className="text-[9px] text-[#444]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              ₱{((maxV * t) / 1000).toFixed(0)}k
            </span>
          ))}
        </div>
        {/* Bars */}
        <div className="flex-1 relative" style={{ height: `${chartH}px` }}>
          {[0.25, 0.5, 0.75, 1].map((t) => (
            <div
              key={t}
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                bottom: `${t * 100}%`,
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-3">
            {data.map((item, i) => (
              <div key={i} className="flex-1 flex items-end gap-0.5 h-full">
                {/* Revenue */}
                <div
                  className="flex-1 relative cursor-pointer transition-colors duration-150"
                  style={{
                    height: `${(item.revenue / maxV) * 100}%`,
                    backgroundColor:
                      hov?.i === i && hov?.t === 'r' ? '#00d4f5' : '#00BFDF',
                    boxShadow:
                      hov?.i === i && hov?.t === 'r' ? '0 0 10px #00BFDF70' : 'none',
                    minHeight: '3px',
                  }}
                  onMouseEnter={() => setHov({ i, t: 'r' })}
                  onMouseLeave={() => setHov(null)}
                >
                  {hov?.i === i && hov?.t === 'r' && (
                    <div
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-[#00BFDF] px-1.5 py-0.5 text-[10px] text-white whitespace-nowrap z-30 pointer-events-none"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      ₱{item.revenue.toLocaleString()}
                    </div>
                  )}
                </div>
                {/* Expenses */}
                <div
                  className="flex-1 relative cursor-pointer transition-colors duration-150"
                  style={{
                    height: `${(item.expenses / maxV) * 100}%`,
                    backgroundColor:
                      hov?.i === i && hov?.t === 'e' ? '#ff6b6b' : '#ef4444',
                    boxShadow:
                      hov?.i === i && hov?.t === 'e' ? '0 0 10px #ef444460' : 'none',
                    minHeight: '3px',
                  }}
                  onMouseEnter={() => setHov({ i, t: 'e' })}
                  onMouseLeave={() => setHov(null)}
                >
                  {hov?.i === i && hov?.t === 'e' && (
                    <div
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-[#ef4444] px-1.5 py-0.5 text-[10px] text-white whitespace-nowrap z-30 pointer-events-none"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      ₱{item.expenses.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* X labels */}
      <div className="flex gap-1.5 sm:gap-3 mt-1" style={{ marginLeft: '37px' }}>
        {data.map((item, i) => (
          <div key={i} className="flex-1 text-center">
            <span
              className="text-[9px] sm:text-[10px] text-[#555]"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {item.month}
            </span>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex gap-5 mt-3" style={{ marginLeft: '37px' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#00BFDF]" />
          <span className="text-xs text-[#aaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Revenue
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#ef4444]" />
          <span className="text-xs text-[#aaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Expenses
          </span>
        </div>
      </div>
    </div>
  );
}

function PulsingDot({ color = '#00BFDF' }: { color?: string }) {
  return (
    <div className="relative flex-shrink-0 w-2.5 h-2.5 mt-0.5">
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-60"
        style={{ backgroundColor: color }}
      />
      <div className="relative w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'In Stock': 'text-[#10b981] border-[#10b981]',
    Low: 'text-[#f59e0b] border-[#f59e0b]',
    Critical: 'text-[#ef4444] border-[#ef4444]',
  };
  return (
    <span
      className={`px-2 py-0.5 text-[11px] border rounded-none ${styles[status] ?? 'text-[#aaa] border-[#aaa]'}`}
      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}
    >
      {status === 'In Stock' ? '● IN STOCK' : status === 'Low' ? '▲ LOW' : '✕ CRITICAL'}
    </span>
  );
}

function TxStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    Completed: { label: 'COMPLETED', cls: 'text-[#10b981] border-[#10b981]' },
    Processing: { label: 'PROCESSING', cls: 'text-[#00BFDF] border-[#00BFDF]' },
    Shipped: { label: 'SHIPPED', cls: 'text-[#f59e0b] border-[#f59e0b]' },
    Cancelled: { label: 'CANCELLED', cls: 'text-[#ef4444] border-[#ef4444]' },
  };
  const { label, cls } = map[status] ?? { label: status, cls: 'text-[#aaa] border-[#aaa]' };
  return (
    <span
      className={`px-2 py-0.5 text-[10px] border ${cls}`}
      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
    >
      {label}
    </span>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export function Dashboard() {
  const { isAdmin, loading } = useAuth();
  const { products, orders } = useStore();

  const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly');
  const [restocked, setRestocked] = useState<Set<string>>(new Set());

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00BFDF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const criticalItems = products.filter((p) => p.stock === 0);
  const lowItems = products.filter((p) => p.stock > 0 && p.stock <= 5);

  const salesData = period === 'monthly' ? monthlySales : weeklySales;

  return (

    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1
              className="text-3xl sm:text-4xl text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              BUSINESS DASHBOARD
            </h1>
            <Badge className="bg-transparent text-[#00BFDF] border border-[#00BFDF]">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-POWERED
            </Badge>
          </div>
          <p className="text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Real-time analytics & AI-driven insights for Xontrix Electronics — updated May 2, 2026
          </p>
        </div>

        {/* ── Low-stock Alert Banner ──────────────────────────────────────── */}
        {criticalItems.length > 0 && (
          <div className="mb-6 flex items-start gap-3 bg-[#1a0a0a] border border-[#ef4444] px-4 py-3">
            <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
            <div>
              <p
                className="text-[#ef4444] text-sm"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
              >
                ⚠ CRITICAL STOCK ALERT
              </p>
              <p className="text-[#aaaaaa] text-xs mt-0.5" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {criticalItems.map((i) => i.product).join(' & ')} are critically low — immediate restocking
                required to avoid stockouts.
              </p>
            </div>
          </div>
        )}

        {/* ── KPI Cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((card) => (
            <Card
              key={card.id}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] hover:border-[#00BFDF] transition-colors duration-200"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs text-[#888]"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}
                  >
                    {card.label.toUpperCase()}
                  </span>
                  <div className="w-8 h-8 border border-[#00BFDF] flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-4 h-4 text-[#00BFDF]" />
                  </div>
                </div>
                <div
                  className="text-2xl sm:text-3xl text-white mb-1"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  {card.value}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${card.trend === 'up' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {card.trend === 'up' ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {card.trend === 'up' ? '+' : ''}
                    {card.change}% {card.sub}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Main Tabs ───────────────────────────────────────────────────── */}
        <Tabs defaultValue="sales" className="mb-8">
          <TabsList className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] h-auto flex-wrap gap-0">
            {[
              { value: 'sales', label: 'SALES ANALYTICS' },
              { value: 'inventory', label: 'INVENTORY' },
              { value: 'financial', label: 'FINANCIAL' },
              { value: 'ai', label: 'AI INSIGHTS' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-[#00BFDF] data-[state=active]:text-black text-[#888] px-3 sm:px-5 py-2 text-xs"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, letterSpacing: '0.04em' }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Sales Analytics ─────────────────────────────────────────── */}
          <TabsContent value="sales" className="mt-6 space-y-6">
            {/* Bar Chart */}
            <Card className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)]">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle
                    className="text-white text-base sm:text-lg"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                  >
                    {period === 'monthly' ? 'MONTHLY' : 'WEEKLY'} SALES REVENUE
                  </CardTitle>
                  <div className="flex gap-0">
                    {(['monthly', 'weekly'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-1 text-[11px] border transition-colors duration-150 ${
                          period === p
                            ? 'bg-[#00BFDF] text-black border-[#00BFDF]'
                            : 'text-[#666] border-[rgba(255,255,255,0.08)] hover:border-[#00BFDF] hover:text-[#00BFDF]'
                        }`}
                        style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
                      >
                        {p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <BarChartViz data={salesData} />
              </CardContent>
            </Card>

            {/* 30-Day Line Chart */}
            <Card className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)]">
              <CardHeader className="pb-2">
                <CardTitle
                  className="text-white text-base sm:text-lg"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                >
                  30-DAY SALES TREND
                </CardTitle>
                <p className="text-[#666] text-xs mt-0.5" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Daily revenue (₱) — April 3 to May 2, 2026
                </p>
              </CardHeader>
              <CardContent className="pt-2">
                {/* Y-axis labels */}
                <div className="flex gap-2 items-start mb-1">
                  <div
                    className="flex flex-col justify-between text-right"
                    style={{ height: '160px', minWidth: '36px' }}
                  >
                    {[4500, 3000, 1500].map((v) => (
                      <span
                        key={v}
                        className="text-[9px] text-[#444]"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        ₱{(v / 1000).toFixed(1)}k
                      </span>
                    ))}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <LineChartSVG data={trend30Days} />
                  </div>
                </div>
                {/* Summary row */}
                <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  {[
                    { label: 'Peak Day', value: '₱4,500', sub: 'May 2' },
                    { label: 'Lowest Day', value: '₱1,850', sub: 'Apr 3' },
                    { label: '30-Day Total', value: '₱97,850', sub: 'All time' },
                    { label: 'Daily Average', value: '₱3,262', sub: 'Per day' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p
                        className="text-[10px] text-[#555] uppercase"
                        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.06em' }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="text-sm text-[#00BFDF]"
                        style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Inventory ──────────────────────────────────────────────────── */}
          <TabsContent value="inventory" className="mt-6 space-y-6">
            {/* Low stock warning */}
            {lowItems.length > 0 && (
              <div className="flex items-start gap-3 bg-[#1a1500] border border-[#f59e0b] px-4 py-3">
                <AlertCircle className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <p className="text-[#f59e0b] text-xs" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                  {lowItems.length} product{lowItems.length > 1 ? 's' : ''} need attention:{' '}
                  {lowItems.map((i) => i.product).join(', ')}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Inventory Table */}
              <div className="xl:col-span-2">
                <Card className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)]">
                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-white text-base sm:text-lg"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                    >
                      INVENTORY STATUS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr
                            className="border-b border-[rgba(255,255,255,0.06)]"
                            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
                          >
                            {['PRODUCT', 'CATEGORY', 'STOCK', 'STATUS', 'ACTION'].map((col) => (
                              <th
                                key={col}
                                className="text-left text-[10px] text-[#555] px-4 sm:px-6 py-3 tracking-wider"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItems.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,191,223,0.03)] transition-colors"
                            >
                              <td
                                className="px-4 sm:px-6 py-3 text-white text-xs sm:text-sm"
                                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                              >
                                {item.product}
                              </td>
                              <td
                                className="px-4 sm:px-6 py-3 text-[#666] text-xs"
                                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                              >
                                {item.category}
                              </td>
                              <td
                                className="px-4 sm:px-6 py-3 text-xs"
                                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                              >
                                <span
                                  className={
                                    item.stock <= 3
                                      ? 'text-[#ef4444]'
                                      : item.stock <= 12
                                      ? 'text-[#f59e0b]'
                                      : 'text-white'
                                  }
                                >
                                  {item.stock}
                                </span>
                                <span className="text-[#444] text-[10px] ml-1">units</span>
                              </td>
                              <td className="px-4 sm:px-6 py-3">
                                <StatusPill status={item.status} />
                              </td>
                              <td className="px-4 sm:px-6 py-3">
                                {item.status !== 'In Stock' && (
                                  <button
                                    onClick={() =>
                                      setRestocked((prev) => new Set([...prev, item.id]))
                                    }
                                    className={`px-3 py-1 text-[10px] border transition-all duration-200 ${
                                      restocked.has(item.id)
                                        ? 'border-[#10b981] text-[#10b981] cursor-default'
                                        : 'border-[#00BFDF] text-[#00BFDF] hover:bg-[#00BFDF] hover:text-black'
                                    }`}
                                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
                                    disabled={restocked.has(item.id)}
                                  >
                                    {restocked.has(item.id) ? '✓ ORDERED' : 'RESTOCK'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Donut Chart */}
              <div>
                <Card className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] h-full">
                  <CardHeader className="pb-3">
                    <CardTitle
                      className="text-white text-base"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                    >
                      STOCK BY CATEGORY
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-4">
                    <DonutChartSVG data={categoryDistribution} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── Financial ─────────────────────────────────────────────────── */}
          <TabsContent value="financial" className="mt-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: 'TOTAL REVENUE',
                  value: `₱${totalRevenue.toLocaleString()}`,
                  sub: 'Jan – Jun 2026',
                  color: '#00BFDF',
                  border: 'border-[#00BFDF]',
                  bg: 'bg-[rgba(0,191,223,0.06)]',
                  icon: TrendingUp,
                },
                {
                  label: 'TOTAL EXPENSES',
                  value: `₱${totalExpenses.toLocaleString()}`,
                  sub: 'Jan – Jun 2026',
                  color: '#ef4444',
                  border: 'border-[#ef4444]',
                  bg: 'bg-[rgba(239,68,68,0.06)]',
                  icon: TrendingDown,
                },
                {
                  label: 'NET PROFIT',
                  value: `₱${netProfit.toLocaleString()}`,
                  sub: `${((netProfit / totalRevenue) * 100).toFixed(1)}% margin`,
                  color: '#10b981',
                  border: 'border-[#10b981]',
                  bg: 'bg-[rgba(16,185,129,0.06)]',
                  icon: Sparkles,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`${card.bg} border ${card.border} p-5`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] tracking-wider"
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: 700,
                        color: card.color,
                      }}
                    >
                      {card.label}
                    </span>
                    <card.icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <div
                    className="text-2xl sm:text-3xl text-white mb-1"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                  >
                    {card.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: 'Rajdhani, sans-serif', color: '#666' }}
                  >
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Grouped Bar Chart */}
            <Card className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)]">
              <CardHeader className="pb-2">
                <CardTitle
                  className="text-white text-base sm:text-lg"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                >
                  REVENUE VS EXPENSES
                </CardTitle>
                <p
                  className="text-[#555] text-xs mt-0.5"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Monthly comparison — hover bars for exact values
                </p>
              </CardHeader>
              <CardContent className="pt-4">
                <GroupedBarChartViz data={financialMonthly} />
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)]">
              <CardHeader className="pb-3">
                <CardTitle
                  className="text-white text-base sm:text-lg"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                >
                  RECENT TRANSACTIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[rgba(255,255,255,0.06)]">
                        {['DATE', 'ORDER ID', 'CUSTOMER', 'AMOUNT', 'STATUS'].map((col) => (
                          <th
                            key={col}
                            className="text-left text-[10px] text-[#555] px-4 sm:px-6 py-3 tracking-wider"
                            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr
                          key={tx.orderId}
                          className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,191,223,0.03)] transition-colors"
                        >
                          <td
                            className="px-4 sm:px-6 py-3 text-[#555] text-xs whitespace-nowrap"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {tx.date}
                          </td>
                          <td
                            className="px-4 sm:px-6 py-3 text-[#00BFDF] text-xs whitespace-nowrap"
                            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                          >
                            {tx.orderId}
                          </td>
                          <td
                            className="px-4 sm:px-6 py-3 text-white text-xs whitespace-nowrap"
                            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                          >
                            {tx.customer}
                          </td>
                          <td
                            className="px-4 sm:px-6 py-3 text-white text-xs whitespace-nowrap"
                            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
                          >
                            ₱{tx.amount.toLocaleString()}
                          </td>
                          <td className="px-4 sm:px-6 py-3">
                            <TxStatusBadge status={tx.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── AI Insights ───────────────────────────────────────────────── */}
          <TabsContent value="ai" className="mt-6">
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-[#00BFDF] flex items-center justify-center">
                <Brain className="w-4 h-4 text-[#00BFDF]" />
              </div>
              <div>
                <h2
                  className="text-lg text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  AI-POWERED INSIGHTS
                </h2>
                <p
                  className="text-xs text-[#555]"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Predictions generated from sales patterns, inventory data & market trends
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="border p-5 hover:scale-[1.01] transition-transform duration-200 cursor-default"
                  style={{
                    backgroundColor: insight.bg,
                    borderColor: insight.border,
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <PulsingDot color={insight.accent} />
                    <div className="flex items-center gap-2">
                      <insight.icon
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: insight.accent }}
                      />
                      <h3
                        className="text-sm text-white"
                        style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          fontWeight: 700,
                          letterSpacing: '0.03em',
                        }}
                      >
                        {insight.title.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="text-sm text-[#aaaaaa] leading-relaxed pl-5"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {insight.description}
                  </p>
                  <div className="mt-3 pl-5">
                    <div
                      className="h-px w-full opacity-20"
                      style={{ backgroundColor: insight.accent }}
                    />
                    <div
                      className="h-px mt-px"
                      style={{
                        width: '30%',
                        backgroundColor: insight.accent,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI disclaimer */}
            <div className="mt-5 flex items-center gap-2 px-4 py-3 bg-[#141414] border border-[rgba(255,255,255,0.05)]">
              <Sparkles className="w-3.5 h-3.5 text-[#444] flex-shrink-0" />
              <p className="text-[10px] text-[#444]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                AI insights are generated based on historical sales data, inventory trends, and seasonal
                patterns. Predictions are estimates and should be used alongside manual review.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Bottom Quick Stats ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { label: 'Active Products', value: '28', icon: Package, color: '#00BFDF' },
            { label: 'Total Customers', value: '2,847', icon: Users, color: '#00BFDF' },
            { label: 'Pending Orders', value: '14', icon: Clock, color: '#f59e0b' },
            { label: 'Shipped Today', value: '8', icon: Truck, color: '#10b981' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141414] border border-[rgba(255,255,255,0.06)] p-4 flex items-center gap-3"
            >
              <stat.icon className="w-5 h-5 flex-shrink-0" style={{ color: stat.color }} />
              <div>
                <div
                  className="text-white text-lg"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[#555] text-[10px] uppercase tracking-wide"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
