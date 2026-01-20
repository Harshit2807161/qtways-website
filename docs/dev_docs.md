# QTWAYS Website - Developer Documentation

> A comprehensive guide to understanding and mastering the QTWAYS codebase.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Directory Structure](#directory-structure)
3. [Core Technologies](#core-technologies)
4. [Data Flow](#data-flow)
5. [Components Deep Dive](#components-deep-dive)
6. [Styling System](#styling-system)
7. [State Management](#state-management)
8. [Adding New Features](#adding-new-features)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                              │
│  (Main layout: Announcement → Header → Content → Footer)    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Layout    │  │   Common    │  │      Sections       │  │
│  │ Components  │  │ Components  │  │    (Homepage)       │  │
│  ├─────────────┤  ├─────────────┤  ├─────────────────────┤  │
│  │ Header      │  │ SearchModal │  │ Hero                │  │
│  │ Footer      │  │ CartDrawer  │  │ FeaturedProducts    │  │
│  │ MobileNav   │  │ WhatsApp    │  │ ShopByCategory      │  │
│  │ Announce-   │  │   Button    │  │ Testimonials        │  │
│  │   mentBar   │  │             │  │ Newsletter...       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    UI Components                        ││
│  │  Button │ Badge │ Rating │ ProductCard │ Carousel │ ... ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Data Layer                           ││
│  │  products.js │ categories.js │ siteConfig.js │ ...      ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Custom Hooks                         ││
│  │  useCart │ useModal │ useMediaQuery                     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Request Flow

1. User loads the app → `main.jsx` renders `App.jsx`
2. `App.jsx` sets up the layout with Router
3. Route matches → renders `HomePage.jsx`
4. `HomePage` composes multiple section components
5. Sections use UI components + data from `/data`
6. User interactions trigger modals/drawers via state in `App.jsx`

---

## Directory Structure

```
qtways-website/
├── public/
│   └── images/              # Static images (products, hero, etc.)
│
├── src/
│   ├── main.jsx             # Entry point - mounts App
│   ├── App.jsx              # Main app with routing & layout
│   │
│   ├── components/
│   │   ├── index.js         # Barrel export for all components
│   │   │
│   │   ├── layout/          # Structural components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── AnnouncementBar.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── ui/              # Reusable UI primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── Carousel.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── sections/        # Homepage sections
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── FeaturedBanner.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── TrustBadges.jsx
│   │   │   ├── ShopByCategory.jsx
│   │   │   ├── ShopByConcern.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── BrandStory.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   └── index.js
│   │   │
│   │   └── common/          # Shared interactive components
│   │       ├── SearchModal.jsx
│   │       ├── CartDrawer.jsx
│   │       ├── WhatsAppButton.jsx
│   │       └── index.js
│   │
│   ├── pages/
│   │   └── HomePage.jsx     # Homepage assembly
│   │
│   ├── data/                # Static data
│   │   ├── index.js         # Barrel export
│   │   ├── products.js      # Product catalog
│   │   ├── categories.js    # Category definitions
│   │   ├── concerns.js      # Skin concerns
│   │   ├── testimonials.js  # Customer reviews
│   │   └── siteConfig.js    # Brand info, navigation
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── index.js
│   │   ├── useCart.js       # Cart state management
│   │   ├── useModal.js      # Modal open/close
│   │   └── useMediaQuery.js # Responsive breakpoints
│   │
│   ├── utils/               # Helper functions
│   │   ├── index.js
│   │   ├── cn.js            # Class name utility
│   │   └── formatPrice.js   # Price formatting
│   │
│   └── styles/
│       └── globals.css      # Global styles & Tailwind
│
├── context/                 # Design documentation
│   ├── design-principles.md
│   └── style-guide.md
│
├── docs/                    # Project documentation
│   ├── implementation-progress.md
│   └── dev_docs.md          # This file
│
└── Configuration files
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## Core Technologies

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **React 18** | UI framework | reactjs.org |
| **Vite 5** | Build tool & dev server | vitejs.dev |
| **Tailwind CSS 3.4** | Utility-first styling | tailwindcss.com |
| **React Router 6** | Client-side routing | reactrouter.com |
| **Framer Motion** | Animations | framer.com/motion |
| **Swiper.js** | Carousels/sliders | swiperjs.com |
| **Lucide React** | Icons | lucide.dev |

---

## Data Flow

### Static Data Architecture

All product/category data lives in `/src/data/`. This is a **static data approach** - no backend needed for MVP.

```
┌─────────────────────────────────────────────────────┐
│                    /src/data/                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  products.js ─────────┬──→ getFeaturedProducts()    │
│  (12 products)        ├──→ getBestSellers()         │
│                       ├──→ getProductBySlug()       │
│                       └──→ searchProducts()          │
│                                                      │
│  categories.js ───────────→ Array of 4 categories   │
│                                                      │
│  concerns.js ─────────────→ Array of 8 skin concerns│
│                                                      │
│  testimonials.js ─────────→ Array of 10 reviews     │
│                                                      │
│  siteConfig.js ───────┬──→ Brand info (name, contact)│
│                       ├──→ Navigation links          │
│                       ├──→ Announcements             │
│                       └──→ Trust badges              │
└─────────────────────────────────────────────────────┘
```

### Product Data Structure

```javascript
// src/data/products.js
{
  id: 'fc-001',                    // Unique ID (category-prefix + number)
  name: 'Vitamin C Serum',         // Display name
  slug: 'vitamin-c-serum',         // URL-friendly name
  category: 'face-care',           // Category ID
  categoryName: 'Face Care',       // Display category
  price: 1299,                     // Current price in INR
  originalPrice: 1599,             // Original price (null if no discount)
  description: '...',              // Full description
  shortDescription: '...',         // Brief tagline
  ingredients: [...],              // Array of ingredients
  benefits: [...],                 // Array of benefits
  howToUse: '...',                 // Usage instructions
  size: '30ml',                    // Product size
  rating: 4.8,                     // Average rating (1-5)
  reviewCount: 124,                // Number of reviews
  inStock: true,                   // Availability
  badge: 'bestseller',             // 'bestseller' | 'new' | 'sale' | null
  tags: ['brightening', 'serum'], // Searchable tags
  images: ['/images/...'],         // Array of image URLs
  featured: true                   // Show in featured section
}
```

---

## Components Deep Dive

### Entry Point: main.jsx

```jsx
// Mounts the React app with Router
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### App Layout: App.jsx

**Purpose**: Main layout wrapper with routing and global state.

```jsx
// Simplified structure
function App() {
  // Modal/drawer state lives here (lifted up)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { itemCount } = useCart(); // Cart state from hook

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header
        onMenuOpen={() => setIsMobileNavOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={itemCount}
      />
      <MobileNav isOpen={isMobileNavOpen} onClose={...} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Other routes... */}
        </Routes>
      </div>

      <Footer />
      <WhatsAppButton />
      <SearchModal isOpen={isSearchOpen} onClose={...} />
      <CartDrawer isOpen={isCartOpen} onClose={...} />
    </div>
  );
}
```

**Key Concepts**:
- State for modals/drawers is **lifted to App** so Header can trigger them
- Layout uses flex column with `flex-1` on content for sticky footer
- Modals render at root level for proper z-index stacking

---

### Layout Components

#### Header.jsx
**Location**: `src/components/layout/Header.jsx`

**Purpose**: Site header with navigation, logo, and action buttons.

**Features**:
- Sticky positioning with scroll-triggered blur effect
- Desktop navigation (hidden on mobile)
- Category sub-navigation bar
- Action buttons: Search, Wishlist, Account, Cart
- Cart badge with item count animation

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `onMenuOpen` | `function` | Opens mobile nav |
| `onSearchOpen` | `function` | Opens search modal |
| `onCartOpen` | `function` | Opens cart drawer |
| `cartItemCount` | `number` | Badge count |

**Key Implementation**:
```jsx
// Scroll effect
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Applied class: isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-white'
```

---

#### Footer.jsx
**Location**: `src/components/layout/Footer.jsx`

**Purpose**: Site footer with links, social, newsletter, and legal info.

**Sections**:
1. Main grid: Brand info, Shop links, Company links, Support links
2. Social media icons
3. Newsletter signup (mini version)
4. Copyright bar with payment icons

**Data Sources**: Uses `navigation.footer` and `siteConfig` from `/data`.

---

#### MobileNav.jsx
**Location**: `src/components/layout/MobileNav.jsx`

**Purpose**: Slide-in drawer navigation for mobile devices.

**Features**:
- Slide-in from left with backdrop
- Accordion-style category expansion
- Body scroll lock when open
- Escape key to close

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Visibility state |
| `onClose` | `function` | Close handler |

---

#### AnnouncementBar.jsx
**Location**: `src/components/layout/AnnouncementBar.jsx`

**Purpose**: Top banner with rotating promotional messages.

**Features**:
- Auto-rotation every 5 seconds
- Pause on hover
- Previous/Next navigation
- Dismissible (X button)
- Mobile dot indicators

**Data Source**: `announcements` array from `siteConfig.js`

---

### UI Components

#### Button.jsx
**Location**: `src/components/ui/Button.jsx`

**Purpose**: Versatile button component with multiple variants.

**Variants**:
| Variant | Colors | Use Case |
|---------|--------|----------|
| `primary` | Charcoal bg, white text | Main CTAs |
| `secondary` | Transparent, charcoal border | Secondary actions |
| `gold` | Gold bg, white text | Add to cart, highlights |
| `sage` | Sage green bg | Checkout, success |
| `ghost` | Transparent, hover cream | Icon buttons |
| `link` | Underlined text | Text links |

**Sizes**: `sm`, `md`, `lg`, `icon`

**Props**:
```jsx
<Button
  variant="primary"
  size="md"
  fullWidth={false}
  disabled={false}
  loading={false}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  as={Link}           // Polymorphic - render as any element
  to="/shop"          // Pass-through props
>
  Shop Now
</Button>
```

---

#### Badge.jsx
**Location**: `src/components/ui/Badge.jsx`

**Purpose**: Small labels for product status.

**Variants**:
| Variant | Color | Use |
|---------|-------|-----|
| `sale` | Coral | Discounts |
| `new` | Gold | New arrivals |
| `bestseller` | Charcoal | Popular items |
| `soldout` | Gray | Out of stock |
| `default` | Cream | Generic |

**Convenience Components**:
```jsx
<SaleBadge discount={20} />  // "20% OFF"
<NewBadge />                  // "NEW"
<BestsellerBadge />          // "BESTSELLER"
<SoldOutBadge />             // "SOLD OUT"
```

---

#### Rating.jsx
**Location**: `src/components/ui/Rating.jsx`

**Purpose**: Star rating display with partial fill support.

**Components**:
1. `Rating` - Display only
2. `RatingInput` - Interactive (for review forms)

**Props (Rating)**:
```jsx
<Rating
  value={4.5}          // 0-5, supports decimals
  max={5}              // Total stars
  size="md"            // sm | md | lg
  showValue={true}     // Show "4.5" text
  showCount={true}     // Show "(124)" count
  count={124}          // Review count
/>
```

**Implementation Detail**: Partial stars use CSS `overflow: hidden` with calculated width percentage.

---

#### ProductCard.jsx
**Location**: `src/components/ui/ProductCard.jsx`

**Purpose**: Product display card for grids and carousels.

**Features**:
- Hover image zoom
- Badge display (sale/new/bestseller)
- Out of stock overlay
- Quick add button (on hover)
- Wishlist button
- Rating display
- Price with discount formatting

**Props**:
```jsx
<ProductCard
  product={productObject}    // Required: product data
  showRating={true}          // Show star rating
  showQuickAdd={true}        // Show quick add on hover
  onQuickAdd={(product) => {}} // Add to cart handler
  onWishlist={(product) => {}} // Wishlist handler
/>
```

**Variants**:
- `ProductCard` - Full card with all features
- `ProductCardCompact` - Minimal version for tight grids

---

#### CategoryCard.jsx
**Location**: `src/components/ui/CategoryCard.jsx`

**Purpose**: Category navigation cards with image backgrounds.

**Variants**:
1. `CategoryCard` - Large card with image overlay
2. `CategoryPill` - Compact horizontal pill style

**Props**:
```jsx
<CategoryCard
  category={{
    name: 'Face Care',
    slug: 'face-care',
    image: '/images/...',
    productCount: 5
  }}
/>
```

---

#### TestimonialCard.jsx
**Location**: `src/components/ui/TestimonialCard.jsx`

**Purpose**: Customer review/testimonial display.

**Variants**:
1. `TestimonialCard` - Standard card
2. `TestimonialFeatured` - Large featured quote

**Props**:
```jsx
<TestimonialCard
  testimonial={{
    name: 'Priya S.',
    location: 'Mumbai',
    rating: 5,
    text: 'Amazing products...',
    date: '2 weeks ago',
    image: '/images/...',
    verified: true
  }}
/>
```

---

#### Carousel.jsx
**Location**: `src/components/ui/Carousel.jsx`

**Purpose**: Swiper.js wrapper for consistent carousel behavior.

**Presets**:
| Component | Use Case | Default Config |
|-----------|----------|----------------|
| `Carousel` | Base component | Configurable |
| `ProductCarousel` | Product sliders | 4 slides, navigation |
| `HeroCarousel` | Hero banners | 1 slide, autoplay, pagination |
| `TestimonialCarousel` | Reviews | 3 slides, navigation |

**Props (Base)**:
```jsx
<Carousel
  slidesPerView={4}
  spaceBetween={24}
  navigation={true}
  pagination={false}
  autoplay={false}
  autoplayDelay={5000}
  loop={false}
  freeMode={false}
  breakpoints={{...}}
>
  {items.map(item => <Component key={item.id} />)}
</Carousel>
```

---

### Section Components

All sections follow a consistent pattern:
1. Container with `section-padding` class
2. Header with title/subtitle
3. Content area
4. Optional CTA

#### Hero.jsx
**Location**: `src/components/sections/Hero.jsx`

**Purpose**: Full-screen hero with headline, CTA, and image.

**Features**:
- Animated entry (Framer Motion)
- Floating badges ("100% Natural", "Cruelty Free")
- Stats section (10K+ customers, 50+ products, 4.9 rating)
- Responsive grid (stacked mobile, side-by-side desktop)
- Decorative background blurs

---

#### FeaturedProducts.jsx
**Location**: `src/components/sections/FeaturedProducts.jsx`

**Purpose**: Product carousel section.

**Variants**:
- `FeaturedProducts` - Uses `getFeaturedProducts()`
- `BestSellers` - Uses `getBestSellers()` with different title

**Customization**:
```jsx
<FeaturedProducts
  title="Our Picks"
  subtitle="Hand-selected for you"
  products={customProducts}  // Override default
  viewAllLink="/shop"
  viewAllText="See All"
/>
```

---

#### TrustBadges.jsx
**Location**: `src/components/sections/TrustBadges.jsx`

**Purpose**: Trust indicators bar.

**Content**: Free Shipping, 100% Authentic, Easy Returns, Customer Support

**Data Source**: `trustBadges` from `siteConfig.js`

---

#### ShopByCategory.jsx / ShopByConcern.jsx
**Location**: `src/components/sections/`

**Purpose**: Category/concern navigation grids.

**Data Sources**: `categories.js` and `concerns.js`

---

#### Newsletter.jsx
**Location**: `src/components/sections/Newsletter.jsx`

**Purpose**: Email signup with validation.

**Features**:
- Email validation
- Loading state
- Success/error messages
- Form submission (currently mock)

---

### Common Components

#### SearchModal.jsx
**Location**: `src/components/common/SearchModal.jsx`

**Purpose**: Full-text product search overlay.

**Features**:
- Debounced search (300ms)
- Live results grid
- Popular searches suggestions
- Keyboard navigation (Escape to close)
- Body scroll lock

**Search Implementation**:
```jsx
// Uses searchProducts() from data/products.js
const searchResults = searchProducts(query);
// Searches: name, description, tags
```

---

#### CartDrawer.jsx
**Location**: `src/components/common/CartDrawer.jsx`

**Purpose**: Slide-out shopping cart.

**Features**:
- Item list with quantity controls
- Free shipping progress bar
- Subtotal calculation
- Remove/clear functionality
- Checkout CTA

**Data Source**: `useCart()` hook

---

#### WhatsAppButton.jsx
**Location**: `src/components/common/WhatsAppButton.jsx`

**Purpose**: Floating WhatsApp contact button.

**Features**:
- Fixed position (bottom-right)
- Pulse animation
- Links to WhatsApp with pre-filled number
- Conditional render based on `siteConfig.features.whatsappChat`

---

## Styling System

### Tailwind Configuration

**Location**: `tailwind.config.js`

**Custom Colors**:
```javascript
colors: {
  cream: { 50-400 },    // Backgrounds
  gold: { 300-700 },    // Accents
  charcoal: { 50-900 }, // Text
  sage: { 400-700 },    // CTAs
  coral: { 400-600 },   // Errors/Sales
  blush: { 50-200 }     // Soft accents
}
```

**Custom Fonts**:
```javascript
fontFamily: {
  sans: ['Inter', ...],           // Body text
  display: ['Playfair Display', ...] // Headings
}
```

**Custom Shadows**:
```javascript
boxShadow: {
  soft: '...',     // Cards, dropdowns
  elegant: '...',  // Hover states
  card: '...'      // Subtle elevation
}
```

**Custom Animations**:
```javascript
animation: {
  'fade-in': '...',
  'slide-up': '...',
  'slide-down': '...',
  'scale-in': '...',
  'marquee': '...'     // Scrolling text
}
```

---

### Global CSS Classes

**Location**: `src/styles/globals.css`

| Class | Purpose |
|-------|---------|
| `.container-custom` | Centered container with responsive max-width |
| `.container-wide` | Wider container for full-width sections |
| `.section-padding` | Consistent vertical padding |
| `.btn-primary/secondary/gold/link` | Button variants |
| `.card-hover` | Hover lift effect |
| `.img-zoom` | Image zoom on parent hover |
| `.overlay-gradient` | Dark gradient overlay |
| `.badge-sale/new/bestseller` | Badge styles |
| `.line-clamp-1/2/3` | Text truncation |
| `.scrollbar-hide/elegant` | Scrollbar styling |

---

### Utility: cn()

**Location**: `src/utils/cn.js`

**Purpose**: Conditional class name joining.

```jsx
import { cn } from '../utils';

// Usage
<div className={cn(
  'base-classes',
  isActive && 'active-class',
  variant === 'primary' ? 'primary-class' : 'secondary-class'
)}>
```

---

## State Management

### Cart State: useCart()

**Location**: `src/hooks/useCart.js`

**Purpose**: Shopping cart state with localStorage persistence.

**API**:
```jsx
const {
  items,                          // Array of cart items
  itemCount,                      // Total item count
  total,                          // Total price
  addItem(product, quantity),     // Add to cart
  updateQuantity(id, quantity),   // Update quantity
  removeItem(id),                 // Remove item
  clearCart()                     // Empty cart
} = useCart();
```

**Persistence**: Uses `localStorage` key `'qtways-cart'`

---

### Modal State: useModal()

**Location**: `src/hooks/useModal.js`

**Purpose**: Reusable modal open/close logic.

**API**:
```jsx
const { isOpen, open, close, toggle } = useModal(false);
```

---

### Responsive: useMediaQuery()

**Location**: `src/hooks/useMediaQuery.js`

**Purpose**: Detect responsive breakpoints.

**API**:
```jsx
const isMobile = useMediaQuery('(max-width: 640px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

---

## Adding New Features

### Adding a New Product

1. Open `src/data/products.js`
2. Add product object following the schema:
```javascript
{
  id: 'fc-006',                   // Unique ID
  name: 'New Product Name',
  slug: 'new-product-name',       // URL-friendly
  category: 'face-care',
  categoryName: 'Face Care',
  price: 999,
  originalPrice: null,            // or number for discount
  // ... other fields
}
```

### Adding a New Section

1. Create file in `src/components/sections/NewSection.jsx`
2. Follow pattern:
```jsx
import { motion } from 'framer-motion';

export const NewSection = ({ className, ...props }) => {
  return (
    <section className={`section-padding ${className}`} {...props}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-4">
            Section Title
          </h2>
        </motion.div>

        {/* Content */}
        {/* ... */}
      </div>
    </section>
  );
};

export default NewSection;
```
3. Export from `src/components/sections/index.js`
4. Add to `HomePage.jsx`

### Adding a New Page

1. Create file in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New UI Component

1. Create in `src/components/ui/NewComponent.jsx`
2. Follow pattern with `cn()` for className merging
3. Export from `src/components/ui/index.js`

---

## Common Patterns

### Animation Pattern

```jsx
import { motion } from 'framer-motion';

// Scroll-triggered animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, delay: 0.1 }}
>
```

### Responsive Pattern

```jsx
// Mobile-first with Tailwind
<div className="
  grid
  grid-cols-1       // Mobile: 1 column
  sm:grid-cols-2    // Tablet: 2 columns
  lg:grid-cols-3    // Desktop: 3 columns
  xl:grid-cols-4    // Large: 4 columns
  gap-4 md:gap-6
">
```

### Image Fallback Pattern

```jsx
<img
  src={product.images?.[0] || '/images/placeholder.jpg'}
  alt={product.name}
  onError={(e) => {
    e.target.src = 'https://images.unsplash.com/...';
  }}
/>
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not applying | Run `npm run dev` to ensure Tailwind is compiling |
| Component not found | Check barrel exports in `index.js` files |
| Cart not persisting | Check localStorage in browser DevTools |
| Images not loading | Verify paths in `/public/images/` |
| Swiper not working | Ensure CSS imports in Carousel.jsx |

---

## Quick Reference

### Import Paths

```jsx
// Components
import { Button, ProductCard, Header } from '../components';

// Data
import { products, siteConfig, categories } from '../data';

// Hooks
import { useCart, useModal, useMediaQuery } from '../hooks';

// Utils
import { cn, formatPrice, calculateDiscount } from '../utils';
```

### Breakpoints

| Breakpoint | Width | Tailwind |
|------------|-------|----------|
| Mobile | < 640px | Default |
| Tablet | ≥ 640px | `sm:` |
| Desktop | ≥ 1024px | `lg:` |
| Large | ≥ 1280px | `xl:` |
| Extra Large | ≥ 1536px | `2xl:` |

---

*Last Updated: January 11, 2026*
