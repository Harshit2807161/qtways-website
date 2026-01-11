/**
 * Category data for QTWAYS website
 */

export const categories = [
  {
    id: 'face-care',
    name: 'Face Care',
    slug: 'face-care',
    description: 'Premium face care products for radiant, healthy-looking skin. From cleansers to serums, find your perfect routine.',
    shortDescription: 'Cleansers, serums, moisturizers & more',
    image: '/images/categories/face-care.jpg',
    icon: 'Sparkles',
    productCount: 5,
    featured: true,
    order: 1,
    subcategories: [
      { id: 'cleansers', name: 'Cleansers', slug: 'cleansers' },
      { id: 'serums', name: 'Serums', slug: 'serums' },
      { id: 'moisturizers', name: 'Moisturizers', slug: 'moisturizers' },
      { id: 'treatments', name: 'Treatments', slug: 'treatments' },
      { id: 'masks', name: 'Face Masks', slug: 'masks' }
    ]
  },
  {
    id: 'body-care',
    name: 'Body Care',
    slug: 'body-care',
    description: 'Luxurious body care essentials for silky smooth skin from head to toe. Indulge in our nourishing formulas.',
    shortDescription: 'Lotions, scrubs, body washes & more',
    image: '/images/categories/body-care.jpg',
    icon: 'Droplets',
    productCount: 3,
    featured: true,
    order: 2,
    subcategories: [
      { id: 'body-lotions', name: 'Body Lotions', slug: 'body-lotions' },
      { id: 'body-washes', name: 'Body Washes', slug: 'body-washes' },
      { id: 'scrubs', name: 'Body Scrubs', slug: 'scrubs' },
      { id: 'body-oils', name: 'Body Oils', slug: 'body-oils' }
    ]
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Transform your hair with our range of nourishing oils, serums, and treatments for all hair types.',
    shortDescription: 'Oils, serums, treatments & more',
    image: '/images/categories/hair-care.jpg',
    icon: 'Wind',
    productCount: 2,
    featured: true,
    order: 3,
    subcategories: [
      { id: 'hair-oils', name: 'Hair Oils', slug: 'hair-oils' },
      { id: 'hair-serums', name: 'Hair Serums', slug: 'hair-serums' },
      { id: 'shampoos', name: 'Shampoos', slug: 'shampoos' },
      { id: 'conditioners', name: 'Conditioners', slug: 'conditioners' }
    ]
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Support your beauty from within with our curated selection of supplements and wellness products.',
    shortDescription: 'Supplements, vitamins & wellness',
    image: '/images/categories/health-wellness.jpg',
    icon: 'Heart',
    productCount: 2,
    featured: true,
    order: 4,
    subcategories: [
      { id: 'supplements', name: 'Supplements', slug: 'supplements' },
      { id: 'vitamins', name: 'Vitamins', slug: 'vitamins' },
      { id: 'collagen', name: 'Collagen', slug: 'collagen' }
    ]
  }
];

// Helper functions
export const getCategoryById = (id) => categories.find(c => c.id === id);

export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);

export const getFeaturedCategories = () => categories
  .filter(c => c.featured)
  .sort((a, b) => a.order - b.order);

export const getAllCategories = () => categories.sort((a, b) => a.order - b.order);

export default categories;
