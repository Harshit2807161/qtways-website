# QTWAYS Design Principles

> A comprehensive design checklist for maintaining visual consistency and quality across the QTWAYS website.

---

## Core Design Philosophy

QTWAYS embodies **luxury skincare with accessibility**. The design should feel:
- **Premium** - High-end aesthetic without being intimidating
- **Clean** - Generous whitespace, uncluttered layouts
- **Warm** - Inviting cream tones, not sterile white
- **Trustworthy** - Professional, polished, reliable

---

## Visual Hierarchy Checklist

### Typography
- [ ] Headings use Playfair Display (serif)
- [ ] Body text uses Inter (sans-serif)
- [ ] Font sizes follow the scale: 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px
- [ ] Line height is 1.5 for body text, 1.2 for headings
- [ ] Maximum line width is 65-75 characters for readability
- [ ] Text contrast meets WCAG AA standards (4.5:1 minimum)

### Spacing
- [ ] Section padding: `py-16 md:py-24` (64px / 96px)
- [ ] Component gaps: `gap-4 md:gap-6` (16px / 24px)
- [ ] Card padding: `p-4 md:p-6` (16px / 24px)
- [ ] Consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- [ ] Breathing room around CTAs

### Layout
- [ ] Max content width: 1280px (`max-w-7xl`)
- [ ] Container padding: `px-4 sm:px-6 lg:px-8`
- [ ] Grid uses 12-column system
- [ ] Cards align to grid
- [ ] Asymmetric layouts for visual interest where appropriate

---

## Color Usage Checklist

### Primary Palette
- [ ] `cream-50` (#FDFBF7) - Page backgrounds
- [ ] `cream-100` (#FAF7F2) - Card backgrounds, alternate sections
- [ ] `cream-200` (#F5F0E8) - Borders, dividers

### Accent Colors
- [ ] `gold-500` (#D4A853) - Primary accent, highlights, icons
- [ ] `gold-600` (#C49A47) - Hover states for gold elements
- [ ] `sage-500` (#7C9A7C) - Primary CTA buttons
- [ ] `sage-600` (#6B8A6B) - CTA hover states

### Text Colors
- [ ] `charcoal-900` (#1A1A1A) - Primary headings
- [ ] `charcoal-800` (#2D2D2D) - Body text
- [ ] `charcoal-600` (#5C5C5C) - Secondary text, captions
- [ ] `charcoal-400` (#8F8F8F) - Placeholder text, disabled

### Semantic Colors
- [ ] `coral-500` (#E07B67) - Sale badges, errors
- [ ] `sage-500` (#7C9A7C) - Success states
- [ ] `gold-500` (#D4A853) - Warnings, new badges

---

## Component Checklist

### Buttons
- [ ] Minimum touch target: 44x44px
- [ ] Clear hover/focus/active states
- [ ] Consistent border-radius: `rounded-md` or `rounded-full`
- [ ] Loading states for async actions
- [ ] Disabled states are visually distinct

### Cards
- [ ] Consistent shadow: `shadow-soft` or `shadow-elegant`
- [ ] Hover lift effect: `hover:-translate-y-1`
- [ ] Image aspect ratios maintained
- [ ] Content padding is consistent

### Forms
- [ ] Input height: 44-48px minimum
- [ ] Clear focus states with gold ring
- [ ] Error states with coral border
- [ ] Labels above inputs
- [ ] Helper text in `charcoal-600`

### Navigation
- [ ] Sticky header with backdrop blur
- [ ] Clear active/current state
- [ ] Mobile menu is full-screen overlay
- [ ] Smooth transitions (300ms)

---

## Image Guidelines

### Aspect Ratios
- [ ] Product images: 1:1 (square)
- [ ] Hero images: 16:9 or custom
- [ ] Category cards: 3:4 (portrait)
- [ ] Testimonial avatars: 1:1 (circle)

### Quality
- [ ] WebP format with JPEG fallback
- [ ] Lazy loading for below-fold images
- [ ] Blur placeholder while loading
- [ ] Alt text for accessibility
- [ ] Max file size: 200KB for products, 500KB for heroes

### Treatment
- [ ] Consistent lighting/exposure
- [ ] Clean, minimal backgrounds
- [ ] Product as hero (centered)
- [ ] No heavy filters or effects

---

## Animation Guidelines

### Timing
- [ ] Default duration: 300ms
- [ ] Complex animations: 500ms max
- [ ] Use `ease-elegant` (cubic-bezier(0.4, 0, 0.2, 1))
- [ ] Stagger delays: 50-100ms between items

### Types
- [ ] Fade in: opacity 0 → 1
- [ ] Slide up: translateY(20px) → 0
- [ ] Scale in: scale(0.95) → 1
- [ ] Hover lift: translateY(-4px)

### Accessibility
- [ ] Respect `prefers-reduced-motion`
- [ ] No autoplay video without controls
- [ ] Pause animations on hover where appropriate
- [ ] No flashing content (3 flashes/sec max)

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Mobile-First Checklist
- [ ] Default styles are for mobile (375px)
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scroll
- [ ] Text is readable without zooming
- [ ] Forms are usable with thumb

---

## Accessibility Checklist

### WCAG 2.1 AA Compliance
- [ ] Color contrast 4.5:1 for text
- [ ] Color contrast 3:1 for large text/UI
- [ ] Focus visible on all interactive elements
- [ ] Skip to main content link
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Screen reader tested

---

## Performance Checklist

### Core Web Vitals Targets
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Optimization
- [ ] Images optimized and lazy loaded
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] JavaScript code-split
- [ ] No layout shifts from loading content

---

## Quick Reference

### Common Patterns
```jsx
// Section wrapper
<section className="section-padding bg-cream-50">
  <div className="container-custom">
    {/* content */}
  </div>
</section>

// Card with hover
<div className="bg-white rounded-lg shadow-soft card-hover p-6">
  {/* content */}
</div>

// Primary CTA
<button className="btn-primary">
  Shop Now
</button>

// Image with zoom
<div className="overflow-hidden rounded-lg">
  <img className="img-zoom" src="..." alt="..." />
</div>
```

### Don'ts
- Don't use pure white (#FFFFFF) for backgrounds
- Don't use more than 2 font families
- Don't skip heading levels
- Don't use color alone to convey meaning
- Don't autoplay videos with sound
- Don't use low-contrast placeholder text
