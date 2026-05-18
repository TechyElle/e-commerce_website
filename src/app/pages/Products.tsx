import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Filter, SlidersHorizontal } from 'lucide-react';
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(true);

  const categories = Array.from(new Set(products.map((p) => p.category)));

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
  }, [selectedCategories, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2 text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
          ALL PRODUCTS
        </h1>
        <p className="text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 flex-shrink-0 mb-4 lg:mb-0`}
        >
          <Card className="sticky top-24 bg-[#1e1e1e] border border-[rgba(255,255,255,0.08)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg flex items-center gap-2 text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}>
                  <Filter className="w-5 h-5 text-[#00BFDF]" />
                  FILTERS
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
                    className="text-[#00BFDF] hover:text-white hover:bg-transparent"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-3 text-white" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>Categories</h3>
                <div className="space-y-2">
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
                        className="text-sm cursor-pointer flex-1 text-[#aaaaaa] hover:text-white"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        {category}
                      </label>
                      <span
                        className="text-xs px-2 py-0.5 bg-[rgba(0,191,223,0.1)] border border-[rgba(0,191,223,0.3)] text-[#00BFDF]"
                        style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                      >
                        {products.filter((p) => p.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3 text-white" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={3000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      ₱{priceRange[0].toFixed(0)}
                    </span>
                    <span className="text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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
          <div className="flex items-center justify-between mb-6 gap-4">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden min-h-[44px] bg-transparent text-[#00BFDF] border border-[#00BFDF] hover:bg-[#00BFDF] hover:text-black"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-[#aaaaaa]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-[#1e1e1e] border border-[rgba(255,255,255,0.1)] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1e1e] border border-[rgba(255,255,255,0.1)]">
                  <SelectItem value="featured" className="text-white hover:bg-[#111111] focus:bg-[#111111] focus:text-[#00BFDF]">Featured</SelectItem>
                  <SelectItem value="price-low" className="text-white hover:bg-[#111111] focus:bg-[#111111] focus:text-[#00BFDF]">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="text-white hover:bg-[#111111] focus:bg-[#111111] focus:text-[#00BFDF]">Price: High to Low</SelectItem>
                  <SelectItem value="rating" className="text-white hover:bg-[#111111] focus:bg-[#111111] focus:text-[#00BFDF]">Highest Rated</SelectItem>
                  <SelectItem value="name" className="text-white hover:bg-[#111111] focus:bg-[#111111] focus:text-[#00BFDF]">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-center py-16">
              <p className="text-[#aaaaaa] text-lg mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Walang nakitang produkto. Try adjusting your filters.
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
