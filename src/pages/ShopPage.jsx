import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  X,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '../utils';
import { ProductCard } from '../components';
import { Button } from '../components/ui/Button';
import {
  products,
  filterProducts,
  sortProducts,
} from '../data/products';
import { categories, getCategoryBySlug } from '../data/categories';
import { concerns, getConcernBySlug } from '../data/concerns';
import { useCart } from '../hooks';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Best Discount' },
  { value: 'newest', label: 'Newest First' },
];

const PRICE_RANGES = [
  { min: 0, max: 300, label: 'Under ₹300' },
  { min: 300, max: 500, label: '₹300 - ₹500' },
  { min: 500, max: 1000, label: '₹500 - ₹1,000' },
  { min: 1000, max: Infinity, label: 'Above ₹1,000' },
];

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug: categorySlug } = useParams();
  const { addItem } = useCart();

  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || categorySlug || ''
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get('subcategory') || ''
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [gridCols, setGridCols] = useState(3);

  // Get category or concern from URL
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory && !categorySlug) params.set('category', selectedCategory);
    if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
    if (sortBy !== 'featured') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedSubcategory, sortBy, categorySlug, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    const categoryToFilter = categorySlug || selectedCategory;
    if (categoryToFilter) {
      filtered = filterProducts(filtered, { category: categoryToFilter });
    }

    // Apply subcategory filter
    if (selectedSubcategory) {
      filtered = filterProducts(filtered, { subcategory: selectedSubcategory });
    }

    // Apply price range filter
    if (selectedPriceRange) {
      filtered = filterProducts(filtered, {
        minPrice: selectedPriceRange.min,
        maxPrice: selectedPriceRange.max === Infinity ? undefined : selectedPriceRange.max,
      });
    }

    // Apply in-stock filter
    if (inStockOnly) {
      filtered = filterProducts(filtered, { inStock: true });
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortBy);

    return filtered;
  }, [categorySlug, selectedCategory, selectedSubcategory, selectedPriceRange, inStockOnly, sortBy]);

  // Get subcategories for selected category
  const activeSubcategories = useMemo(() => {
    const catId = categorySlug || selectedCategory;
    if (!catId) return [];
    const cat = categories.find(c => c.id === catId || c.slug === catId);
    return cat?.subcategories || [];
  }, [categorySlug, selectedCategory]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory('');
  }, [selectedCategory, categorySlug]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Count active filters
  const activeFilterCount = [
    selectedCategory && !categorySlug,
    selectedSubcategory,
    selectedPriceRange,
    inStockOnly,
  ].filter(Boolean).length;

  // Handle quick add to cart
  const handleQuickAdd = (product) => {
    addItem(product);
  };

  // Page title
  const pageTitle = category?.name || 'All Products';
  const pageDescription = category?.description || 'Explore our complete collection of skincare and wellness products.';

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="container-custom py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-charcoal-500 mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li>
                <Link to="/shop" className="hover:text-gold-600 transition-colors">Shop</Link>
              </li>
              {category && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <li className="text-charcoal-900 font-medium">{category.name}</li>
                </>
              )}
            </ol>
          </nav>

          <h1 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-2">
            {pageTitle}
          </h1>
          <p className="text-charcoal-600 max-w-2xl">
            {pageDescription}
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              categories={categories}
              selectedCategory={categorySlug || selectedCategory}
              onCategoryChange={categorySlug ? undefined : setSelectedCategory}
              subcategories={activeSubcategories}
              selectedSubcategory={selectedSubcategory}
              onSubcategoryChange={setSelectedSubcategory}
              priceRanges={PRICE_RANGES}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={setSelectedPriceRange}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              onClearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
              isLocked={!!categorySlug}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-cream-200 rounded-lg text-charcoal-700 hover:border-gold-400 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-gold-500 text-white text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Product Count */}
              <p className="text-sm text-charcoal-600">
                Showing <span className="font-medium text-charcoal-900">{filteredProducts.length}</span> products
              </p>

              {/* Sort & Grid Options */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 bg-white border border-cream-200 rounded-lg text-charcoal-700 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent cursor-pointer"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
                </div>

                {/* Grid Toggle (Desktop only) */}
                <div className="hidden md:flex items-center gap-1 bg-white border border-cream-200 rounded-lg p-1">
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      'p-1.5 rounded transition-colors',
                      gridCols === 3 ? 'bg-cream-100 text-charcoal-900' : 'text-charcoal-400 hover:text-charcoal-600'
                    )}
                    aria-label="3 column grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={cn(
                      'p-1.5 rounded transition-colors',
                      gridCols === 4 ? 'bg-cream-100 text-charcoal-900' : 'text-charcoal-400 hover:text-charcoal-600'
                    )}
                    aria-label="4 column grid"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-charcoal-600">Active filters:</span>
                {selectedCategory && !categorySlug && (
                  <FilterPill
                    label={categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                    onRemove={() => setSelectedCategory('')}
                  />
                )}
                {selectedSubcategory && (
                  <FilterPill
                    label={activeSubcategories.find(s => s.id === selectedSubcategory)?.name || selectedSubcategory}
                    onRemove={() => setSelectedSubcategory('')}
                  />
                )}
                {selectedPriceRange && (
                  <FilterPill
                    label={selectedPriceRange.label}
                    onRemove={() => setSelectedPriceRange(null)}
                  />
                )}
                {inStockOnly && (
                  <FilterPill
                    label="In Stock Only"
                    onRemove={() => setInStockOnly(false)}
                  />
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={cn(
                  'grid gap-6',
                  gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                )}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        onQuickAdd={handleQuickAdd}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <EmptyState onClearFilters={clearFilters} />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategory={categorySlug || selectedCategory}
        onCategoryChange={categorySlug ? undefined : setSelectedCategory}
        subcategories={activeSubcategories}
        selectedSubcategory={selectedSubcategory}
        onSubcategoryChange={setSelectedSubcategory}
        priceRanges={PRICE_RANGES}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
        inStockOnly={inStockOnly}
        onInStockChange={setInStockOnly}
        onClearFilters={clearFilters}
        activeFilterCount={activeFilterCount}
        productCount={filteredProducts.length}
        isLocked={!!categorySlug}
      />
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({
  categories,
  selectedCategory,
  onCategoryChange,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  priceRanges,
  selectedPriceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  onClearFilters,
  activeFilterCount,
  isLocked,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    subcategory: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white rounded-lg border border-cream-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg text-charcoal-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gold-600 hover:text-gold-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      {!isLocked && (
        <FilterSection
          title="Category"
          isExpanded={expandedSections.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={!selectedCategory}
                onChange={() => onCategoryChange?.('')}
                className="text-gold-500 focus:ring-gold-400"
              />
              <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">All Categories</span>
            </label>
            {categories.map(cat => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat.id || selectedCategory === cat.slug}
                  onChange={() => onCategoryChange?.(cat.id)}
                  className="text-gold-500 focus:ring-gold-400"
                />
                <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">
                  {cat.name}
                </span>
                <span className="text-xs text-charcoal-400">({cat.productCount})</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <FilterSection
          title="Subcategory"
          isExpanded={expandedSections.subcategory}
          onToggle={() => toggleSection('subcategory')}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="subcategory"
                checked={!selectedSubcategory}
                onChange={() => onSubcategoryChange('')}
                className="text-gold-500 focus:ring-gold-400"
              />
              <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">All</span>
            </label>
            {subcategories.map(sub => (
              <label key={sub.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="subcategory"
                  checked={selectedSubcategory === sub.id}
                  onChange={() => onSubcategoryChange(sub.id)}
                  className="text-gold-500 focus:ring-gold-400"
                />
                <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">
                  {sub.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="price"
              checked={!selectedPriceRange}
              onChange={() => onPriceRangeChange(null)}
              className="text-gold-500 focus:ring-gold-400"
            />
            <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">All Prices</span>
          </label>
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange?.label === range.label}
                onChange={() => onPriceRangeChange(range)}
                className="text-gold-500 focus:ring-gold-400"
              />
              <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        isExpanded={expandedSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="rounded text-gold-500 focus:ring-gold-400"
          />
          <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900">
            In Stock Only
          </span>
        </label>
      </FilterSection>
    </div>
  );
};

// Filter Section Component
const FilterSection = ({ title, isExpanded, onToggle, children }) => (
  <div className="border-b border-cream-200 py-4 last:border-b-0">
    <button
      onClick={onToggle}
      aria-expanded={isExpanded}
      className="flex items-center justify-between w-full text-left"
    >
      <span className="font-medium text-charcoal-900">{title}</span>
      <ChevronDown
        className={cn(
          'w-4 h-4 text-charcoal-400 transition-transform',
          isExpanded && 'rotate-180'
        )}
      />
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Filter Pill Component
const FilterPill = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="hover:text-gold-900 transition-colors"
      aria-label={`Remove ${label} filter`}
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);

// Empty State Component
const EmptyState = ({ onClearFilters }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Filter className="w-8 h-8 text-charcoal-400" />
    </div>
    <h3 className="font-display text-xl text-charcoal-900 mb-2">No products found</h3>
    <p className="text-charcoal-600 mb-6">
      Try adjusting your filters to find what you're looking for.
    </p>
    <Button variant="primary" onClick={onClearFilters}>
      Clear All Filters
    </Button>
  </div>
);

// Mobile Filter Drawer
const MobileFilterDrawer = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  priceRanges,
  selectedPriceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  onClearFilters,
  activeFilterCount,
  productCount,
  isLocked,
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-900/50 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cream-200">
              <h2 className="font-display text-lg text-charcoal-900">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream-100 rounded-md transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-charcoal-700" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
                subcategories={subcategories}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={onSubcategoryChange}
                priceRanges={priceRanges}
                selectedPriceRange={selectedPriceRange}
                onPriceRangeChange={onPriceRangeChange}
                inStockOnly={inStockOnly}
                onInStockChange={onInStockChange}
                onClearFilters={onClearFilters}
                activeFilterCount={activeFilterCount}
                isLocked={isLocked}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-cream-200 bg-white">
              <Button variant="primary" className="w-full" onClick={onClose}>
                Show {productCount} Products
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShopPage;
