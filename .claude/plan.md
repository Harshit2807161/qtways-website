# QTWAYS Website Revamp - Complete Project Plan

> **Status**: Ready for implementation
> **Created**: January 7, 2026
> **Last Updated**: January 7, 2026

---

# TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Project Requirements Document (PRD)](#project-requirements-document-prd)
3. [Engineering Design Document (EDD)](#engineering-design-document-edd)
4. [Implementation Roadmap](#implementation-roadmap)
5. [CLAUDE.md Template (Filled)](#claudemd-template-filled)
6. [Quick Reference](#quick-reference)

---

# EXECUTIVE SUMMARY

## Project Overview
Revamp QTWAYS skincare startup website from Shopify to a custom React + Tailwind CSS implementation. The design will mimic the luxury aesthetic of [Kimirica.shop](https://www.kimirica.shop/) while maintaining QTWAYS brand identity, products, and content.

## Key Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Project Setup | Starting fresh | No existing codebase |
| MVP Scope | Homepage only | Focus on core design first |
| Content Source | Extract from qtways.com | Use existing brand content |
| Hosting | Vercel | Free tier, great for React |
| Database (V1+) | MongoDB Atlas | Cloud-hosted, free tier |
| Images | Extract from qtways.com | Real product images |
| Build Tool | Vite + npm | Fast builds, modern setup |
| Brand Values | Keep QTWAYS values | Maintain brand identity |

## Version Roadmap Summary
- **MVP**: Homepage with Kimirica-style design, static content, Vercel deployment
- **V1**: All pages, MongoDB backend, authentication, cart, accessibility
- **V2**: Dark/light themes, chatbot, Stripe payments

---

# PROJECT REQUIREMENTS DOCUMENT (PRD)

## 1. Problem Statement

QTWAYS is a skincare startup currently using a Shopify website (qtways.com). The founder wants:
- Full code control over the website
- A luxury, high-end design aesthetic like Kimirica
- Modern tech stack (MERN) for future scalability
- Ability to add custom features (chatbot, themes, etc.)

## 2. Goals & Success Metrics

### MVP Goals
- [ ] Create a pixel-perfect homepage mimicking Kimirica's design
- [ ] Populate with QTWAYS products, content, and branding
- [ ] Achieve responsive design across all devices
- [ ] Deploy to Vercel with custom domain ready

### Success Metrics
- Page load time < 3 seconds
- Lighthouse score > 90 (Performance, Accessibility)
- Mobile-first responsive design
- All interactive elements functional

## 3. Target Users

- **Primary**: Skincare enthusiasts in India (18-45 years)
- **Secondary**: Gift buyers looking for skincare products
- **Device Split**: ~70% mobile, ~30% desktop (India market)

## 4. MVP Feature Requirements

### 4.1 Homepage Sections (18 components)

Based on analysis of Kimirica homepage, here are the sections to implement:

| # | Section | Description | QTWAYS Adaptation |
|---|---------|-------------|-------------------|
| 1 | **Announcement Bar** | Scrolling promo banner | "Upto 40% OFF on All Skincare Products" |
| 2 | **Header** | Logo, nav, search, cart, account | QTWAYS logo, simplified nav |
| 3 | **Hero Section** | Full-width video/image with CTA | "Discover Scientific Skincare" |
| 4 | **Iconic Selections** | Category carousel | Serums, Combo Kits, Daily Essentials |
| 5 | **Prime Picks** | Tabbed product grid (Best Sellers/New) | QTWAYS Best Sellers |
| 6 | **Featured Banner** | Mid-page promotional section | "Transform Your Skin Routine" |
| 7 | **Trust Badges** | 6 commitment icons | See Section 4.2 |
| 8 | **Shop by Concern** | Concern-based navigation grid | 8 skin concerns |
| 9 | **Shop by Category** | Category cards with images | Skin Care, Health & Wellness |
| 10 | **Product Grid** | Featured products carousel | 8-12 products |
| 11 | **Testimonials** | Customer review carousel | 5+ reviews |
| 12 | **Brand Story** | Founder quote/mission | QTWAYS mission |
| 13 | **Newsletter** | Email subscription form | UI only for MVP |
| 14 | **Footer** | Links, contact, social | Full footer |
| 15 | **WhatsApp Button** | Floating chat button | WhatsApp link |
| 16 | **Mobile Nav** | Hamburger menu drawer | Category navigation |
| 17 | **Search Modal** | Product search overlay | UI only for MVP |
| 18 | **Cart Drawer** | Slide-out cart preview | UI only for MVP |

### 4.2 QTWAYS Trust Badges (adapted from Kimirica)

| Badge | Title | Subtitle |
|-------|-------|----------|
| 1 | DERMATOLOGIST TESTED | Safe for All Skin Types |
| 2 | CRUELTY-FREE | Never Tested on Animals |
| 3 | MADE IN INDIA | Quality Skincare, Local Pride |
| 4 | SCIENTIFIC FORMULATIONS | Clinically Proven Ingredients |
| 5 | PARABEN-FREE | Clean, Safe Formulas |
| 6 | SUITABLE FOR ALL SKIN | Universal Skincare Solutions |

### 4.3 Shop by Concern (8 categories)

1. Dry Skin
2. Oily Skin
3. Anti-Aging
4. Anti-Wrinkle
5. Acne Prone Skin
6. Sun Protection
7. Hyperpigmentation
8. Dull Skin

### 4.4 Product Categories

**Combo Kits:**
- Anti Acne Kit Combo (Rs. 989 / Rs. 1,649 - 40% OFF)
- Anti-Aging Kit Combo (Rs. 1,289 / Rs. 2,149 - 40% OFF)
- Anti Wrinkle Kit Combo (Rs. 1,229 - 40% OFF)
- Morning Routine Kit (Rs. 899 - 40% OFF)
- Evening Routine Kit (Rs. 1,049 - 40% OFF)
- Oily Skin Kit Combo (Rs. 929 - 40% OFF)

**Serums:**
- 0.3% Retinol Serum (Rs. 454.35 / Rs. 699 - 35% OFF)
- 10% Vitamin C + 0.5% Ferulic Acid (Rs. 519.35 / Rs. 799 - 35% OFF)
- 10% Niacinamide + 1% Kojic Acid (Rs. 454.35 - 35% OFF)
- Hyaluronic Acid + PGA + B5 (Rs. 454.35 - 35% OFF)
- 30% AHA + 2% BHA Peeling Solution (Rs. 421.85 / Rs. 649 - 35% OFF)

**Daily Essentials:**
- Ceramide Oil Free Moisturizer (Rs. 299.25 / Rs. 399 - 25% OFF)
- Vitamin C + E Gel Face Wash (Rs. 186.75 - 25% OFF)
- Ceramide + HA Sunscreen SPF 50 (Rs. 239.40 - 40% OFF)

**Health & Wellness:**
- Protigud (Rs. 1,067 / Rs. 1,334 - 20% OFF)

## 5. Non-Functional Requirements

### Performance
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Total page size < 3MB
- Image optimization (WebP, lazy loading)

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatible
- Color contrast ratios met

### SEO
- Semantic HTML
- Meta tags (title, description, OG)
- Structured data (Product schema)
- Sitemap generation

### Browser Support
- Chrome, Firefox, Safari, Edge (last 2 versions)
- Mobile Safari, Chrome Mobile

## 6. Out of Scope (MVP)

- User authentication/accounts
- Shopping cart functionality (backend)
- Payment processing
- Order management
- Admin dashboard
- Product search (backend)
- Reviews submission
- Email newsletter integration
- Analytics integration

---

# ENGINEERING DESIGN DOCUMENT (EDD)

## 1. Technical Architecture

### 1.1 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 18.2.x |
| Build Tool | Vite | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| Routing | React Router | 6.x |
| Animations | Framer Motion | 10.x |
| Carousel | Swiper | 11.x |
| Icons | Lucide React | 0.x |
| Package Manager | npm | 10.x |
| Hosting | Vercel | - |

### 1.2 Project Structure

```
qtways-website/
├── .claude/
│   └── CLAUDE.md                 # AI assistant instructions
├── .playwright-mcp/              # Existing screenshots (reference)
├── context/
│   ├── design-principles.md      # UI/UX guidelines (Adapted to mimic Kimirica's design)
│   └── style-guide.md            # Design tokens (Adapted to mimic Kimirica's design)
├── docs/
│   └── project_spec.md           # This document (copy)
├── public/
│   ├── images/
│   │   ├── products/             # Product images
│   │   ├── icons/                # SVG icons
│   │   ├── hero/                 # Hero banners
│   │   ├── badges/               # Trust badge icons
│   │   └── social/               # Social media icons
│   ├── fonts/                    # Custom fonts (if needed)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AnnouncementBar.jsx
│   │   │   └── MobileNav.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── IconicSelections.jsx
│   │   │   ├── PrimePicks.jsx
│   │   │   ├── FeaturedBanner.jsx
│   │   │   ├── TrustBadges.jsx
│   │   │   ├── ShopByConcern.jsx
│   │   │   ├── ShopByCategory.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── BrandStory.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── Rating.jsx
│   │   │   └── Carousel.jsx
│   │   └── common/
│   │       ├── SearchModal.jsx
│   │       ├── CartDrawer.jsx
│   │       └── WhatsAppButton.jsx
│   ├── data/
│   │   ├── products.js           # Product catalog
│   │   ├── categories.js         # Category definitions
│   │   ├── concerns.js           # Skin concerns
│   │   ├── testimonials.js       # Customer reviews
│   │   └── siteConfig.js         # Brand info, links
│   ├── hooks/
│   │   ├── useCart.js            # Cart state (UI only)
│   │   ├── useModal.js           # Modal state
│   │   └── useMediaQuery.js      # Responsive helpers
│   ├── styles/
│   │   └── globals.css           # Tailwind + custom CSS
│   ├── utils/
│   │   ├── formatPrice.js        # INR formatting
│   │   └── cn.js                 # classNames utility
│   ├── pages/
│   │   └── HomePage.jsx          # Main page component
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 1.3 Component Hierarchy

```
App
├── AnnouncementBar
├── Header
│   ├── Logo
│   ├── Navigation (desktop)
│   ├── SearchButton → SearchModal
│   ├── CartButton → CartDrawer
│   └── AccountButton
├── MobileNav (drawer)
├── HomePage
│   ├── Hero
│   ├── IconicSelections (Carousel)
│   ├── PrimePicks
│   │   ├── TabButtons
│   │   └── ProductGrid → ProductCard[]
│   ├── FeaturedBanner
│   ├── TrustBadges → Badge[]
│   ├── ShopByConcern → CategoryCard[]
│   ├── ShopByCategory → CategoryCard[]
│   ├── ProductGrid → ProductCard[]
│   ├── Testimonials (Carousel) → TestimonialCard[]
│   ├── BrandStory
│   └── Newsletter
├── Footer
│   ├── NewsletterForm
│   ├── FooterLinks
│   ├── SocialLinks
│   └── ContactInfo
└── WhatsAppButton
```

## 2. Design System

### 2.1 Color Palette (Kimirica-inspired, adapted for QTWAYS)

```javascript
// tailwind.config.js colors
colors: {
  // Primary - Warm neutrals
  cream: {
    50: '#FDFBF7',
    100: '#FAF6ED',
    200: '#F5EED8',
  },
  // Accent - Gold/Brass tones
  gold: {
    400: '#C9A962',
    500: '#B8973D',
    600: '#9A7B2F',
  },
  // Text
  charcoal: {
    700: '#3D3D3D',
    800: '#2D2D2D',
    900: '#1A1A1A',
  },
  // Success/CTA
  sage: {
    500: '#6B8E6B',
    600: '#5A7A5A',
  },
  // Error
  coral: {
    500: '#E57373',
  },
}
```

### 2.2 Typography

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Playfair Display', 'Georgia', 'serif'],
}

fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  'base': ['1rem', { lineHeight: '1.5rem' }],
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
}
```

### 2.3 Spacing Scale

```javascript
// Using Tailwind defaults with these key values:
// 4 = 1rem (16px) - base unit
// Section padding: py-16 md:py-24 (64px / 96px)
// Component gaps: gap-4 md:gap-6 (16px / 24px)
// Card padding: p-4 md:p-6 (16px / 24px)
```

### 2.4 Breakpoints

```javascript
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

## 3. Component Specifications

### 3.1 ProductCard

```jsx
// Props
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  hoverImage?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

// Features
- Image with hover swap effect
- Sale badge (% off)
- Star rating display
- Price with strikethrough original
- "Add to Cart" or "Notify Me" button
- Responsive sizing
```

### 3.2 Carousel (using Swiper)

```jsx
// Common configuration
const carouselConfig = {
  spaceBetween: 16,
  slidesPerView: 1,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
  navigation: true,
  pagination: { clickable: true },
};
```

### 3.3 Header

```jsx
// Features
- Sticky on scroll
- Logo (left on mobile, center on desktop)
- Search icon → opens SearchModal
- Cart icon with badge count
- Account icon (UI only)
- Hamburger menu on mobile → MobileNav drawer
```

## 4. Data Models

### 4.1 Product Schema

```javascript
// src/data/products.js
export const products = [
  {
    id: "anti-acne-kit",
    name: "Anti Acne Kit Combo",
    slug: "anti-acne-kit-combo",
    description: "Complete kit with Niacinamide serum, Vitamin C face wash, and Retinol serum",
    price: 989,
    originalPrice: 1649,
    discount: 40,
    category: "combo-kits",
    concerns: ["acne-prone-skin", "oily-skin"],
    images: [
      "/images/products/anti-acne-kit-1.jpg",
      "/images/products/anti-acne-kit-2.jpg"
    ],
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    isBestSeller: true,
    isNew: false,
    ingredients: ["Niacinamide", "Vitamin C", "Retinol"],
  },
  // ... more products
];
```

### 4.2 Category Schema

```javascript
// src/data/categories.js
export const categories = [
  {
    id: "combo-kits",
    name: "Combo Kits",
    slug: "combo-kits",
    image: "/images/categories/combo-kits.jpg",
    productCount: 6,
  },
  {
    id: "serums",
    name: "Serums",
    slug: "serums",
    image: "/images/categories/serums.jpg",
    productCount: 5,
  },
  {
    id: "daily-essentials",
    name: "Daily Essentials",
    slug: "daily-essentials",
    image: "/images/categories/daily-essentials.jpg",
    productCount: 3,
  },
];
```

### 4.3 Site Config Schema

```javascript
// src/data/siteConfig.js
export const siteConfig = {
  brand: {
    name: "QTWAYS",
    tagline: "Scientific Skincare Solutions",
    description: "Transform your skin with clinically proven formulations",
  },
  company: {
    legalName: "SHILPEX PHARMYSIS",
    address: "Ground Floor, A-01, Functional Industrial Estate, Patparganj, Delhi 110092",
    phone: "7669417555",
    email: "qtways2024@gmail.com",
  },
  social: {
    facebook: "https://www.facebook.com/people/QTways/61571639267098/",
    instagram: "https://www.instagram.com/qtways/",
    youtube: "https://youtube.com/@qtways-h3z",
    twitter: "https://x.com/qtways2024",
    whatsapp: "https://wa.me/917669417555",
  },
  announcement: "Upto 40% OFF on All Skincare Products",
  footer: {
    aboutLinks: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    policyLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "Shipping Policy", href: "/shipping" },
    ],
  },
};
```

## 5. API Design (V1+ - Future)

### 5.1 REST Endpoints

```
GET    /api/products              # List all products
GET    /api/products/:slug        # Get single product
GET    /api/products/category/:id # Products by category
GET    /api/products/concern/:id  # Products by concern
GET    /api/categories            # List categories
GET    /api/testimonials          # List testimonials
POST   /api/newsletter            # Subscribe email
POST   /api/auth/login            # Login
POST   /api/auth/register         # Register
POST   /api/auth/otp/send         # Send OTP
POST   /api/auth/otp/verify       # Verify OTP
GET    /api/cart                  # Get cart
POST   /api/cart/add              # Add to cart
DELETE /api/cart/:itemId          # Remove from cart
POST   /api/orders                # Create order
GET    /api/orders/:id            # Get order
```

### 5.2 MongoDB Collections (V1+)

```javascript
// Collections
- users
- products
- categories
- orders
- cart
- reviews
- newsletter_subscribers
```

## 6. Image Strategy

### 6.1 Sources
- Product images: Extract from qtways.com
- Hero images: Create/source high-quality skincare imagery
- Icons: Lucide React + custom SVGs
- Trust badges: Custom designed or icon library
- Flexibility to adapt to user given image and banner assets as well 

### 6.2 Optimization
- Format: WebP with JPEG fallback
- Sizes: Multiple sizes for srcset
- Loading: Lazy loading for below-fold images
- CDN: Vercel Image Optimization

### 6.3 Image Dimensions

| Use Case | Dimensions | Format |
|----------|------------|--------|
| Product card | 400x400 | WebP |
| Product hover | 400x400 | WebP |
| Hero desktop | 1920x800 | WebP |
| Hero mobile | 768x600 | WebP |
| Category card | 600x400 | WebP |
| Testimonial avatar | 80x80 | WebP |
| Logo | 200x60 | SVG |
| Icons | 24x24 | SVG |

---

# IMPLEMENTATION ROADMAP

## Step 1: Project Initialization

```bash
# Commands to run
npm create vite@latest qtways-website -- --template react
cd qtways-website
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom swiper framer-motion lucide-react
```

**Files to create/modify:**
- `tailwind.config.js` - Custom theme
- `src/styles/globals.css` - Tailwind imports
- `vite.config.js` - Path aliases
- `.claude/CLAUDE.md` - From template below

## Step 2: Design System Setup

**Tasks:**
1. Configure Tailwind theme (colors, fonts, spacing)
2. Create base UI components (Button, Badge)
3. Set up global styles
4. Create utility functions (cn, formatPrice)

**Files:**
- `tailwind.config.js`
- `src/components/ui/Button.jsx`
- `src/components/ui/Badge.jsx`
- `src/utils/cn.js`
- `src/utils/formatPrice.js`

## Step 3: Layout Components

**Tasks:**
1. Build Header with responsive navigation
2. Build Footer with all sections
3. Build AnnouncementBar with animation
4. Build MobileNav drawer

**Files:**
- `src/components/layout/Header.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/layout/AnnouncementBar.jsx`
- `src/components/layout/MobileNav.jsx`

## Step 4: Data Layer

**Tasks:**
1. Create products data file
2. Create categories data file
3. Create site config
4. Download/organize product images

**Files:**
- `src/data/products.js`
- `src/data/categories.js`
- `src/data/concerns.js`
- `src/data/testimonials.js`
- `src/data/siteConfig.js`
- `public/images/products/*`

## Step 5: Homepage Sections (Part 1)

**Tasks:**
1. Hero section with background image/video
2. IconicSelections carousel
3. PrimePicks with tabs
4. ProductCard component

**Files:**
- `src/components/sections/Hero.jsx`
- `src/components/sections/IconicSelections.jsx`
- `src/components/sections/PrimePicks.jsx`
- `src/components/ui/ProductCard.jsx`

## Step 6: Homepage Sections (Part 2)

**Tasks:**
1. TrustBadges grid
2. ShopByConcern grid
3. ShopByCategory cards
4. FeaturedBanner

**Files:**
- `src/components/sections/TrustBadges.jsx`
- `src/components/sections/ShopByConcern.jsx`
- `src/components/sections/ShopByCategory.jsx`
- `src/components/sections/FeaturedBanner.jsx`
- `src/components/ui/CategoryCard.jsx`

## Step 7: Homepage Sections (Part 3)

**Tasks:**
1. Testimonials carousel
2. BrandStory section
3. Newsletter form
4. ProductGrid component

**Files:**
- `src/components/sections/Testimonials.jsx`
- `src/components/sections/BrandStory.jsx`
- `src/components/sections/Newsletter.jsx`
- `src/components/sections/ProductGrid.jsx`
- `src/components/ui/TestimonialCard.jsx`

## Step 8: Interactive Components

**Tasks:**
1. SearchModal with product list
2. CartDrawer slide-out
3. WhatsAppButton floating
4. Smooth scroll behavior

**Files:**
- `src/components/common/SearchModal.jsx`
- `src/components/common/CartDrawer.jsx`
- `src/components/common/WhatsAppButton.jsx`
- `src/hooks/useCart.js`
- `src/hooks/useModal.js`

## Step 9: Page Assembly

**Tasks:**
1. Create HomePage with all sections
2. Set up React Router
3. Configure App.jsx
4. Add page transitions

**Files:**
- `src/pages/HomePage.jsx`
- `src/App.jsx`
- `src/main.jsx`

## Step 10: Polish & Optimization

**Tasks:**
1. Add loading states
2. Implement lazy loading
3. Optimize images
4. Add animations
5. SEO meta tags
6. Test responsive design

## Step 11: Deployment

**Tasks:**
1. Build production bundle
2. Deploy to Vercel
3. Configure custom domain (when ready)
4. Set up preview deployments

```bash
npm run build
npx vercel
```

---

# CLAUDE.md TEMPLATE (FILLED)

This should be copied to `.claude/CLAUDE.md`:

```markdown
# QTWAYS Website

## About This Project

QTWAYS is a skincare e-commerce website built with React and Tailwind CSS. The design mimics the luxury aesthetic of Kimirica.shop while featuring QTWAYS products and branding. Currently in MVP phase with homepage only.

---

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router 6
- **Animations:** Framer Motion
- **Carousel:** Swiper.js
- **Icons:** Lucide React
- **Hosting:** Vercel

---

## Key Directories

```
src/
├── components/
│   ├── layout/      → Header, Footer, Navigation
│   ├── sections/    → Homepage sections
│   ├── ui/          → Reusable UI components
│   └── common/      → Shared components (modals, etc.)
├── data/            → Static data (products, config)
├── hooks/           → Custom React hooks
├── pages/           → Page components
├── styles/          → Global styles
└── utils/           → Utility functions

public/
└── images/          → Static images and icons

context/             → Design docs (style-guide, principles)
docs/                → Project documentation
```

---

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:5173

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## Code Style

```jsx
// ✅ Good: Named exports, explicit types
export const ProductCard = ({ name, price, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* content */}
    </div>
  );
};

