import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Cpu,
  Clock,
  Flame,
  Gauge,
  Layers3,
  MonitorSmartphone,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import arduinoHero from '../../assets/products/Arduino Uno r3.png';
import espHero from '../../assets/products/Esp32 38pins.png';
import kitHero from '../../assets/products/Electronic Kit.png';
import sensorHero from '../../assets/products/IR Sensor.png';
import uniPhoto1 from '../../assets/top_universities/1.png';
import uniPhoto2 from '../../assets/top_universities/2.png';
import uniPhoto3 from '../../assets/top_universities/3.png';
import uniPhoto4 from '../../assets/top_universities/4.png';
import uniPhoto5 from '../../assets/top_universities/5.png';

const heroItems = [
  { label: 'Arduino-ready', image: arduinoHero },
  { label: 'ESP32 IoT', image: espHero },
  { label: 'Starter kits', image: kitHero },
  { label: 'Sensor modules', image: sensorHero },
];

const featureTiles = [
  { icon: Truck, label: 'Same-day dispatch', detail: 'For confirmed Metro Manila orders before noon' },
  { icon: ShieldCheck, label: 'Tested parts', detail: 'Boards and modules are checked before packing' },
  { icon: PackageCheck, label: 'Project bundles', detail: 'Starter sets for school, lab, and hobby builds' },
  { icon: BadgeCheck, label: 'Local support', detail: 'Philippines-based electronics assistance' },
];

const categories = [
  { name: 'Microcontrollers', icon: Cpu, detail: 'Arduino, ESP32, Raspberry Pi, STM32' },
  { name: 'Sensors', icon: Gauge, detail: 'Temperature, distance, motion, pressure' },
  { name: 'Displays', icon: MonitorSmartphone, detail: 'OLED, LCD, character displays' },
  { name: 'Motor Control', icon: Zap, detail: 'Motor drivers, relay modules, servos' },
  { name: 'Connectors', icon: Layers3, detail: 'Jumper wires, USB breakouts, headers' },
  { name: 'Tools', icon: SlidersHorizontal, detail: 'Breadboards, shields, prototyping kits' },
];

const universities = [
  {
    name: 'Technological University of the Philippines',
    abbreviation: 'TUP',
    photo: uniPhoto1,
  },
  {
    name: 'Systems Technology Institute',
    abbreviation: 'STI',
    photo: uniPhoto2,
  },
  {
    name: 'Polytechnic University of the Philippines',
    abbreviation: 'PUP',
    photo: uniPhoto3,
  },
  {
    name: 'Quezon City University',
    abbreviation: 'QCU',
    photo: uniPhoto4,
  },
  {
    name: 'National University',
    abbreviation: 'NU',
    photo: uniPhoto5,
  },
];

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((value, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="min-w-[42px] rounded-md bg-white px-2 py-1 text-center text-lg font-extrabold text-[#db4444] shadow-sm">
            {String(value).padStart(2, '0')}
          </span>
          {index < 2 && <span className="font-bold text-white/50">:</span>}
        </span>
      ))}
    </div>
  );
}

