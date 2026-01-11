/**
 * Product data for QTWAYS website
 * All prices in INR
 */

export const products = [
  // Face Care Products
  {
    id: 'fc-001',
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 1299,
    originalPrice: 1599,
    description: 'A powerful antioxidant serum with 15% Vitamin C to brighten skin and reduce dark spots. Lightweight formula absorbs quickly for a radiant glow.',
    shortDescription: 'Brightening serum with 15% Vitamin C',
    ingredients: ['Vitamin C (Ascorbic Acid)', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid', 'Aloe Vera'],
    benefits: ['Brightens skin tone', 'Reduces dark spots', 'Boosts collagen production', 'Protects against free radicals'],
    howToUse: 'Apply 3-4 drops to clean face and neck. Use morning and night before moisturizer. Always follow with SPF in the morning.',
    size: '30ml',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    badge: 'bestseller',
    tags: ['brightening', 'anti-aging', 'serum'],
    images: [
      '/images/products/vitamin-c-serum-1.jpg',
      '/images/products/vitamin-c-serum-2.jpg'
    ],
    featured: true
  },
  {
    id: 'fc-002',
    name: 'Hydrating Hyaluronic Acid Moisturizer',
    slug: 'hydrating-hyaluronic-acid-moisturizer',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 899,
    originalPrice: null,
    description: 'Deeply hydrating moisturizer with triple-weight Hyaluronic Acid. Locks in moisture for 72 hours without feeling heavy or greasy.',
    shortDescription: 'Deep hydration with triple HA complex',
    ingredients: ['Hyaluronic Acid Complex', 'Ceramides', 'Squalane', 'Glycerin', 'Niacinamide'],
    benefits: ['72-hour hydration', 'Plumps fine lines', 'Strengthens skin barrier', 'Non-comedogenic'],
    howToUse: 'Apply to face and neck after serum. Use morning and night. Can be layered under makeup.',
    size: '50ml',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    badge: null,
    tags: ['hydrating', 'moisturizer', 'dry-skin'],
    images: [
      '/images/products/ha-moisturizer-1.jpg',
      '/images/products/ha-moisturizer-2.jpg'
    ],
    featured: true
  },
  {
    id: 'fc-003',
    name: 'Niacinamide Pore Minimizing Serum',
    slug: 'niacinamide-pore-minimizing-serum',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 799,
    originalPrice: 999,
    description: '10% Niacinamide serum that visibly minimizes pores and controls excess oil. Suitable for oily and combination skin types.',
    shortDescription: '10% Niacinamide for pore control',
    ingredients: ['Niacinamide 10%', 'Zinc PCA', 'Hyaluronic Acid', 'Panthenol', 'Allantoin'],
    benefits: ['Minimizes pores', 'Controls oil production', 'Evens skin texture', 'Reduces blemishes'],
    howToUse: 'Apply to clean face morning and night. Wait for absorption before applying moisturizer.',
    size: '30ml',
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    badge: 'sale',
    tags: ['pores', 'oily-skin', 'serum'],
    images: [
      '/images/products/niacinamide-serum-1.jpg',
      '/images/products/niacinamide-serum-2.jpg'
    ],
    featured: false
  },
  {
    id: 'fc-004',
    name: 'Gentle Foam Cleanser',
    slug: 'gentle-foam-cleanser',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 599,
    originalPrice: null,
    description: 'pH-balanced foam cleanser that removes impurities without stripping natural oils. Perfect for all skin types including sensitive skin.',
    shortDescription: 'pH-balanced gentle cleanser',
    ingredients: ['Coconut-derived Surfactants', 'Green Tea Extract', 'Chamomile', 'Aloe Vera', 'Glycerin'],
    benefits: ['Gentle cleansing', 'Maintains skin pH', 'Removes makeup', 'Non-drying formula'],
    howToUse: 'Pump foam onto wet hands, massage onto face, and rinse thoroughly. Use twice daily.',
    size: '150ml',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    badge: null,
    tags: ['cleanser', 'gentle', 'all-skin'],
    images: [
      '/images/products/foam-cleanser-1.jpg',
      '/images/products/foam-cleanser-2.jpg'
    ],
    featured: true
  },
  {
    id: 'fc-005',
    name: 'Retinol Night Repair Cream',
    slug: 'retinol-night-repair-cream',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 1499,
    originalPrice: 1799,
    description: 'Advanced night cream with encapsulated Retinol for anti-aging benefits. Reduces fine lines and improves skin texture while you sleep.',
    shortDescription: 'Anti-aging retinol night treatment',
    ingredients: ['Encapsulated Retinol', 'Peptide Complex', 'Squalane', 'Shea Butter', 'Vitamin E'],
    benefits: ['Reduces fine lines', 'Improves skin texture', 'Promotes cell turnover', 'Overnight repair'],
    howToUse: 'Apply a pea-sized amount to face and neck at night. Start 2-3 times per week, gradually increase.',
    size: '50ml',
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    badge: 'new',
    tags: ['anti-aging', 'retinol', 'night-care'],
    images: [
      '/images/products/retinol-cream-1.jpg',
      '/images/products/retinol-cream-2.jpg'
    ],
    featured: true
  },

  // Body Care Products
  {
    id: 'bc-001',
    name: 'Shea Butter Body Lotion',
    slug: 'shea-butter-body-lotion',
    category: 'body-care',
    categoryName: 'Body Care',
    price: 699,
    originalPrice: null,
    description: 'Rich and nourishing body lotion with organic Shea Butter. Provides all-day moisture for soft, supple skin.',
    shortDescription: 'Nourishing lotion with organic Shea Butter',
    ingredients: ['Organic Shea Butter', 'Coconut Oil', 'Vitamin E', 'Almond Oil', 'Aloe Vera'],
    benefits: ['24-hour moisture', 'Softens rough skin', 'Fast-absorbing', 'Light fragrance'],
    howToUse: 'Apply generously to body after shower. Focus on dry areas like elbows and knees.',
    size: '250ml',
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    badge: 'bestseller',
    tags: ['body-lotion', 'moisturizing', 'shea-butter'],
    images: [
      '/images/products/shea-lotion-1.jpg',
      '/images/products/shea-lotion-2.jpg'
    ],
    featured: true
  },
  {
    id: 'bc-002',
    name: 'Exfoliating Body Scrub',
    slug: 'exfoliating-body-scrub',
    category: 'body-care',
    categoryName: 'Body Care',
    price: 799,
    originalPrice: 899,
    description: 'Gentle yet effective body scrub with natural walnut shell powder. Removes dead skin cells to reveal smoother, brighter skin.',
    shortDescription: 'Natural exfoliating body scrub',
    ingredients: ['Walnut Shell Powder', 'Brown Sugar', 'Coconut Oil', 'Honey', 'Vitamin E'],
    benefits: ['Removes dead skin', 'Improves circulation', 'Smooths rough patches', 'Prepares skin for moisture'],
    howToUse: 'Apply to damp skin in circular motions. Rinse thoroughly. Use 2-3 times per week.',
    size: '200g',
    rating: 4.4,
    reviewCount: 92,
    inStock: true,
    badge: 'sale',
    tags: ['scrub', 'exfoliating', 'body-care'],
    images: [
      '/images/products/body-scrub-1.jpg',
      '/images/products/body-scrub-2.jpg'
    ],
    featured: false
  },
  {
    id: 'bc-003',
    name: 'Refreshing Body Wash',
    slug: 'refreshing-body-wash',
    category: 'body-care',
    categoryName: 'Body Care',
    price: 499,
    originalPrice: null,
    description: 'Sulfate-free body wash with refreshing citrus notes. Gently cleanses without drying out the skin.',
    shortDescription: 'Sulfate-free gentle body wash',
    ingredients: ['Coconut Surfactants', 'Orange Peel Oil', 'Lemon Extract', 'Glycerin', 'Aloe Vera'],
    benefits: ['Gentle cleansing', 'Refreshing scent', 'Hydrating formula', 'pH balanced'],
    howToUse: 'Apply to wet skin, lather, and rinse. Suitable for daily use.',
    size: '300ml',
    rating: 4.5,
    reviewCount: 167,
    inStock: true,
    badge: null,
    tags: ['body-wash', 'gentle', 'citrus'],
    images: [
      '/images/products/body-wash-1.jpg',
      '/images/products/body-wash-2.jpg'
    ],
    featured: false
  },

  // Hair Care Products
  {
    id: 'hc-001',
    name: 'Argan Oil Hair Serum',
    slug: 'argan-oil-hair-serum',
    category: 'hair-care',
    categoryName: 'Hair Care',
    price: 899,
    originalPrice: null,
    description: 'Lightweight hair serum enriched with pure Argan Oil. Tames frizz, adds shine, and protects from heat damage.',
    shortDescription: 'Frizz control with pure Argan Oil',
    ingredients: ['Moroccan Argan Oil', 'Vitamin E', 'Silk Proteins', 'Jojoba Oil'],
    benefits: ['Controls frizz', 'Adds natural shine', 'Heat protection', 'Nourishes hair'],
    howToUse: 'Apply 2-3 drops to damp or dry hair, focusing on ends. Can be used before heat styling.',
    size: '50ml',
    rating: 4.7,
    reviewCount: 145,
    inStock: true,
    badge: 'bestseller',
    tags: ['hair-serum', 'frizz-control', 'argan-oil'],
    images: [
      '/images/products/argan-serum-1.jpg',
      '/images/products/argan-serum-2.jpg'
    ],
    featured: true
  },
  {
    id: 'hc-002',
    name: 'Strengthening Hair Oil',
    slug: 'strengthening-hair-oil',
    category: 'hair-care',
    categoryName: 'Hair Care',
    price: 599,
    originalPrice: 749,
    description: 'Traditional hair oil blend with Bhringraj and Amla. Strengthens roots and promotes healthy hair growth.',
    shortDescription: 'Ayurvedic blend for hair strength',
    ingredients: ['Bhringraj Oil', 'Amla Extract', 'Coconut Oil', 'Castor Oil', 'Brahmi'],
    benefits: ['Strengthens roots', 'Promotes growth', 'Reduces hair fall', 'Conditions scalp'],
    howToUse: 'Massage into scalp and hair. Leave for at least 1 hour or overnight. Wash with mild shampoo.',
    size: '100ml',
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    badge: 'sale',
    tags: ['hair-oil', 'ayurvedic', 'hair-growth'],
    images: [
      '/images/products/hair-oil-1.jpg',
      '/images/products/hair-oil-2.jpg'
    ],
    featured: false
  },

  // Health & Wellness
  {
    id: 'hw-001',
    name: 'Immunity Boost Supplements',
    slug: 'immunity-boost-supplements',
    category: 'health-wellness',
    categoryName: 'Health & Wellness',
    price: 999,
    originalPrice: null,
    description: 'Daily immunity supplements with Vitamin C, Zinc, and natural herbs. Supports overall health and wellness.',
    shortDescription: 'Daily immunity support formula',
    ingredients: ['Vitamin C', 'Zinc', 'Elderberry Extract', 'Echinacea', 'Turmeric'],
    benefits: ['Boosts immunity', 'Antioxidant support', 'Energy enhancement', 'Overall wellness'],
    howToUse: 'Take 1 tablet daily with meals. Consult healthcare provider before use.',
    size: '60 tablets',
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    badge: 'new',
    tags: ['supplements', 'immunity', 'wellness'],
    images: [
      '/images/products/immunity-supplements-1.jpg',
      '/images/products/immunity-supplements-2.jpg'
    ],
    featured: false
  },
  {
    id: 'hw-002',
    name: 'Collagen Beauty Drink',
    slug: 'collagen-beauty-drink',
    category: 'health-wellness',
    categoryName: 'Health & Wellness',
    price: 1899,
    originalPrice: 2199,
    description: 'Premium marine collagen drink for skin elasticity and joint health. Delicious berry flavor.',
    shortDescription: 'Marine collagen for beauty from within',
    ingredients: ['Marine Collagen Peptides', 'Vitamin C', 'Hyaluronic Acid', 'Biotin', 'Mixed Berry Flavor'],
    benefits: ['Improves skin elasticity', 'Supports joint health', 'Strengthens nails', 'Promotes hair growth'],
    howToUse: 'Mix 1 sachet with 200ml water. Best consumed on empty stomach in the morning.',
    size: '30 sachets',
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    badge: 'sale',
    tags: ['collagen', 'beauty-supplement', 'anti-aging'],
    images: [
      '/images/products/collagen-drink-1.jpg',
      '/images/products/collagen-drink-2.jpg'
    ],
    featured: true
  }
];

// Helper functions
export const getProductById = (id) => products.find(p => p.id === id);

export const getProductBySlug = (slug) => products.find(p => p.slug === slug);

export const getProductsByCategory = (category) => products.filter(p => p.category === category);

export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getBestSellers = () => products.filter(p => p.badge === 'bestseller');

export const getNewArrivals = () => products.filter(p => p.badge === 'new');

export const getSaleProducts = () => products.filter(p => p.badge === 'sale');

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.tags.some(tag => tag.includes(lowercaseQuery))
  );
};

export default products;
