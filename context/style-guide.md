# QTWAYS Brand Style Guide

> Official brand guidelines for QTWAYS skincare e-commerce website.

---

## Brand Identity

### Brand Name
- **Primary**: QTWAYS
- **Legal Entity**: SHILPEX PHARMYSIS
- **Tagline**: *Premium Skincare, Naturally Yours*

### Brand Voice
- **Warm & Welcoming** - Like a trusted friend recommending products
- **Knowledgeable** - Expert but not condescending
- **Aspirational** - Premium quality, accessible luxury
- **Honest** - Transparent about ingredients and benefits

---

## Logo Usage

### Primary Logo
- Use on light backgrounds (cream, white)
- Minimum clear space: height of "Q" on all sides
- Minimum size: 120px width for digital

### Logo Variations
1. **Full Logo** - "QTWAYS" wordmark (primary)
2. **Icon** - "Q" monogram (favicon, app icon)
3. **Stacked** - Logo over tagline (marketing)

### Logo Don'ts
- Don't stretch or distort
- Don't change colors outside brand palette
- Don't add effects (shadows, gradients)
- Don't place on busy backgrounds

---

## Color Palette

### Primary Colors

#### Cream (Background)
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Cream 50 | #FDFBF7 | `cream-50` | Page background |
| Cream 100 | #FAF6ED | `cream-100` | Card background |
| Cream 200 | #F5EED8 | `cream-200` | Borders, dividers |
| Cream 300 | #EDE4C5 | `cream-300` | Hover states |
| Cream 400 | #E5D9B0 | `cream-400` | Disabled elements |

#### Gold (Accent)
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Gold 300 | #D4BC7A | `gold-300` | Light accents |
| Gold 400 | #C9A962 | `gold-400` | Icons, highlights |
| Gold 500 | #B8973D | `gold-500` | Primary accent |
| Gold 600 | #9A7B2F | `gold-600` | Hover states |
| Gold 700 | #7D6326 | `gold-700` | Active states |

#### Charcoal (Text)
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Charcoal 50 | #F7F7F7 | `charcoal-50` | Light backgrounds |
| Charcoal 100 | #E8E8E8 | `charcoal-100` | Borders |
| Charcoal 200 | #D4D4D4 | `charcoal-200` | Disabled text |
| Charcoal 300 | #B0B0B0 | `charcoal-300` | Placeholder |
| Charcoal 400 | #8F8F8F | `charcoal-400` | Secondary text |
| Charcoal 600 | #5C5C5C | `charcoal-600` | Captions |
| Charcoal 700 | #404040 | `charcoal-700` | Body text |
| Charcoal 800 | #2D2D2D | `charcoal-800` | Primary text |
| Charcoal 900 | #1A1A1A | `charcoal-900` | Headings |

### Secondary Colors

#### Sage (CTA)
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Sage 400 | #7DA37D | `sage-400` | Light CTA |
| Sage 500 | #6B8E6B | `sage-500` | Primary CTA |
| Sage 600 | #5A7A5A | `sage-600` | CTA hover |
| Sage 700 | #4A664A | `sage-700` | CTA active |

#### Coral (Alerts)
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Coral 400 | #F08A8A | `coral-400` | Light error |
| Coral 500 | #E57373 | `coral-500` | Sale, error |
| Coral 600 | #D65C5C | `coral-600` | Error hover |

#### Blush (Soft)
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Blush 50 | #FDF8F6 | `blush-50` | Soft backgrounds |
| Blush 100 | #FBEEE9 | `blush-100` | Highlights |
| Blush 200 | #F7DCD3 | `blush-200` | Borders |

---

## Typography

### Font Families

#### Playfair Display (Headings)
- **Weight**: 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Usage**: All headings (h1-h6), display text, quotes
- **Fallback**: Georgia, serif

```css
font-family: 'Playfair Display', Georgia, serif;
```

#### Inter (Body)
- **Weight**: 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Usage**: Body text, buttons, labels, navigation
- **Fallback**: system-ui, sans-serif

```css
font-family: 'Inter', system-ui, sans-serif;
```

### Type Scale

| Element | Size | Weight | Line Height | Tailwind |
|---------|------|--------|-------------|----------|
| H1 | 48-72px | 500 | 1.1 | `text-5xl md:text-7xl font-medium` |
| H2 | 36-48px | 500 | 1.2 | `text-4xl md:text-5xl font-medium` |
| H3 | 24-30px | 500 | 1.2 | `text-2xl md:text-3xl font-medium` |
| H4 | 20-24px | 500 | 1.3 | `text-xl md:text-2xl font-medium` |
| H5 | 18px | 600 | 1.4 | `text-lg font-semibold` |
| H6 | 16px | 600 | 1.4 | `text-base font-semibold` |
| Body Large | 18px | 400 | 1.6 | `text-lg` |
| Body | 16px | 400 | 1.5 | `text-base` |
| Body Small | 14px | 400 | 1.5 | `text-sm` |
| Caption | 12px | 400 | 1.4 | `text-xs` |

### Text Styles

```jsx
// Hero headline
<h1 className="font-display text-5xl md:text-7xl font-medium text-charcoal-900">

// Section title
<h2 className="font-display text-3xl md:text-4xl font-medium text-charcoal-900">

// Card title
<h3 className="font-display text-xl font-medium text-charcoal-900">

// Body text
<p className="text-base text-charcoal-700 leading-relaxed">

// Caption
<span className="text-sm text-charcoal-600">
```

---

## Spacing System

