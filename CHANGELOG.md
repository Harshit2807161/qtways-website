# Changelog

All notable changes to the QTWAYS website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Responsive design testing (375px, 768px, 1440px)
- Lighthouse performance audit
- Vercel deployment
- Additional pages (Shop, Product Detail, Cart, Checkout)

---

## [0.5.0] - 2026-01-11

### Added
- **Developer Documentation**
  - `docs/dev_docs.md` - Comprehensive codebase guide with:
    - Architecture overview with visual diagrams
    - Directory structure explanation
    - All components documented with props/usage
    - Data flow and state management patterns
    - Styling system reference
    - Adding new features guide

### Changed
- Expanded container width to 1400px on 2xl screens
- Added `.container-wide` class for full-width sections

---

## [0.4.0] - 2026-01-11

### Added
- **Sprint 5: Interactive Components**
  - `SearchModal.jsx` - Full-text product search with live results
  - `CartDrawer.jsx` - Slide-out cart with quantity controls
  - Integrated modals into App.jsx

- **Custom Hooks**
  - `useCart.js` - Cart state management with localStorage persistence
  - `useModal.js` - Reusable modal open/close logic
  - `useMediaQuery.js` - Responsive breakpoint detection

### Changed
- Updated App.jsx with search and cart modal integration
- MVP complete - all 5 sprints finished

---

## [0.3.0] - 2026-01-11

### Added
- **Sprint 3: Layout Components**
  - `Header.jsx` - Sticky header with scroll effect, navigation, cart badge
  - `Footer.jsx` - Links, social icons, newsletter signup
  - `AnnouncementBar.jsx` - Auto-rotating announcements
  - `MobileNav.jsx` - Slide-in drawer navigation

- **Sprint 3: UI Components**
  - `Button.jsx` - 6 variants (primary, secondary, gold, sage, link, ghost)
  - `Badge.jsx` - 4 variants + convenience components
  - `Rating.jsx` - Star display with partial fill support
  - `ProductCard.jsx` - Full and compact variants
  - `CategoryCard.jsx` - Card and pill variants
  - `TestimonialCard.jsx` - Standard and featured variants
  - `Carousel.jsx` - Swiper wrapper with presets

- **Sprint 4: Homepage Sections**
  - `Hero.jsx` - Full hero with CTA, stats, floating badges
  - `FeaturedProducts.jsx` - Product carousel with BestSellers variant
  - `FeaturedBanner.jsx` - Promotional banners (3 variants)
  - `ProductGrid.jsx` - Flexible grid with animations
  - `TrustBadges.jsx` - Trust indicators
  - `ShopByCategory.jsx` - Category navigation
  - `ShopByConcern.jsx` - Skin concern selection
  - `Testimonials.jsx` - Customer reviews carousel
  - `BrandStory.jsx` - Brand story section
  - `Newsletter.jsx` - Email signup form

- **Common Components**
  - `WhatsAppButton.jsx` - Floating contact button

### Changed
- Assembled HomePage with all sections
- Updated barrel exports for all component directories

---

## [0.2.0] - 2026-01-10

### Added
- **Design System Documentation**
  - `context/design-principles.md` - Comprehensive design checklist covering typography, spacing, colors, accessibility, and performance
  - `context/style-guide.md` - Brand guidelines with color palette, typography scale, component patterns, and icon usage

- **Utility Functions**
  - `src/utils/cn.js` - Class name utility for conditional class merging
  - `src/utils/formatPrice.js` - Price formatting utilities:
    - `formatPrice()` - Format numbers as INR currency
    - `calculateDiscount()` - Calculate percentage discount
    - `formatPriceRange()` - Format min-max price ranges
    - `getPriceDisplay()` - Get formatted prices with sale info

- **Data Files**
  - `src/data/siteConfig.js` - Site configuration including:
    - Brand info and contact details
    - Social media links
    - SEO defaults
    - Navigation structure
    - Trust badges
    - Announcement messages
  - `src/data/products.js` - 12 products across 4 categories with:
    - Full product details (name, price, description, ingredients, benefits)
    - Helper functions (getProductById, getProductsByCategory, searchProducts, etc.)
  - `src/data/categories.js` - 4 main categories with subcategories
  - `src/data/concerns.js` - 8 skin concerns for "Shop by Concern" section
  - `src/data/testimonials.js` - 10 customer testimonials with ratings

- **Project Structure**
  - Created folder structure for components (layout, sections, ui, common)
  - Created hooks folder for custom React hooks
  - Added barrel exports (`index.js`) for data and utils

### Changed
- Updated `docs/implementation-progress.md` with Sprint 2 completion

---

## [0.1.0] - 2026-01-10

### Added
- **Project Initialization**
  - Initialized Vite + React project with npm
  - Configured React 18.3.1 with React Router 6.28.0
  - Added Framer Motion 11.15.0 for animations
  - Added Swiper 11.1.15 for carousels
  - Added Lucide React 0.468.0 for icons

- **Tailwind CSS Configuration**
  - Custom color palette inspired by Kimirica.shop:
    - `cream` (warm neutrals): 50-400 shades
    - `gold` (accent): 300-700 shades
    - `charcoal` (text): 50-900 shades
    - `sage` (CTA): 400-700 shades
    - `coral` (error/sale): 400-600 shades
    - `blush` (soft accent): 50-200 shades
  - Typography with Playfair Display (headings) and Inter (body)
  - Custom animations: fade-in, slide-up, slide-down, scale-in, marquee
  - Custom shadows: soft, elegant, card
  - Extended spacing and border radius

- **Global CSS Utilities**
  - Base styles with smooth scrolling and font smoothing
  - Custom container and section padding classes
  - Button variants: primary, secondary, gold, link
  - Card hover effects and image zoom utilities
  - Badge variants: sale, new, bestseller
  - Swiper navigation customization
  - Accessibility: focus-visible styles, reduced motion support
  - Utility classes: text-gradient, line-clamp, scrollbar styles

- **Project Structure**
  - `src/App.jsx` - React Router configuration
  - `src/main.jsx` - Application entry point
  - `src/pages/HomePage.jsx` - Placeholder homepage
  - `src/styles/globals.css` - Global styles and utilities

- **Documentation**
  - `.claude/CLAUDE.md` - Project instructions for AI assistant
  - `.claude/plan.md` - Comprehensive project plan
  - `docs/implementation-progress.md` - Sprint tracking
  - `CHANGELOG.md` - This file

### Technical Details
- Node.js with ES modules (`"type": "module"`)
- ESLint 9.17.0 with React plugin
- PostCSS with Autoprefixer
- Vite 6.0.5 for development and builds

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 0.5.0 | 2026-01-11 | Developer documentation and desktop width fix |
| 0.4.0 | 2026-01-11 | Sprint 5: Interactive components, MVP complete |
| 0.3.0 | 2026-01-11 | Sprint 3 & 4: Layout, UI, and homepage sections |
| 0.2.0 | 2026-01-10 | Sprint 2: Design system, utilities, and data files |
| 0.1.0 | 2026-01-10 | Sprint 1: Initial project setup with Vite, React, Tailwind |

---

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples
```
feat: add Header component with responsive navigation
fix: resolve mobile nav drawer scroll lock issue
docs: update README with deployment instructions
style: organize Tailwind classes in ProductCard
refactor: extract price formatting to utility function
```

---

## Links

- **Repository**: https://github.com/Harshit2807161/qtways-website
- **Live Site**: (Coming soon - Vercel deployment)
- **Design Reference**: https://www.kimirica.shop/
