/**
 * Site-wide configuration for QTWAYS website
 */

export const siteConfig = {
  // Brand Info
  name: 'QTWAYS',
  legalName: 'SHILPEX PHARMYSIS',
  tagline: 'Premium Skincare, Naturally Yours',
  description: 'Discover premium skincare products at QTWAYS. Natural ingredients, visible results.',

  // Contact Information
  contact: {
    phone: '+91 7669417555',
    phoneRaw: '917669417555',
    email: 'qtways2024@gmail.com',
    whatsapp: 'https://wa.me/917669417555',
    address: {
      line1: 'Ground Floor, A-01',
      line2: 'Functional Industrial Estate',
      area: 'Patparganj',
      city: 'Delhi',
      pincode: '110092',
      country: 'India',
      full: 'Ground Floor, A-01, Functional Industrial Estate, Patparganj, Delhi 110092'
    }
  },

  // Social Media Links
  social: {
    instagram: {
      url: 'https://www.instagram.com/qtways/',
      handle: '@qtways'
    },
    facebook: {
      url: 'https://www.facebook.com/people/QTways/61571639267098/',
      handle: 'QTways'
    },
    youtube: {
      url: 'https://youtube.com/@qtways-h3z',
      handle: '@qtways-h3z'
    },
    twitter: {
      url: 'https://x.com/qtways2024',
      handle: '@qtways2024'
    }
  },

  // SEO Defaults
  seo: {
    title: 'QTWAYS - Premium Skincare Products',
    titleTemplate: '%s | QTWAYS',
    defaultDescription: 'Shop premium skincare products at QTWAYS. Natural ingredients for radiant, healthy skin. Free shipping on orders above ₹999.',
    keywords: [
      'skincare',
      'natural skincare',
      'premium skincare',
      'face care',
      'body care',
      'Indian skincare',
      'QTWAYS'
    ],
    ogImage: '/images/og-image.jpg',
    twitterCard: 'summary_large_image'
  },

  // Shipping & Policies
  shipping: {
    freeShippingThreshold: 999,
    estimatedDays: {
      metro: '3-5',
      nonMetro: '5-7'
    },
    message: 'Free shipping on orders above ₹999'
  },

  // Currency
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN'
  },

  // Feature Flags
  features: {
    wishlist: false,
    reviews: true,
    search: true,
    newsletter: true,
    whatsappChat: true
  }
};

// Navigation Links
export const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  categories: [
    { name: 'Face Care', href: '/category/face-care' },
    { name: 'Body Care', href: '/category/body-care' },
    { name: 'Hair Care', href: '/category/hair-care' },
    { name: 'Health & Wellness', href: '/category/health-wellness' }
  ],
  footer: {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?filter=new' },
      { name: 'Best Sellers', href: '/shop?filter=bestseller' },
      { name: 'Sale', href: '/shop?filter=sale' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Our Story', href: '/about#story' }
    ],
    support: [
      { name: 'Shipping Policy', href: '/shipping-policy' },
      { name: 'Return Policy', href: '/return-policy' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ]
  }
};

// Announcement Bar Messages
export const announcements = [
  {
    id: 1,
    text: 'Free Shipping on orders above ₹999',
    link: null
  },
  {
    id: 2,
    text: 'New Arrivals - Shop the latest skincare essentials',
    link: '/shop?filter=new'
  },
  {
    id: 3,
    text: 'Subscribe to our newsletter for 10% off',
    link: '#newsletter'
  }
];

// Trust Badges
export const trustBadges = [
  {
    id: 1,
    icon: 'Truck',
    title: 'Free Shipping',
    description: 'On orders above ₹999'
  },
  {
    id: 2,
    icon: 'Shield',
    title: '100% Authentic',
    description: 'Genuine products only'
  },
  {
    id: 3,
    icon: 'RotateCcw',
    title: 'Easy Returns',
    description: '7-day return policy'
  },
  {
    id: 4,
    icon: 'HeadphonesIcon',
    title: 'Customer Support',
    description: 'Mon-Sat, 10AM-6PM'
  }
];

export default siteConfig;