### Base Unit: 4px

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| xs | 4px | `p-1`, `gap-1` | Tight spacing |
| sm | 8px | `p-2`, `gap-2` | Icon gaps |
| md | 16px | `p-4`, `gap-4` | Default spacing |
| lg | 24px | `p-6`, `gap-6` | Card padding |
| xl | 32px | `p-8`, `gap-8` | Section gaps |
| 2xl | 48px | `p-12`, `gap-12` | Large gaps |
| 3xl | 64px | `p-16`, `gap-16` | Section padding |
| 4xl | 96px | `p-24`, `gap-24` | Hero spacing |

### Section Spacing
```jsx
// Standard section
<section className="py-16 md:py-24">

// Tight section
<section className="py-12 md:py-16">

// Hero section
<section className="py-20 md:py-32">
```

---

## Components

### Buttons

#### Primary (Dark)
```jsx
<button className="inline-flex items-center justify-center px-6 py-3
  bg-charcoal-900 text-white font-medium rounded-md
  hover:bg-charcoal-800 active:bg-charcoal-950
  transition-colors duration-300">
  Shop Now
</button>
```

#### Secondary (Outline)
```jsx
<button className="inline-flex items-center justify-center px-6 py-3
  bg-transparent text-charcoal-900 font-medium rounded-md
  border border-charcoal-900
  hover:bg-charcoal-900 hover:text-white
  transition-colors duration-300">
  Learn More
</button>
```

#### Gold Accent
```jsx
<button className="inline-flex items-center justify-center px-6 py-3
  bg-gold-500 text-white font-medium rounded-md
  hover:bg-gold-600 active:bg-gold-700
  transition-colors duration-300">
  Add to Cart
</button>
```

#### CTA (Sage)
```jsx
<button className="inline-flex items-center justify-center px-8 py-4
  bg-sage-500 text-white font-medium rounded-md
  hover:bg-sage-600 active:bg-sage-700
  transition-colors duration-300">
  Complete Purchase
</button>
```

### Cards

#### Product Card
```jsx
<div className="group bg-white rounded-lg shadow-soft overflow-hidden
  transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
  <div className="aspect-square overflow-hidden">
    <img className="w-full h-full object-cover transition-transform
      duration-500 group-hover:scale-105" />
  </div>
  <div className="p-4">
    <h3 className="font-display text-lg text-charcoal-900">Product Name</h3>
    <p className="text-sm text-charcoal-600 mt-1">Category</p>
    <p className="text-lg font-medium text-charcoal-900 mt-2">₹1,299</p>
  </div>
</div>
```

### Badges

```jsx
// Sale badge
<span className="inline-flex items-center px-2.5 py-0.5
  text-xs font-medium rounded-full bg-coral-500 text-white">
  SALE
</span>

// New badge
<span className="inline-flex items-center px-2.5 py-0.5
  text-xs font-medium rounded-full bg-gold-500 text-white">
  NEW
</span>

// Bestseller badge
<span className="inline-flex items-center px-2.5 py-0.5
  text-xs font-medium rounded-full bg-charcoal-900 text-white">
  BESTSELLER
</span>
```

---

## Icons

### Icon Library
Using **Lucide React** for consistent, clean icons.

### Icon Sizes
| Size | Pixels | Tailwind | Usage |
|------|--------|----------|-------|
| sm | 16px | `w-4 h-4` | Inline with text |
| md | 20px | `w-5 h-5` | Buttons, nav |
| lg | 24px | `w-6 h-6` | Standalone |
| xl | 32px | `w-8 h-8` | Features |

### Common Icons
```jsx
import {
  ShoppingBag,    // Cart
  Search,         // Search
  User,           // Account
  Heart,          // Wishlist
  Menu,           // Mobile menu
  X,              // Close
  ChevronRight,   // Navigation
  Star,           // Rating
  Truck,          // Shipping
  Shield,         // Security
  Phone,          // Contact
  Mail,           // Email
} from 'lucide-react';
```

---

## Shadows

| Name | Value | Tailwind | Usage |
|------|-------|----------|-------|
| Soft | `0 2px 8px rgba(0,0,0,0.08)` | `shadow-soft` | Cards, dropdowns |
| Elegant | `0 4px 20px rgba(0,0,0,0.1)` | `shadow-elegant` | Hover states |
| Card | `0 1px 3px rgba(0,0,0,0.1)` | `shadow-card` | Subtle elevation |

---

## Animations

### Timing Functions
```css
/* Elegant easing - default for most transitions */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Tailwind class */
ease-elegant
```

### Common Animations
```jsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>

// Scale in
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
```

---

## Contact Information

| Channel | Value |
|---------|-------|
| Phone | +91 7669417555 |
| Email | qtways2024@gmail.com |
| WhatsApp | wa.me/917669417555 |
| Address | Ground Floor, A-01, Functional Industrial Estate, Patparganj, Delhi 110092 |

### Social Media
| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/qtways/ |
| Facebook | https://www.facebook.com/people/QTways/61571639267098/ |
| YouTube | https://youtube.com/@qtways-h3z |
| X/Twitter | https://x.com/qtways2024 |

---

## Assets Checklist

### Required Images
- [ ] Logo (SVG, PNG)
- [ ] Favicon (ICO, PNG 32x32, 192x192, 512x512)
- [ ] OG Image (1200x630)
- [ ] Product images (800x800 minimum)
- [ ] Category images (600x800 minimum)
- [ ] Hero images (1920x1080 minimum)
- [ ] Trust badges/icons
- [ ] Payment method icons