// ✅ Good: Tailwind class organization
// Layout → Spacing → Typography → Colors → Effects
<div className="flex items-center gap-4 text-lg font-medium text-charcoal-800 hover:text-gold-500 transition-colors">

// ❌ Bad: Inline styles
<div style={{ display: 'flex', color: 'red' }}>

// ❌ Bad: Arbitrary Tailwind values
<div className="w-[347px] mt-[23px]">
```

---

## Design Tokens

**Colors:**
- Primary: cream-50 to cream-200
- Accent: gold-400 to gold-600
- Text: charcoal-700 to charcoal-900
- CTA: sage-500 to sage-600

**Typography:**
- Display: Playfair Display (headings)
- Sans: Inter (body text)

**Spacing:**
- Section padding: py-16 md:py-24
- Component gaps: gap-4 md:gap-6

---

## Workflow

1. Check existing components before creating new ones
2. Follow the established component patterns
3. Use Tailwind classes; avoid custom CSS
4. Test responsive design at 375px, 768px, 1440px
5. Run `npm run lint` before committing

---

## Boundaries

**Always:**
- Use Tailwind for styling
- Follow component structure in /components
- Extract reusable logic to hooks
- Use data from /data files

**Ask first:**
- Adding new dependencies
- Creating new page routes
- Modifying tailwind.config.js

**Never:**
- Commit API keys or secrets
- Use inline styles
- Skip responsive testing
- Modify public/images without optimization
```

