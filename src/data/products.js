/**
 * Product data for QTWAYS website
 * Sourced from qtways.com
 * All prices in INR
 */

export const products = [
  // ============================================
  // FACE CARE - SERUMS
  // ============================================
  {
    id: 'fc-001',
    name: '10% Vitamin C & 0.5% Ferulic Acid Serum',
    slug: '10-vitamin-c-ferulic-acid-serum',
    category: 'face-care',
    subcategory: 'serums',
    categoryName: 'Face Care',
    price: 519,
    originalPrice: 799,
    discount: 35,
    description: 'A powerful blend serum combining vitamin C and ferulic acid. This 30ml formulation targets multiple skin concerns through antioxidant and hydrating mechanisms, delivering brightening, smoothing, and hydrating effects.',
    shortDescription: 'Brightening serum with Vitamin C & Ferulic Acid',
    ingredients: [
      'Deionized Water',
      'Ethyl Ascorbic Acid',
      'Propylene Glycol',
      'Niacinamide',
      'Glycerin',
      'Sodium PCA',
      'Rose Hip Extract',
      'Phenoxyethanol',
      'Ethylhexylglycerin',
      'Ferulic Acid',
      'Xanthan Gum',
      'Sodium Gluconate'
    ],
    benefits: [
      'Tone evening and brightening',
      'Environmental damage protection',
      'Skin plumping via hydration',
      'Collagen stimulation',
      'Hyperpigmentation reduction',
      'Fast absorption'
    ],
    howToUse: 'Apply 2-3 drops post-cleansing and post-toning, massage evenly in circular motions until absorbed, then follow with moisturizer. Daily use is recommended for optimal results.',
    size: '30ml',
    skinType: 'All skin types',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    badge: 'bestseller',
    tags: ['brightening', 'vitamin-c', 'serum', 'anti-aging', 'antioxidant'],
    images: [
      'https://qtways.com/cdn/shop/files/10_-VITAMIN-C-_-0.5_-FERULIC.jpg'
    ],
    featured: true,
    concerns: ['dark-spots', 'dull-skin', 'anti-aging'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'SLS-Free', 'Fragrance-Free', 'Cruelty-Free']
  },
  {
    id: 'fc-002',
    name: '10% Niacinamide + 1% Kojic Acid + 0.5% Vitamin B5 Face Serum',
    slug: '10-niacinamide-kojic-acid-vitamin-b5-serum',
    category: 'face-care',
    subcategory: 'serums',
    categoryName: 'Face Care',
    price: 454,
    originalPrice: 699,
    discount: 35,
    description: 'A dermatologically tested serum combining three active ingredients designed to brighten skin and fade discoloration. Enhances natural glow, fades dark spots, and supports youthful-looking skin.',
    shortDescription: '10% Niacinamide for pore control & brightening',
    ingredients: [
      'Niacinamide (10%)',
      'Kojic Acid (1%)',
      'Vitamin B5 (0.5%)',
      'Vitamin C',
      'Turmeric Extract',
      'Witch Hazel',
      'Alpha Arbutin',
      'Hyaluronic Acid'
    ],
    benefits: [
      'Brightens dull skin',
      'Minimizes pores',
      'Reduces fine lines',
      'Fades hyperpigmentation and dark spots',
      'Hydrates and promotes skin healing'
    ],
    howToUse: 'Apply a small amount to clean, dry skin, massage in circular motions until absorbed. Use daily morning and night for best results.',
    size: '30ml',
    skinType: 'All skin types, ideal for acne-prone skin',
    rating: 4.7,
    reviewCount: 156,
    inStock: false,
    badge: 'sale',
    tags: ['niacinamide', 'brightening', 'pores', 'serum', 'acne'],
    images: [
      'https://qtways.com/cdn/shop/files/10_-NIACINAMIDE.jpg'
    ],
    featured: true,
    concerns: ['acne', 'dark-spots', 'oily-skin', 'pores'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'SLS-Free', 'Fragrance-Free', 'Cruelty-Free']
  },
  {
    id: 'fc-003',
    name: '0.3% Retinol Serum',
    slug: '0-3-retinol-serum',
    category: 'face-care',
    subcategory: 'serums',
    categoryName: 'Face Care',
    price: 454,
    originalPrice: 699,
    discount: 35,
    description: 'A dermatologically tested facial serum designed to power up skincare routines with anti-aging benefits. Combines Retinol with Coenzyme Q10, Bakuchiol Oil, Vitamin E, and D-Panthenol for comprehensive skin rejuvenation.',
    shortDescription: 'Anti-aging retinol serum with Bakuchiol',
    ingredients: [
      'Retinol (0.3%)',
      'Coenzyme Q10',
      'Bakuchiol Oil',
      'Vitamin E',
      'D-Panthenol (Vitamin B5)',
      'Glycerin'
    ],
    benefits: [
      'Reduces fine lines and wrinkles',
      'Enhances skin firmness and elasticity',
      'Evens skin tone and fades dark spots',
      'Provides hydration and soothing effects',
      'Supports skin barrier repair',
      'Offers antioxidant protection',
      'Refines texture and minimizes pores'
    ],
    howToUse: 'Apply a small amount to clean, dry skin via gentle circular massage focusing on areas needing rejuvenation. Use on alternate days, preferably at night, as retinol increases skin sensitivity to sunlight.',
    size: '30ml',
    skinType: 'All skin types',
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    badge: 'bestseller',
    tags: ['retinol', 'anti-aging', 'serum', 'night-care', 'fine-lines'],
    images: [
      'https://qtways.com/cdn/shop/files/0.jpg'
    ],
    featured: true,
    concerns: ['anti-aging', 'fine-lines', 'dark-spots', 'uneven-texture'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'Silicone-Free', 'SLS-Free', 'Fragrance-Free', 'Cruelty-Free']
  },
  {
    id: 'fc-004',
    name: 'Hyaluronic Acid + PGA + Vitamin B5 Face Serum',
    slug: 'hyaluronic-acid-pga-vitamin-b5-serum',
    category: 'face-care',
    subcategory: 'serums',
    categoryName: 'Face Care',
    price: 454,
    originalPrice: 699,
    discount: 35,
    description: 'A hydration-focused serum that provides deep hydration for all skin types, enhances skin elasticity & firmness, and promotes an even complexion through a powerful blend of hyaluronic acid and PGA.',
    shortDescription: 'Deep hydration serum with HA & PGA',
    ingredients: [
      'Sodium Hyaluronate Crosspolymer',
      'Sodium Polyglutamate (PGA)',
      'Copper Ferment',
      'Soybean Ferment',
      'Curcuma Longa (Turmeric)',
      'Hamamelis Virginiana (Witch Hazel)',
      'D-Panthenol (Vitamin B5)',
      'Tetrasodium EDTA',
      'Sodium CMC'
    ],
    benefits: [
      'Deep hydration',
      'Plumps and smooths fine lines',
      'Soothes irritation',
      'Brightens complexion',
      'Nourishes skin',
      'Strengthens skin barrier',
      'Boosts elasticity',
      'Enhances wound healing'
    ],
    howToUse: 'Apply a small amount to clean, dry skin, focusing on areas needing hydration. Massage in circular motions until fully absorbed.',
    size: '30ml',
    skinType: 'All skin types',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    badge: null,
    tags: ['hyaluronic-acid', 'hydrating', 'serum', 'plumping'],
    images: [
      'https://qtways.com/cdn/shop/files/Hyaluronic-Acid-_-PGA.jpg'
    ],
    featured: true,
    concerns: ['dryness', 'fine-lines', 'dull-skin'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'SLS-Free', 'Fragrance-Free', 'Cruelty-Free']
  },

  // ============================================
  // FACE CARE - CLEANSERS & TREATMENTS
  // ============================================
  {
    id: 'fc-005',
    name: 'Vitamin C + E Gel Face Wash',
    slug: 'vitamin-c-e-gel-face-wash',
    category: 'face-care',
    subcategory: 'cleansers',
    categoryName: 'Face Care',
    price: 187,
    originalPrice: 249,
    discount: 25,
    description: 'A powerful blend gel face wash formulated for cleansing that combines soothing, refreshing, and nourishing properties while addressing impurities and excess oil.',
    shortDescription: 'Brightening gel cleanser with Vitamin C & E',
    ingredients: [
      'Vitamin C (Sodium Ascorbyl Phosphate)',
      'Vitamin E Acetate',
      'Strawberry Extract',
      'Aloe Vera Gel',
      'D-Panthenol (Pro-Vitamin B5)',
      'Glycerin',
      'Sodium Gluconate'
    ],
    benefits: [
      'Skin brightening and complexion evening',
      'Antioxidant protection against free radicals',
      'Deep cleansing with gentle formula',
      'Skin barrier strengthening',
      'Long-lasting hydration',
      'Reduced irritation and redness'
    ],
    howToUse: 'Apply a small amount to wet face, massage in circular motions for 30 seconds to 1 minute, then rinse thoroughly. Recommended usage: twice daily.',
    size: '100ml',
    skinType: 'All skin types',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    badge: null,
    tags: ['cleanser', 'vitamin-c', 'gentle', 'brightening'],
    images: [
      'https://qtways.com/cdn/shop/files/vitamin-C_E-Gel.jpg'
    ],
    featured: false,
    concerns: ['dull-skin', 'cleansing'],
    certifications: ['Dermatologically Tested', 'Sulphate-Free', 'Soap-Free', 'Paraben-Free', 'Cruelty-Free', 'Fragrance-Free']
  },
  {
    id: 'fc-006',
    name: '30% AHA + 2% BHA Peeling Solution',
    slug: '30-aha-2-bha-peeling-solution',
    category: 'face-care',
    subcategory: 'treatments',
    categoryName: 'Face Care',
    price: 422,
    originalPrice: 649,
    discount: 35,
    description: 'A dermatologically tested peeling solution combining multiple chemical exfoliants designed to address various skincare concerns through intensive exfoliation. Contains 10% Glycolic Acid, 10% Lactic Acid, 10% Mandelic Acid, and 2% Salicylic Acid.',
    shortDescription: 'Intensive exfoliating peeling solution',
    ingredients: [
      'Glycolic Acid (10%)',
      'Lactic Acid (10%)',
      'Mandelic Acid (10%)',
      'Salicylic Acid (2%)',
      'Aloe Vera Gel',
      'Chamomile Extract',
      'Calendula Extract',
      'Green Tea Extract',
      'D-Panthenol (Pro-Vitamin B5)'
    ],
    benefits: [
      'Removes dead skin cells',
      'Accelerates skin renewal',
      'Enhances radiance',
      'Reduces dark spots and fine lines',
      'Penetrates deep into pores to dissolve excess sebum',
      'Clears blackheads',
      'Supports collagen production'
    ],
    howToUse: 'Apply small amount to cleansed, dry face, avoiding eye and lip areas. Leave on for 10-15 minutes. Rinse thoroughly with lukewarm water. Follow with moisturizer. Use once or twice weekly, preferably evening. Mandatory: Apply sunscreen during the day as AHAs/BHAs increase sun sensitivity.',
    size: '30ml',
    skinType: 'All skin types, particularly beneficial for texture refinement',
    rating: 4.5,
    reviewCount: 112,
    inStock: true,
    badge: 'sale',
    tags: ['exfoliating', 'aha', 'bha', 'peeling', 'acne', 'texture'],
    images: [
      'https://qtways.com/cdn/shop/files/30_-AHA-_-2_-BHA.jpg'
    ],
    featured: false,
    concerns: ['acne', 'uneven-texture', 'blackheads', 'dull-skin'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'SLS-Free', 'Fragrance-Free', 'Cruelty-Free']
  },

  // ============================================
  // FACE CARE - MOISTURIZERS & SUNSCREEN
  // ============================================
  {
    id: 'fc-007',
    name: 'Ceramide Oil Free Moisturizer',
    slug: 'ceramide-oil-free-moisturizer',
    category: 'face-care',
    subcategory: 'moisturizers',
    categoryName: 'Face Care',
    price: 299,
    originalPrice: 399,
    discount: 25,
    description: 'A lightweight moisturizer combining ceramides complex with hyaluronic acid to deliver deep hydration, brighten skin, and provide even skin tone while maintaining an oil-free formula suitable for all skin types.',
    shortDescription: 'Lightweight oil-free moisturizer with Ceramides',
    ingredients: [
      'Ceramides Complex',
      'Hyaluronic Acid (Sodium Hyaluronate Crosspolymer)',
      'Vitamin C (Sodium Ascorbyl Phosphate)',
      'Vitamin E',
      'Aloe Vera Extract',
      'Glycerin'
    ],
    benefits: [
      'Deep hydration and barrier restoration',
      'Skin brightening and tone evening',
      'Antioxidant protection',
      'Soothing and calming effects',
      'Lightweight, non-greasy formula'
    ],
    howToUse: 'Dispense a small amount onto your palm and apply to clean skin. Massage in circular motion, focusing on hydration-needy areas, until fully absorbed. Use daily, morning and night.',
    size: '100ml',
    skinType: 'All skin types, particular benefits for dry skin',
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    badge: null,
    tags: ['moisturizer', 'ceramide', 'oil-free', 'hydrating'],
    images: [
      'https://qtways.com/cdn/shop/files/moisturizer.jpg'
    ],
    featured: true,
    concerns: ['dryness', 'sensitive-skin'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'Sulfate-Free', 'Cruelty-Free', 'Fragrance-Free']
  },
  {
    id: 'fc-008',
    name: 'Ceramide + Hyaluronic Acid Sunscreen Cream SPF 50 PA+++',
    slug: 'ceramide-hyaluronic-acid-sunscreen-spf50',
    category: 'face-care',
    subcategory: 'sunscreen',
    categoryName: 'Face Care',
    price: 239,
    originalPrice: 399,
    discount: 40,
    description: 'A broad spectrum sunscreen offering protection against harmful UVA and UVB rays while maintaining a lightweight, non-greasy formula suitable for daily use. Enriched with Ceramides, Hyaluronic Acid, and Kakadu Plum Extract.',
    shortDescription: 'SPF 50 PA+++ sunscreen with Ceramides',
    ingredients: [
      'Ceramides Complex',
      'Hyaluronic Acid',
      'Aloe Vera',
      'Kakadu Plum Extract',
      'Glycerin',
      'Sunflower Oil'
    ],
    benefits: [
      'Broad spectrum UV protection (SPF 50 PA+++)',
      'Replenishes skin barrier',
      'Locks in moisture',
      'Calms irritation and reduces redness',
      'Brightening and antioxidant protection',
      'Lightweight, non-greasy formula'
    ],
    howToUse: 'Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating. Use as the final step in your skincare routine.',
    size: '50ml',
    skinType: 'Ideal for dry to normal skin, suitable for all skin types',
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    badge: 'bestseller',
    tags: ['sunscreen', 'spf50', 'ceramide', 'uv-protection'],
    images: [
      'https://qtways.com/cdn/shop/files/CERAMIDE-_-HYALURONIC-ACID-SUNSCREEN-CREAM-SPF-50-PA_-Main-AI.jpg'
    ],
    featured: true,
    concerns: ['sun-protection', 'dryness'],
    certifications: ['Dermatologically Tested', 'Paraben-Free', 'Fragrance-Free', 'Cruelty-Free', 'Benzophenone-Free', 'Sulfate-Free', 'Mineral Oil-Free']
  },

  // ============================================
  // SKINCARE KITS
  // ============================================
  {
    id: 'kit-001',
    name: 'Anti Acne Kit Combo',
    slug: 'anti-acne-kit-combo',
    category: 'kits',
    subcategory: 'skin-kits',
    categoryName: 'Skincare Kits',
    price: 989,
    originalPrice: 1649,
    discount: 40,
    description: 'A complete three-product skincare set designed for acne-prone skin management. Includes targeted treatments for hyperpigmentation, acne concerns, and anti-aging benefits.',
    shortDescription: 'Complete acne-fighting skincare routine',
    kitContents: [
      '10% Niacinamide + 1% Kojic Acid + 0.5% Vitamin B5 Face Serum',
      'Vitamin C + E Gel Face Wash',
      '0.3% Retinol Serum'
    ],
    benefits: [
      'Targets acne and blemishes',
      'Reduces hyperpigmentation',
      'Controls excess oil',
      'Anti-aging benefits',
      'Complete routine solution'
    ],
    howToUse: 'Morning: Cleanse with face wash, apply Niacinamide serum. Evening: Cleanse, apply Retinol serum (alternate days initially).',
    size: '1 Kit (3 products)',
    skinType: 'Acne-prone skin',
    rating: 4.5,
    reviewCount: 89,
    inStock: false,
    badge: 'sale',
    tags: ['kit', 'acne', 'combo', 'routine'],
    images: [
      'https://qtways.com/cdn/shop/files/Anti-Acne-Kit-Combo.jpg'
    ],
    featured: true,
    concerns: ['acne', 'dark-spots', 'oily-skin'],
    certifications: ['Dermatologically Tested']
  },
  {
    id: 'kit-002',
    name: 'Anti-Aging Kit Combo',
    slug: 'anti-aging-kit-combo',
    category: 'kits',
    subcategory: 'skin-kits',
    categoryName: 'Skincare Kits',
    price: 1289,
    originalPrice: 2149,
    discount: 40,
    description: 'A comprehensive anti-aging skincare kit designed to reduce fine lines, improve skin elasticity, and promote youthful-looking skin through a curated selection of products.',
    shortDescription: 'Complete anti-aging skincare routine',
    kitContents: [
      '0.3% Retinol Serum',
      '10% Vitamin C & 0.5% Ferulic Acid Serum',
      'Ceramide Oil Free Moisturizer'
    ],
    benefits: [
      'Reduces fine lines and wrinkles',
      'Improves skin elasticity',
      'Brightens and evens skin tone',
      'Deep hydration',
      'Antioxidant protection'
    ],
    howToUse: 'Morning: Apply Vitamin C serum, follow with moisturizer. Evening: Apply Retinol serum (alternate days), follow with moisturizer.',
    size: '1 Kit (3 products)',
    skinType: 'All skin types, especially mature skin',
    rating: 4.7,
    reviewCount: 67,
    inStock: false,
    badge: 'sale',
    tags: ['kit', 'anti-aging', 'combo', 'routine'],
    images: [
      'https://qtways.com/cdn/shop/files/Anti-Aging-kit-Combo_343e7a2d-ed93-4d80-b395-969d47db3517.jpg'
    ],
    featured: true,
    concerns: ['anti-aging', 'fine-lines', 'dull-skin'],
    certifications: ['Dermatologically Tested']
  },
  {
    id: 'kit-003',
    name: 'Anti Wrinkle Kit Combo',
    slug: 'anti-wrinkle-kit-combo',
    category: 'kits',
    subcategory: 'skin-kits',
    categoryName: 'Skincare Kits',
    price: 1229,
    originalPrice: 2049,
    discount: 40,
    description: 'A targeted anti-wrinkle skincare kit formulated to smooth fine lines, boost collagen production, and restore youthful radiance to your skin.',
    shortDescription: 'Targeted wrinkle-fighting skincare routine',
    kitContents: [
      '0.3% Retinol Serum',
      'Hyaluronic Acid + PGA + Vitamin B5 Face Serum',
      'Ceramide Oil Free Moisturizer'
    ],
    benefits: [
      'Smooths fine lines and wrinkles',
      'Boosts skin firmness',
      'Deep hydration and plumping',
      'Barrier restoration',
      'Enhanced elasticity'
    ],
    howToUse: 'Morning: Apply Hyaluronic Acid serum, follow with moisturizer. Evening: Apply Retinol serum (alternate days), follow with moisturizer.',
    size: '1 Kit (3 products)',
    skinType: 'All skin types',
    rating: 4.6,
    reviewCount: 54,
    inStock: false,
    badge: 'sale',
    tags: ['kit', 'anti-wrinkle', 'combo', 'routine'],
    images: [
      'https://qtways.com/cdn/shop/files/Anti-Wrinkle-Kit-Combo_7098ac1e-8eea-4b97-837f-071aee7a2ca4.jpg'
    ],
    featured: false,
    concerns: ['anti-aging', 'fine-lines', 'dryness'],
    certifications: ['Dermatologically Tested']
  },
  {
    id: 'kit-004',
    name: 'Morning Routine Kit',
    slug: 'morning-routine-kit',
    category: 'kits',
    subcategory: 'skin-kits',
    categoryName: 'Skincare Kits',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    description: 'A complete morning skincare routine kit combining brightening serums with hydrating and sun-protective formulations for comprehensive AM skincare needs.',
    shortDescription: 'Complete morning skincare routine',
    kitContents: [
      '10% Niacinamide + 1% Kojic Acid + 0.5% Vitamin B5 Face Serum',
      'Ceramide Oil Free Moisturizer',
      'Ceramide + Hyaluronic Acid Sunscreen Cream SPF 50 PA+++'
    ],
    benefits: [
      'Brightening and pore minimizing',
      'Deep hydration',
      'Complete sun protection',
      'Oil control',
      'Ready-to-go routine'
    ],
    howToUse: 'Step 1: Apply Niacinamide serum to clean skin. Step 2: Follow with Ceramide moisturizer. Step 3: Finish with SPF 50 sunscreen.',
    size: '1 Kit (3 products)',
    skinType: 'All skin types',
    rating: 4.8,
    reviewCount: 92,
    inStock: false,
    badge: 'bestseller',
    tags: ['kit', 'morning', 'routine', 'combo', 'spf'],
    images: [
      'https://qtways.com/cdn/shop/files/Morning-Routine-kit_e45b8ed2-514f-4c75-a4d9-4b37b705ba28.jpg'
    ],
    featured: true,
    concerns: ['daily-care', 'sun-protection', 'brightening'],
    certifications: ['Dermatologically Tested']
  },
  {
    id: 'kit-005',
    name: 'Evening Routine Kit',
    slug: 'evening-routine-kit',
    category: 'kits',
    subcategory: 'skin-kits',
    categoryName: 'Skincare Kits',
    price: 1049,
    originalPrice: 1749,
    discount: 40,
    description: 'A complete evening skincare routine kit targeting anti-aging skin care, combining exfoliation, targeted treatment, and moisture restoration.',
    shortDescription: 'Complete evening skincare routine',
    kitContents: [
      '0.3% Retinol Serum',
      'Ceramide Oil Free Moisturizer',
      '30% AHA + 2% BHA Peeling Solution'
    ],
    benefits: [
      'Intensive overnight repair',
      'Exfoliation and cell renewal',
      'Anti-aging benefits',
      'Barrier restoration',
      'Smoother skin texture'
    ],
    howToUse: 'Option 1: Apply Retinol serum, follow with moisturizer. Option 2 (1-2x weekly): Use Peeling Solution, rinse, apply moisturizer. Alternate Retinol and Peeling Solution.',
    size: '1 Kit (3 products)',
    skinType: 'All skin types',
    rating: 4.7,
    reviewCount: 78,
    inStock: false,
    badge: 'sale',
    tags: ['kit', 'evening', 'routine', 'combo', 'night-care'],
    images: [
      'https://qtways.com/cdn/shop/files/Evening-Routine-kit.jpg'
    ],
    featured: true,
    concerns: ['anti-aging', 'uneven-texture', 'fine-lines'],
    certifications: ['Dermatologically Tested']
  },
  {
    id: 'kit-006',
    name: 'Oily Skin Kit Combo',
    slug: 'oily-skin-kit-combo',
    category: 'kits',
    subcategory: 'skin-kits',
    categoryName: 'Skincare Kits',
    price: 929,
    originalPrice: 1549,
    discount: 40,
    description: 'A specialized skincare kit designed for oily skin types, featuring oil-control formulations that minimize pores, control sebum production, and maintain a matte finish.',
    shortDescription: 'Oil-control skincare routine',
    kitContents: [
      '10% Niacinamide + 1% Kojic Acid + 0.5% Vitamin B5 Face Serum',
      'Vitamin C + E Gel Face Wash',
      'Ceramide Oil Free Moisturizer'
    ],
    benefits: [
      'Controls excess oil production',
      'Minimizes pore appearance',
      'Gentle cleansing',
      'Oil-free hydration',
      'Matte finish'
    ],
    howToUse: 'Morning & Evening: Cleanse with gel face wash, apply Niacinamide serum, finish with oil-free moisturizer.',
    size: '1 Kit (3 products)',
    skinType: 'Oily and combination skin',
    rating: 4.5,
    reviewCount: 63,
    inStock: false,
    badge: 'sale',
    tags: ['kit', 'oily-skin', 'combo', 'oil-control'],
    images: [
      'https://qtways.com/cdn/shop/files/Oily-Skin-Kit-Combo.jpg'
    ],
    featured: false,
    concerns: ['oily-skin', 'pores', 'acne'],
    certifications: ['Dermatologically Tested']
  },

  // ============================================
  // HEALTH & WELLNESS - SUPPLEMENTS
  // ============================================
  {
    id: 'hw-001',
    name: 'Protigud™ Whey Protein Powder',
    slug: 'protigud-whey-protein-powder',
    category: 'health-wellness',
    subcategory: 'protein',
    categoryName: 'Health & Wellness',
    price: 1067,
    originalPrice: 1334,
    discount: 20,
    description: 'An advanced protein supplement featuring 100% Whey Protein Powder with L-Carnitine, HMB, Amino Acids, DHA, GLA, MUFA, PUFA, 28 Vitamins and Minerals. Formulated to support muscle development, repair, and immune system performance.',
    shortDescription: 'Advanced whey protein with 28 vitamins & minerals',
    ingredients: [
      '100% Whey Protein (50g per 100g)',
      'L-Carnitine',
      'HMB',
      'Amino Acids (BCAA)',
      'DHA',
      'GLA',
      'MUFA',
      'PUFA',
      '28 Vitamins and Minerals',
      'Sucralose (Non-caloric sweetener)'
    ],
    benefits: [
      'Muscle growth and strength development',
      'Boosts immune system performance',
      'Trans-fat free formulation',
      'Vegetarian friendly',
      'Diabetic friendly (zero added sugar)',
      'No soya content',
      'Low glycemic index',
      'Gluten-free',
      'Recommended for recovery'
    ],
    howToUse: 'Mix one scoop (25g) with 200ml water or milk. Consume post-workout or as advised by healthcare professional.',
    size: '400g',
    flavor: 'Vanilla',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    badge: 'new',
    tags: ['protein', 'supplement', 'whey', 'fitness', 'muscle'],
    images: [
      'https://qtways.com/cdn/shop/files/Protigud.jpg'
    ],
    featured: true,
    certifications: ['Vegetarian', 'Gluten-Free', 'Zero Added Sugar']
  },
  {
    id: 'hw-002',
    name: 'Glustar® Pro',
    slug: 'glustar-pro',
    category: 'health-wellness',
    subcategory: 'supplements',
    categoryName: 'Health & Wellness',
    price: 568,
    originalPrice: 710,
    discount: 20,
    description: 'A dietary supplement in tablet form designed to support blood sugar management, antioxidant protection, and metabolic function. Contains a blend of Wild Ginger, Berberine, Alpha Lipoic Acid, and essential vitamins.',
    shortDescription: 'Blood sugar management supplement',
    ingredients: [
      'Wild Ginger (Costus Speciosus)',
      'Magnesium Gluconate',
      'Alpha Lipoic Acid',
      'Evening Primrose Oil',
      'Inositol',
      'Zinc Citrate',
      'Vitamin E (D-Alpha Tocopherol)',
      'Vitamin A (Retinyl Acetate)',
      'Chromium Picolinate',
      'Folic Acid',
      'Selenium (Sodium Selenate)',
      'Biotin',
      'Vitamin B12 (Cyanocobalamin)',
      'Berberine HCl 50%',
      'Wild Bitter Melon Extract',
      'Green Algae Extract',
      'Metavive'
    ],
    benefits: [
      'Blood sugar regulation',
      'Cardiovascular health support',
      'Cognitive function enhancement',
      'Skin and hair health',
      'Antioxidant protection',
      'Immune support',
      'Metabolic support',
      'Hormonal balance',
      'Digestive health'
    ],
    howToUse: 'Take as directed by healthcare professional. Typically 1 tablet daily with meals.',
    size: '30 tablets',
    rating: 4.5,
    reviewCount: 45,
    inStock: true,
    badge: null,
    tags: ['supplement', 'blood-sugar', 'diabetes', 'metabolic'],
    images: [
      'https://qtways.com/cdn/shop/files/Glustar-pro.jpg'
    ],
    featured: false,
    certifications: []
  },
  {
    id: 'hw-003',
    name: 'Neuroglad™',
    slug: 'neuroglad',
    category: 'health-wellness',
    subcategory: 'supplements',
    categoryName: 'Health & Wellness',
    price: 683,
    originalPrice: 854,
    discount: 20,
    description: 'A dietary supplement for management of chronic nerve pain, to support joint health, enhanced cognitive function and reduces neuroinflammation. Combines PEA, Acetyl-L-Carnitine, and Boscurin for comprehensive neurological support.',
    shortDescription: 'Nerve pain & cognitive support supplement',
    ingredients: [
      'Palmitoylethanolamide (PEA) – 300mg',
      'Acetyl-L-Carnitine (ALC) – 250mg',
      'Boscurin – 150mg (Boswellia serrata + Curcuma longa 3:1 blend)'
    ],
    benefits: [
      'Supports nerve function and joint health',
      'Manages chronic neuropathic pain',
      'Addresses peripheral neuropathy and sciatica',
      'Supports cognitive function',
      'Reduces neuroinflammation',
      'Improves cellular energy production',
      'Enhances physical stamina'
    ],
    howToUse: 'Take as directed by healthcare professional.',
    size: '30 tablets',
    rating: 4.7,
    reviewCount: 34,
    inStock: false,
    badge: null,
    tags: ['supplement', 'nerve-pain', 'cognitive', 'joint-health'],
    images: [
      'https://qtways.com/cdn/shop/files/Neuroglad.jpg'
    ],
    featured: false,
    certifications: []
  },
  {
    id: 'hw-004',
    name: 'Varinorm™',
    slug: 'varinorm',
    category: 'health-wellness',
    subcategory: 'supplements',
    categoryName: 'Health & Wellness',
    price: 683,
    originalPrice: 854,
    discount: 20,
    description: 'A premium dietary supplement designed to treat varicose veins and hemorrhoids (piles) through improved vein circulation and vascular health support. Contains Diosmin, Hesperidin, Horse Chestnut, and Gotu Kola.',
    shortDescription: 'Vein health & circulation supplement',
    ingredients: [
      'Horse Chestnut Seed Extract (162mg) with Escin',
      'Gotu Kola (30mg)',
      'Diosmin (450mg)',
      'Hesperidin (50mg)'
    ],
    benefits: [
      'Treatment of hemorrhoids',
      'Reduces bleeding and itching',
      'Relieves pain, heaviness, and burning from varicose veins',
      'Strengthens blood vessels',
      'Prevents further vascular damage',
      'Manages chronic venous insufficiency',
      'Reduces inflammation and oxidative stress',
      'Enhances vein circulation',
      'Improves skin and tissue health'
    ],
    howToUse: 'Take as directed by healthcare professional.',
    size: '30 tablets',
    rating: 4.4,
    reviewCount: 28,
    inStock: true,
    badge: null,
    tags: ['supplement', 'varicose-veins', 'circulation', 'hemorrhoids'],
    images: [
      'https://qtways.com/cdn/shop/files/Varinorm-Slides.jpg'
    ],
    featured: false,
    certifications: []
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getProductById = (id) => products.find(p => p.id === id);

export const getProductBySlug = (slug) => products.find(p => p.slug === slug);

export const getProductsByCategory = (category) => products.filter(p => p.category === category);

export const getProductsBySubcategory = (subcategory) => products.filter(p => p.subcategory === subcategory);

export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getBestSellers = () => products.filter(p => p.badge === 'bestseller');

export const getNewArrivals = () => products.filter(p => p.badge === 'new');

export const getSaleProducts = () => products.filter(p => p.badge === 'sale' || p.discount > 0);

export const getInStockProducts = () => products.filter(p => p.inStock);

export const getProductsByConcern = (concern) => products.filter(p => p.concerns?.includes(concern));

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.shortDescription?.toLowerCase().includes(lowercaseQuery) ||
    p.tags.some(tag => tag.includes(lowercaseQuery)) ||
    p.categoryName.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter(p => p.id !== productId && (
      p.category === product.category ||
      p.concerns?.some(c => product.concerns?.includes(c))
    ))
    .slice(0, limit);
};

export const sortProducts = (productList, sortBy) => {
  const sorted = [...productList];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    case 'discount':
      return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default:
      return sorted;
  }
};

export const filterProducts = (productList, filters) => {
  let filtered = [...productList];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.subcategory) {
    filtered = filtered.filter(p => p.subcategory === filters.subcategory);
  }

  if (filters.concern) {
    filtered = filtered.filter(p => p.concerns?.includes(filters.concern));
  }

  if (filters.inStock) {
    filtered = filtered.filter(p => p.inStock);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }

  if (filters.badge) {
    filtered = filtered.filter(p => p.badge === filters.badge);
  }

  return filtered;
};

export default products;
