/**
 * Skin concerns data for "Shop by Concern" section
 */

export const concerns = [
  {
    id: 'acne',
    name: 'Acne & Blemishes',
    slug: 'acne-blemishes',
    description: 'Products formulated to fight acne, reduce breakouts, and minimize blemish appearance.',
    shortDescription: 'Fight breakouts & clear skin',
    image: '/images/concerns/acne.jpg',
    icon: 'Target',
    color: 'coral',
    productIds: ['fc-003', 'fc-004'],
    tips: [
      'Cleanse twice daily with a gentle cleanser',
      'Use non-comedogenic products',
      'Don\'t skip moisturizer even with oily skin',
      'Avoid touching your face frequently'
    ],
    featured: true,
    order: 1
  },
  {
    id: 'dryness',
    name: 'Dryness & Dehydration',
    slug: 'dryness-dehydration',
    description: 'Intensely hydrating products to quench thirsty skin and restore moisture balance.',
    shortDescription: 'Deep hydration & moisture',
    image: '/images/concerns/dryness.jpg',
    icon: 'Droplet',
    color: 'blue',
    productIds: ['fc-002', 'bc-001'],
    tips: [
      'Use a hydrating serum before moisturizer',
      'Apply products on damp skin',
      'Look for hyaluronic acid and ceramides',
      'Use a humidifier in dry environments'
    ],
    featured: true,
    order: 2
  },
  {
    id: 'aging',
    name: 'Anti-Aging',
    slug: 'anti-aging',
    description: 'Advanced formulas to reduce fine lines, wrinkles, and restore youthful radiance.',
    shortDescription: 'Reduce fine lines & wrinkles',
    image: '/images/concerns/aging.jpg',
    icon: 'Clock',
    color: 'gold',
    productIds: ['fc-001', 'fc-005', 'hw-002'],
    tips: [
      'Start with lower strength retinol',
      'Always use SPF during the day',
      'Vitamin C in morning, retinol at night',
      'Stay hydrated and get enough sleep'
    ],
    featured: true,
    order: 3
  },
  {
    id: 'pigmentation',
    name: 'Dark Spots & Pigmentation',
    slug: 'dark-spots-pigmentation',
    description: 'Brightening products to fade dark spots, even skin tone, and reveal luminous skin.',
    shortDescription: 'Even tone & brighten',
    image: '/images/concerns/pigmentation.jpg',
    icon: 'Sun',
    color: 'orange',
    productIds: ['fc-001', 'fc-003'],
    tips: [
      'Consistent SPF is crucial',
      'Be patient - results take 6-8 weeks',
      'Layer vitamin C with SPF for best results',
      'Avoid picking at skin'
    ],
    featured: true,
    order: 4
  },
  {
    id: 'sensitivity',
    name: 'Sensitive Skin',
    slug: 'sensitive-skin',
    description: 'Gentle, soothing products designed for reactive and easily irritated skin.',
    shortDescription: 'Gentle & soothing care',
    image: '/images/concerns/sensitivity.jpg',
    icon: 'Feather',
    color: 'blush',
    productIds: ['fc-002', 'fc-004'],
    tips: [
      'Patch test new products first',
      'Avoid fragranced products',
      'Use lukewarm water, not hot',
      'Introduce one new product at a time'
    ],
    featured: true,
    order: 5
  },
  {
    id: 'dullness',
    name: 'Dull & Tired Skin',
    slug: 'dull-tired-skin',
    description: 'Revitalizing products to restore glow and wake up tired, lackluster skin.',
    shortDescription: 'Restore radiance & glow',
    image: '/images/concerns/dullness.jpg',
    icon: 'Sparkles',
    color: 'gold',
    productIds: ['fc-001', 'bc-002'],
    tips: [
      'Exfoliate 1-2 times per week',
      'Use vitamin C for antioxidant boost',
      'Get adequate sleep',
      'Stay hydrated inside and out'
    ],
    featured: false,
    order: 6
  },
  {
    id: 'oiliness',
    name: 'Oily & Congested',
    slug: 'oily-congested',
    description: 'Oil-control products to balance sebum production and keep pores clear.',
    shortDescription: 'Control oil & minimize pores',
    image: '/images/concerns/oiliness.jpg',
    icon: 'Layers',
    color: 'sage',
    productIds: ['fc-003', 'fc-004'],
    tips: [
      'Don\'t over-wash - it can increase oil',
      'Use niacinamide for oil control',
      'Lightweight moisturizers are still important',
      'Blotting papers for midday touch-ups'
    ],
    featured: false,
    order: 7
  },
  {
    id: 'hair-fall',
    name: 'Hair Fall & Thinning',
    slug: 'hair-fall-thinning',
    description: 'Strengthening treatments to reduce hair fall and promote healthy growth.',
    shortDescription: 'Strengthen & promote growth',
    image: '/images/concerns/hair-fall.jpg',
    icon: 'Scissors',
    color: 'charcoal',
    productIds: ['hc-002'],
    tips: [
      'Massage scalp regularly to boost circulation',
      'Eat protein-rich foods',
      'Reduce heat styling',
      'Be gentle when wet - hair is fragile'
    ],
    featured: false,
    order: 8
  }
];

// Helper functions
export const getConcernById = (id) => concerns.find(c => c.id === id);

export const getConcernBySlug = (slug) => concerns.find(c => c.slug === slug);

export const getFeaturedConcerns = () => concerns
  .filter(c => c.featured)
  .sort((a, b) => a.order - b.order);

export const getAllConcerns = () => concerns.sort((a, b) => a.order - b.order);

export default concerns;