export function Home() {
  const featuredProducts = products.filter((p) => !p.isSale).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const saleProducts = products.filter((p) => p.isSale).slice(0, 6);
  const heroProduct = products[1];

  const categoryCounts = useMemo(
    () =>
      categories.map(({ name, icon, detail }) => ({
        category: name,
        icon,
        detail,
        count: products.filter((product) => product.category === name).length,
      })),
    []
  );

  return (
    <div className="bg-white text-[#111111]">
      <section className="border-b border-black/10 bg-[#eef3f7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
          <div className="xontrix-hero-surface flex min-h-[520px] flex-col justify-between overflow-hidden rounded-lg p-6 text-white sm:p-8 lg:p-10">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Badge className="rounded-md border border-white/20 bg-white/10 text-white hover:bg-white/10">
                  XONTRIX ELECTRONICS
                </Badge>
                <span className="text-sm text-white/70">Reliable components for real builds</span>
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Build faster with electronics that are ready to ship.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Shop microcontrollers, sensors, displays, power modules, and kits curated for students,
                makers, repair work, and rapid prototyping.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/products"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#db4444] px-6 text-sm font-bold text-white shadow-lg shadow-[#db4444]/20 transition hover:bg-[#c73939] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Shop products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products?category=Microcontrollers"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Browse boards
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {[
                ['28+', 'Products'],
                ['4.8', 'Avg rating'],
                ['PHP 999', 'Free ship'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-md bg-white/[0.06] p-3 ring-1 ring-white/10">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs uppercase text-white/55">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="tech-card relative min-h-[320px] overflow-hidden rounded-lg border border-black/10 bg-white p-6 shadow-sm">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#db4444] via-[#1d7dff] to-[#00a76f]" />
              <div className="relative z-10 grid h-full gap-5 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center lg:grid-cols-[minmax(0,1fr)_170px]">
                <div className="min-w-0">
                  <Badge className="mb-3 rounded-md bg-[#fff1f1] text-[#db4444] hover:bg-[#fff1f1]">
                    Best seller
                  </Badge>
                  <h2 className="text-2xl font-black leading-tight text-[#111111] sm:text-3xl">
                    {heroProduct.name}
                  </h2>
                  <p className="mt-3 line-clamp-5 text-sm leading-6 text-[#666666] sm:line-clamp-6">
                    {heroProduct.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-end gap-3">
                    <span className="text-2xl font-black text-[#db4444] sm:text-3xl">
                      PHP {heroProduct.price.toFixed(0)}
                    </span>
                    <span className="pb-1 text-sm text-[#777777]">{heroProduct.rating} rating</span>
                  </div>
                </div>
                <div className="flex h-32 items-center justify-center rounded-md bg-[#eef3f7] p-3 sm:h-44 lg:h-48">
                  <img
                    src={espHero}
                    alt={heroProduct.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {heroItems.map((item) => (
                <Link
                  key={item.label}
                  to="/products"
                  className="group flex min-h-[142px] items-center justify-between overflow-hidden rounded-lg border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#1d7dff] hover:shadow-lg hover:shadow-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d7dff]"
                >
                  <span className="text-sm font-bold text-[#111111] group-hover:text-[#1d7dff]">
                    {item.label}
                  </span>
                  <img src={item.image} alt="" className="h-20 w-20 object-contain transition group-hover:scale-105" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-black/10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {featureTiles.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="bg-white py-6 sm:px-6">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#fff1f1]">
                <Icon className="h-5 w-5 text-[#db4444]" />
              </span>
              <h3 className="text-base font-bold text-[#111111]">{label}</h3>
              <p className="mt-1 text-sm leading-6 text-[#666666]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Universities Section */}
      <section className="border-b border-black/10 bg-[#f8fafc] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <p className="mb-2 text-sm font-bold uppercase text-[#db4444]">Campuses We Service</p>
            <h2 className="text-3xl font-black text-[#111111]">Top 5 schools we deliver to.</h2>
            <p className="mt-2 text-sm text-[#666666]">Get your prototyping parts delivered directly to your campus with zero hassle.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {universities.map((uni) => (
              <div
                key={uni.abbreviation}
                className="group relative h-80 overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={uni.photo}
                  alt={`${uni.name} campus`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-[#db4444]">Shop by category</p>
            <h2 className="text-3xl font-black text-[#111111]">Find the part by project type.</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#db4444]">
            View catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categoryCounts.map(({ category, icon: Icon, detail, count }) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="group rounded-lg border border-black/10 bg-[#f6f7f8] p-4 transition hover:-translate-y-0.5 hover:border-[#1d7dff] hover:bg-white hover:shadow-lg hover:shadow-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d7dff]"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#1d7dff] ring-1 ring-black/10 transition group-hover:bg-[#1d7dff] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-extrabold text-[#111111]">{category}</p>
              <p className="mt-1 text-xs text-[#666666]">{detail}</p>
              <p className="mt-3 text-xs uppercase text-[#777777]">{count} items</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="deal-band py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#db4444]">
              <Flame className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase text-[#ffb3b3]">Sulit deal</p>
              <h2 className="text-3xl font-black text-white">Limited-time component bundles</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
                Stock up on essentials for labs, repairs, and weekend builds while the deal timer is running.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Countdown />
            <Link
              to="/products"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-[#111111] transition hover:bg-[#f1f1f1]"
            >
              Grab deals
              <Zap className="h-4 w-4 text-[#db4444]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-[#db4444]">
              <Sparkles className="h-4 w-4" /> Featured picks
            </p>
            <h2 className="text-3xl font-black text-[#111111]">Popular parts for active builders.</h2>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777777]" />
            <Link
              to="/products"
              className="block h-11 rounded-sm border border-black/10 bg-[#f6f7f8] py-3 pl-10 pr-4 text-sm text-[#777777] transition hover:border-[#db4444]"
            >
              Search Arduino, ESP32, sensors...
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} variant={product.isNew ? 'new' : 'default'} animDelay={index * 25} />
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f6f7f8] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-[#db4444]">
              <Clock className="h-4 w-4" /> New arrivals
            </p>
            <h2 className="text-3xl font-black text-[#111111]">Fresh modules for your next prototype.</h2>
            <p className="mt-4 text-sm leading-6 text-[#666666]">
              Keep your bench updated with the newest boards, wireless modules, drivers, and compact power parts.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm bg-[#111111] px-5 text-sm font-bold text-white transition hover:bg-[#db4444]"
            >
              See what is new
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} variant="new" animDelay={index * 30} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-[#db4444]">Deal shelf</p>
            <h2 className="text-3xl font-black text-[#111111]">Small parts, sharper prices.</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#db4444]">
            View all deals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {saleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} variant="default" animDelay={index * 25} />
          ))}
        </div>
      </section>
    </div>
  );
}
