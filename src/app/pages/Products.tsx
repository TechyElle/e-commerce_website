import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, Grid3X3, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export function Products() {
  const { products } = useStore();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(true);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : []);
  }, [initialCategory]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }, [products, selectedCategories, priceRange, sortBy]);

  return (
    <div className="bg-white">
      <section className="border-b border-black/10 bg-[#f6f7f8]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase text-[#db4444]">Xontrix catalog</p>
              <h1 className="text-4xl font-black text-[#111111]">All products</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666666]">
                Browse tested electronics for prototypes, class projects, robotics builds, repairs, and IoT work.
              </p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-black/10 rounded-sm border border-black/10 bg-white">
              {[
                [products.length, 'Items'],
                [categories.length, 'Categories'],
                [filteredAndSortedProducts.length, 'Showing'],
              ].map(([value, label]) => (
                <div key={label} className="px-5 py-4 text-center">
                  <p className="text-xl font-black text-[#111111]">{value}</p>
                  <p className="text-xs uppercase text-[#777777]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full flex-shrink-0 lg:w-72`}
        >
          <Card className="sticky top-28 overflow-hidden rounded-sm border border-black/10 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 text-lg font-black text-[#111111]">
                  <Filter className="w-5 h-5 text-[#db4444]" />
                  Filters
                </h2>
                {(selectedCategories.length > 0 ||
                  priceRange[0] !== 0 ||
                  priceRange[1] !== 3000) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 3000]);
                    }}
                    className="text-[#db4444] hover:text-[#111111] hover:bg-transparent"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-3 font-bold text-[#111111]">Categories</h3>
                <div className="space-y-2.5">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm cursor-pointer flex-1 text-[#4f4f4f] hover:text-[#111111]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {category}
                      </label>
                      <span
                        className="text-xs px-2 py-0.5 bg-[#f5f5f5] border border-black/10 text-[#7d8184] rounded-sm"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                      >
                        {products.filter((p) => p.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3 font-bold text-[#111111]">Price range</h3>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={3000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ₱{priceRange[0].toFixed(0)}
                    </span>
                    <span className="text-[#7d8184]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ₱{priceRange[1].toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-black/10 bg-[#f6f7f8] p-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden min-h-[44px] bg-transparent text-[#db4444] border border-[#db4444] hover:bg-[#db4444] hover:text-white rounded-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
            <div className="flex items-center gap-2">
              <Grid3X3 className="hidden h-4 w-4 text-[#777777] sm:block" />
              <span className="text-sm text-[#666666]">Sort by</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white border border-black/10 text-[#111111] rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-black/10">
                  <SelectItem value="featured" className="text-[#111111] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] focus:text-[#db4444]">Featured</SelectItem>
                  <SelectItem value="price-low" className="text-[#111111] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] focus:text-[#db4444]">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="text-[#111111] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] focus:text-[#db4444]">Price: High to Low</SelectItem>
                  <SelectItem value="rating" className="text-[#111111] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] focus:text-[#db4444]">Highest Rated</SelectItem>
                  <SelectItem value="name" className="text-[#111111] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] focus:text-[#db4444]">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={product.isNew ? 'new' : 'default'}
                  animDelay={i * 40}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-black/10 bg-[#f6f7f8] py-16 text-center">
              <p className="text-[#7d8184] text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                No products matched those filters.
              </p>
              <button
                className="cyber-button px-6 py-2 min-h-[44px]"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 3000]);
                }}
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