---

# QUICK REFERENCE

## QTWAYS Brand Info

| Field | Value |
|-------|-------|
| Brand Name | QTWAYS |
| Legal Name | SHILPEX PHARMYSIS |
| Address | Ground Floor, A-01, Functional Industrial Estate, Patparganj, Delhi 110092 |
| Phone | 7669417555 |
| Email | qtways2024@gmail.com |

## Social Links

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/people/QTways/61571639267098/ |
| Instagram | https://www.instagram.com/qtways/ |
| YouTube | https://youtube.com/@qtways-h3z |
| X/Twitter | https://x.com/qtways2024 |
| WhatsApp | wa.me/917669417555 |

## Key Screenshots (in .playwright-mcp/)

| File | Content |
|------|---------|
| kimirica-viewport.png | Kimirica homepage design reference |
| qtways-homepage.png | Current QTWAYS Shopify site |
| qtways-products-page.png | QTWAYS product catalog |
| qtways-product-detail.png | QTWAYS product detail page |

## Verification Checklist

- [ ] Dev server runs without errors
- [ ] All sections render on homepage
- [ ] Responsive at 375px (mobile)
- [ ] Responsive at 768px (tablet)
- [ ] Responsive at 1440px (desktop)
- [ ] Carousels function correctly
- [ ] No console errors
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] Vercel deployment successful

---

**End of Plan Document**

*Ready to implement when you are. Run `/continue` to pick up from Step 1.*
