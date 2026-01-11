/**
 * Central export for all data files
 */

// Site Configuration
export {
  siteConfig,
  navigation,
  announcements,
  trustBadges
} from './siteConfig';

// Products
export {
  products,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getBestSellers,
  getNewArrivals,
  getSaleProducts,
  searchProducts
} from './products';

// Categories
export {
  categories,
  getCategoryById,
  getCategoryBySlug,
  getFeaturedCategories,
  getAllCategories
} from './categories';

// Concerns
export {
  concerns,
  getConcernById,
  getConcernBySlug,
  getFeaturedConcerns,
  getAllConcerns
} from './concerns';

// Testimonials
export {
  testimonials,
  getTestimonialById,
  getTestimonialsByProduct,
  getFeaturedTestimonials,
  getTopTestimonials,
  getRecentTestimonials,
  getAverageRating,
  getTotalReviews
} from './testimonials';
