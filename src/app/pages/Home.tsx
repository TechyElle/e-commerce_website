import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  Flame,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import arduinoHero from '../../imports/Products/Products/Arduino Uno r3.png';
import espHero from '../../imports/Products/Products/Esp32 38pins.png';
import kitHero from '../../imports/Products/Products/Electronic Kit.png';
import sensorHero from '../../imports/Products/Products/IR Sensor.png';

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
  'Microcontrollers',
  'Sensors',
  'Displays',
  'Power',
  'Connectors',
  'Tools',
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
          <span className="min-w-[42px] rounded-sm bg-white px-2 py-1 text-center text-lg font-extrabold text-[#db4444]">
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
      categories.map((category) => ({
        category,
        count: products.filter((product) => product.category === category).length,
      })),
    []
  );

  return (
    <div className="bg-white">
      <section className="border-b border-black/10 bg-[#f6f7f8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
          <div className="flex min-h-[520px] flex-col justify-between overflow-hidden rounded-sm bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Badge className="rounded-sm border border-white/20 bg-white/10 text-white hover:bg-white/10">
                  XONTRIX ELECTRONICS
                </Badge>
                <span className="text-sm text-white/60">Reliable components for real builds</span>
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Build faster with electronics that are ready to ship.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                Shop microcontrollers, sensors, displays, power modules, and kits curated for students,
                makers, repair work, and rapid prototyping.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/products"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-[#db4444] px-6 text-sm font-bold text-white transition hover:bg-[#c73939]"
                >
                  Shop products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products?category=Microcontrollers"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/10"
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
                <div key={label}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs uppercase text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[320px] overflow-hidden rounded-sm border border-black/10 bg-white p-6 shadow-sm">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#db4444]" />
              <div className="relative z-10 max-w-[14rem] sm:max-w-[15rem]">
                <Badge className="mb-3 rounded-sm bg-[#fff1f1] text-[#db4444] hover:bg-[#fff1f1]">
                  Best seller
                </Badge>
                <h2 className="text-3xl font-black leading-tight text-[#111111]">
                  {heroProduct.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#666666]">{heroProduct.description}</p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-3xl font-black text-[#db4444]">
                    PHP {heroProduct.price.toFixed(0)}
                  </span>
                  <span className="pb-1 text-sm text-[#777777]">{heroProduct.rating} rating</span>
                </div>
              </div>
              <img
                src={espHero}
                alt={heroProduct.name}
                className="relative mt-5 h-32 w-full object-contain sm:absolute sm:bottom-4 sm:right-4 sm:mt-0 sm:h-[58%] sm:max-h-64 sm:w-[46%] lg:w-[42%]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {heroItems.map((item) => (
                <Link
                  key={item.label}
                  to="/products"
                  className="group flex min-h-[142px] items-center justify-between overflow-hidden rounded-sm border border-black/10 bg-white p-4 transition hover:border-[#db4444] hover:shadow-lg hover:shadow-black/5"
                >
                  <span className="text-sm font-bold text-[#111111] group-hover:text-[#db4444]">
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
              <Icon className="mb-4 h-6 w-6 text-[#db4444]" />
              <h3 className="text-base font-bold text-[#111111]">{label}</h3>
              <p className="mt-1 text-sm leading-6 text-[#666666]">{detail}</p>
            </div>
          ))}
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
          {categoryCounts.map(({ category, count }) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="rounded-sm border border-black/10 bg-[#f6f7f8] p-4 transition hover:border-[#db4444] hover:bg-white"
            >
              <p className="text-sm font-extrabold text-[#111111]">{category}</p>
              <p className="mt-2 text-xs uppercase text-[#777777]">{count} items</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#db4444]">
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
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm bg-white px-5 text-sm font-bold text-[#111111] transition hover:bg-[#f1f1f1]"
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
