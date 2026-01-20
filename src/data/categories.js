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
    image: 'https://qtways.com/cdn/shop/files/10_-VITAMIN-C-_-0.5_-FERULIC.jpg',
    icon: 'Sparkles',
    productCount: 8,
    featured: true,
    order: 1,
    subcategories: [
      { id: 'serums', name: 'Serums', slug: 'serums' },
      { id: 'cleansers', name: 'Cleansers', slug: 'cleansers' },
      { id: 'moisturizers', name: 'Moisturizers', slug: 'moisturizers' },
      { id: 'treatments', name: 'Treatments', slug: 'treatments' },
      { id: 'sunscreen', name: 'Sunscreen', slug: 'sunscreen' }
    ]
  },
  {
    id: 'kits',
    name: 'Skincare Kits',
    slug: 'kits',
    description: 'Complete skincare routines in one kit. Save money with our curated bundles designed for specific skin needs.',
    shortDescription: 'Combo kits for complete routines',
    image: 'https://qtways.com/cdn/shop/files/Anti-Acne-Kit-Combo.jpg',
    icon: 'Package',
    productCount: 6,
    featured: true,
    order: 2,
    subcategories: [
      { id: 'skin-kits', name: 'Skin Kits', slug: 'skin-kits' }
    ]
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Support your health from within with our curated selection of supplements and wellness products.',
    shortDescription: 'Supplements, protein & wellness',
    image: 'https://qtways.com/cdn/shop/files/Protigud.jpg',
    icon: 'Heart',
    productCount: 4,
    featured: true,
    order: 3,
    subcategories: [
      { id: 'protein', name: 'Protein', slug: 'protein' },
      { id: 'supplements', name: 'Supplements', slug: 'supplements' }
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
