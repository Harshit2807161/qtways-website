import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  Star,
} from 'lucide-react';
import { cn, formatPrice, calculateDiscount } from '../utils';
import { ProductCard, Rating } from '../components';
import { Button } from '../components/ui/Button';
import { Badge, SaleBadge, NewBadge, BestsellerBadge } from '../components/ui/Badge';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../hooks';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'howToUse', label: 'How to Use' },
  { id: 'benefits', label: 'Benefits' },
];

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product data
  useEffect(() => {
    const productData = getProductBySlug(slug);
    if (productData) {
      setProduct(productData);
      setRelatedProducts(getRelatedProducts(productData.id, 4));
      setSelectedImage(0);
      setQuantity(1);
      setAddedToCart(false);
    } else {
      navigate('/shop', { replace: true });
    }
  }, [slug, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-pulse text-charcoal-500">Loading...</div>
      </div>
    );
  }

  const {
    name,
    price,
    originalPrice,
    discount,
    description,
    shortDescription,
    images,
    rating,
    reviewCount,
    badge,
    inStock,
    categoryName,
    category,
    subcategory,
    ingredients,
    benefits,
    howToUse,
    size,
    skinType,
    certifications,
    kitContents,
  } = product;

  const hasDiscount = discount > 0 || (originalPrice && originalPrice > price);
  const discountPercent = discount || (originalPrice ? calculateDiscount(originalPrice, price) : 0);
  const categoryData = categories.find(c => c.id === category || c.slug === category);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="container-custom py-4">
          <nav className="text-sm text-charcoal-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li>
                <Link to="/shop" className="hover:text-gold-600 transition-colors">Shop</Link>
              </li>
              {categoryData && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <li>
                    <Link
                      to={`/category/${category}`}
                      className="hover:text-gold-600 transition-colors"
                    >
                      {categoryData.name}
                    </Link>
                  </li>
                </>
              )}
              <ChevronRight className="w-4 h-4" />
              <li className="text-charcoal-900 font-medium truncate max-w-[200px]">{name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-soft">
              <motion.img
                key={selectedImage}
                src={images?.[selectedImage] || '/images/placeholder-product.jpg'}
                alt={name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Badge */}
              {badge && (
                <div className="absolute top-4 left-4 z-10">
                  {badge === 'sale' && <SaleBadge discount={discountPercent} />}
                  {badge === 'new' && <NewBadge />}
                  {badge === 'bestseller' && <BestsellerBadge />}
                </div>
              )}

              {/* Out of Stock Overlay */}
              {!inStock && (
                <div className="absolute inset-0 bg-charcoal-900/50 flex items-center justify-center">
                  <Badge variant="soldout" size="lg">Sold Out</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images && images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all',
                      selectedImage === index
                        ? 'border-gold-500 ring-2 ring-gold-200'
                        : 'border-cream-200 hover:border-gold-300'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {categoryName && (
              <Link
                to={`/category/${category}`}
                className="inline-block text-sm text-gold-600 hover:text-gold-700 uppercase tracking-wide font-medium"
              >
                {categoryName}
              </Link>
            )}

            {/* Title */}
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal-900 leading-tight">
              {name}
            </h1>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-3">
                <Rating value={rating} size="md" />
                <span className="text-sm text-charcoal-600">
                  {rating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-medium text-charcoal-900">
                {formatPrice(price)}
              </span>
              {hasDiscount && originalPrice && (
                <>
                  <span className="text-lg text-charcoal-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-coral-100 text-coral-600 text-sm font-medium rounded">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-charcoal-600 leading-relaxed">
              {shortDescription || description?.slice(0, 200)}
            </p>

            {/* Size & Skin Type */}
            <div className="flex flex-wrap gap-4 text-sm">
              {size && (
                <div className="flex items-center gap-2">
                  <span className="text-charcoal-500">Size:</span>
                  <span className="font-medium text-charcoal-900">{size}</span>
                </div>
              )}
              {skinType && (
                <div className="flex items-center gap-2">
                  <span className="text-charcoal-500">Skin Type:</span>
                  <span className="font-medium text-charcoal-900">{skinType}</span>
                </div>
              )}
            </div>

            {/* Kit Contents */}
            {kitContents && kitContents.length > 0 && (
              <div className="bg-cream-100 rounded-lg p-4">
                <h3 className="font-medium text-charcoal-900 mb-2">What's in the Kit:</h3>
                <ul className="space-y-1">
                  {kitContents.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-charcoal-600">
                      <Check className="w-4 h-4 text-sage-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-cream-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-3 text-charcoal-600 hover:text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-charcoal-900">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="p-3 text-charcoal-600 hover:text-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-w-[200px]"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      {inStock ? 'Add to Cart' : 'Out of Stock'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    'p-3 rounded-lg border transition-all',
                    isWishlisted
                      ? 'bg-coral-50 border-coral-200 text-coral-500'
                      : 'bg-white border-cream-200 text-charcoal-600 hover:border-gold-300 hover:text-gold-600'
                  )}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg border border-cream-200 text-charcoal-600 hover:border-gold-300 hover:text-gold-600 transition-all bg-white"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-200">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-sage-500 mb-2" />
                <span className="text-xs text-charcoal-600">Free Shipping</span>
                <span className="text-xs text-charcoal-400">on orders ₹499+</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-sage-500 mb-2" />
                <span className="text-xs text-charcoal-600">Secure Payment</span>
                <span className="text-xs text-charcoal-400">100% secure</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-6 h-6 text-sage-500 mb-2" />
                <span className="text-xs text-charcoal-600">Easy Returns</span>
                <span className="text-xs text-charcoal-400">7-day policy</span>
              </div>
            </div>

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sage-50 text-sage-700 text-xs rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 md:mt-16">
          {/* Tab Headers */}
          <div className="border-b border-cream-200">
            <div role="tablist" aria-label="Product information" className="flex overflow-x-auto gap-8">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'pb-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                    activeTab === tab.id
                      ? 'border-gold-500 text-charcoal-900'
                      : 'border-transparent text-charcoal-500 hover:text-charcoal-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="py-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'description' && (
                  <div className="prose prose-charcoal max-w-none">
                    <p className="text-charcoal-600 leading-relaxed">{description}</p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    {ingredients && ingredients.length > 0 ? (
                      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {ingredients.map((ingredient, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-charcoal-600"
                          >
                            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-charcoal-500">Ingredients information not available.</p>
                    )}
                  </div>
                )}

                {activeTab === 'howToUse' && (
                  <div className="prose prose-charcoal max-w-none">
                    {howToUse ? (
                      <p className="text-charcoal-600 leading-relaxed">{howToUse}</p>
                    ) : (
                      <p className="text-charcoal-500">Usage instructions not available.</p>
                    )}
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div>
                    {benefits && benefits.length > 0 ? (
                      <ul className="grid md:grid-cols-2 gap-3">
                        {benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-charcoal-600"
                          >
                            <Check className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-charcoal-500">Benefits information not available.</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 md:mt-16 pt-12 border-t border-cream-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-charcoal-900">
                You May Also Like
              </h2>
              <Link
                to="/shop"
                className="text-gold-600 hover:text-gold-700 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={(p) => addItem(p)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
