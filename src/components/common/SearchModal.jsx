import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { cn, formatPrice } from '../../utils';
import { searchProducts } from '../../data';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Search with debounce
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 6));
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-elegant max-h-[80vh] overflow-hidden"
          >
            <div className="container-custom py-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className={cn(
                    'w-full pl-12 pr-12 py-4 text-lg',
                    'bg-cream-50 border border-cream-200 rounded-lg',
                    'focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
                    'placeholder:text-charcoal-400'
                  )}
                />
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-cream-100 rounded-md transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-charcoal-600" />
                </button>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {query.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 overflow-hidden"
                  >
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : results.length > 0 ? (
                      <>
                        <p className="text-sm text-charcoal-500 mb-4">
                          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {results.map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.slug}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-4 p-3 bg-cream-50 rounded-lg hover:bg-cream-100 transition-colors group"
                            >
                              <img
                                src={product.images?.[0] || '/images/placeholder-product.jpg'}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-md"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80';
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-charcoal-900 truncate group-hover:text-gold-600 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-charcoal-500">
                                  {product.categoryName}
                                </p>
                                <p className="text-sm font-medium text-charcoal-900 mt-1">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* View All Link */}
                        <Link
                          to={`/shop?search=${encodeURIComponent(query)}`}
                          onClick={handleResultClick}
                          className="flex items-center justify-center gap-2 mt-6 py-3 text-charcoal-700 hover:text-gold-600 transition-colors"
                        >
                          <span>View all results</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-charcoal-500">
                          No products found for "{query}"
                        </p>
                        <p className="text-sm text-charcoal-400 mt-2">
                          Try searching for something else
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Links (when no search) */}
              {query.length < 2 && (
                <div className="mt-6 pt-6 border-t border-cream-200">
                  <p className="text-sm text-charcoal-500 mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Vitamin C', 'Moisturizer', 'Serum', 'Hair Oil', 'Body Lotion'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 text-sm bg-cream-100 text-charcoal-700 rounded-full hover:bg-cream-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
