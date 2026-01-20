# Design Review Findings - QTWAYS Website

> **Previous Review:** January 11, 2026 - All issues resolved on January 12, 2026
> **Current Review:** January 20, 2026
> **Reviewed against:** `context/design-principles.md` and `context/style-guide.md`
> **Scope:** Homepage, Shop, Product Detail, Cart, Checkout pages

---

## Summary

The QTWAYS e-commerce website demonstrates a strong foundation with thoughtful implementation of a luxury skincare aesthetic. The design system is well-structured with consistent color tokens, typography hierarchy, and reusable components. The codebase shows excellent attention to accessibility basics (skip links, ARIA labels, focus states) and responsive design patterns.

| Severity | Count | Status |
|----------|-------|--------|
| Blocker | 2 | Pending |
| High-Priority | 5 | Pending |
| Medium-Priority | 7 | Pending |
| Nitpicks | 6 | Pending |

---

## Blockers

### 1. Form Error Messages Not Accessible to Screen Readers
**Location:** `C:\personal projects\qtways-website\src\pages\CheckoutPage.jsx`
**Issue:** Error messages appear visually but lack `role="alert"` or `aria-live="polite"` attributes.
**Design Principle:** Accessibility - "ARIA labels where needed"
**Impact:** Screen reader users won't be notified when validation errors occur.
**Fix:** Add `role="alert"` to error message containers:
```jsx
{formErrors.fullName && (
  <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.fullName}</p>
)}
```

### 2. Incomplete ID-Label Associations in Some Form Fields
**Location:** `C:\personal projects\qtways-website\src\pages\CheckoutPage.jsx`
**Issue:** While labels exist, some form inputs don't have explicit `htmlFor` + `id` associations in all cases.
**Design Principle:** Accessibility - Forms must be screen reader compatible
**Impact:** Screen readers may not properly announce field labels.
**Fix:** Ensure all input fields have matching `id` attributes and their labels have `htmlFor` attributes.

---

## High-Priority

### 3. Color Token Mismatch Between Style Guide and Tailwind Config
**Location:** `C:\personal projects\qtways-website\tailwind.config.js`
**Issue:** Documented colors differ from implementation:

| Token | Style Guide | Tailwind Config |
|-------|-------------|-----------------|
| gold-500 | #D4A853 | #B8973D |
| sage-500 | #7C9A7C | #6B8E6B |
| coral-500 | #E07B67 | #E57373 |

**Design Principle:** Style Guide color specifications
**Impact:** Visual inconsistency between documented design system and actual implementation.
**Fix:** Either update `tailwind.config.js` to match style guide, or update `context/style-guide.md` to document actual colors.

### 4. Product Card Quick Add Button Lacks Loading/Feedback State
**Location:** `C:\personal projects\qtways-website\src\components\ui\ProductCard.jsx` (lines 94-101)
**Issue:** The "Quick Add" button calls `onQuickAdd(product)` without showing loading or success feedback.
**Design Principle:** Component Checklist - "Loading states for async actions"
**Impact:** Users may click multiple times, creating duplicate cart entries.
**Fix:** Add loading state and success feedback similar to ProductDetailPage implementation.

### 5. Testimonials Carousel Auto-play Without Pause Controls
**Location:** `C:\personal projects\qtways-website\src\components\sections\Testimonials.jsx` (line 96)
**Issue:** Uses `autoplay={{ delay: 5000, disableOnInteraction: false }}` without pause button.
**Design Principle:** Accessibility - "Pause animations on hover where appropriate"
**Impact:** WCAG 2.2.2 requires pause/stop mechanisms for auto-advancing content.
**Fix:** Add a visible pause/play button or disable autoplay.

### 6. Mobile Filter Drawer Animation Without Reduced Motion Check
**Location:** `C:\personal projects\qtways-website\src\pages\ShopPage.jsx` (lines 628-686)
**Issue:** Spring animation (`type: 'spring', damping: 25, stiffness: 200`) may cause motion discomfort.
**Design Principle:** Animation Guidelines - "Respect prefers-reduced-motion"
**Impact:** Users with vestibular disorders may experience discomfort.
**Fix:** Add Framer Motion's `useReducedMotion` hook to disable springs when preferred.

### 7. Hero Section Mobile Image Uses Lazy Loading on Above-Fold Content
**Location:** `C:\personal projects\qtways-website\src\components\sections\Hero.jsx` (line 113)
**Issue:** Mobile hero image uses `loading="lazy"` but it's above-the-fold.
**Design Principle:** Performance - "LCP < 2.5s"
**Impact:** Negatively impacts Largest Contentful Paint on mobile.
**Fix:** Remove `loading="lazy"` from the mobile hero image.

---

## Medium-Priority

### 8. Newsletter Form Success State Could Be More Prominent
**Location:** `C:\personal projects\qtways-website\src\components\sections\Newsletter.jsx`
**Issue:** On success, only button text changes and small message appears.
**Design Principle:** Clear feedback for user actions
**Fix:** Consider replacing form with success message or adding prominent checkmark animation.

### 9. Cart Item Images Using External Fallback
**Location:** `C:\personal projects\qtways-website\src\pages\CartPage.jsx` (lines 334-336)
**Issue:** Fallback to Unsplash image may be slow or unavailable.
**Design Principle:** Robust error handling
**Fix:** Use local placeholder image from `/images/placeholder-product.jpg`.

### 10. ShopByConcern Uses Hardcoded Icon Mapping
**Location:** `C:\personal projects\qtways-website\src\components\sections\ShopByConcern.jsx` (lines 6-15)
**Issue:** Icon mapping uses generic fallbacks (`Sparkles: Sun`, `Layers: Target`).
**Fix:** Create comprehensive icon registry or store icon name in data file.

### 11. Missing Breadcrumb Schema Markup
**Location:** `C:\personal projects\qtways-website\src\pages\ShopPage.jsx`, `C:\personal projects\qtways-website\src\pages\ProductDetailPage.jsx`
**Issue:** Breadcrumbs lack JSON-LD schema for SEO.
**Fix:** Add `<script type="application/ld+json">` with BreadcrumbList schema.

### 12. Checkout Login Uses Custom Event Pattern
**Location:** `C:\personal projects\qtways-website\src\pages\CheckoutPage.jsx` (lines 296-298)
**Issue:** `window.dispatchEvent(new CustomEvent('openLogin'))` is fragile.
**Fix:** Use React Context or prop drilling for more reliable state management.

### 13. Sticky Sidebar May Overlap Footer
**Location:** `C:\personal projects\qtways-website\src\pages\CartPage.jsx` (line 191)
**Issue:** `sticky top-24` without bottom constraint.
**Fix:** Add `max-h-[calc(100vh-96px)] overflow-auto` or use CSS `position: sticky` with bottom margin.

### 14. Product Detail Tabs Missing ARIA Pattern
**Location:** `C:\personal projects\qtways-website\src\pages\ProductDetailPage.jsx` (lines 417-435)
**Issue:** Tab interface doesn't implement full ARIA tabs pattern.
**Fix:** Add `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.

---

## Nitpicks

### Nit: Button Loading State Shows Generic Text
**Location:** `C:\personal projects\qtways-website\src\components\ui\Button.jsx` (line 73)
**Issue:** Loading state always shows "Loading..." regardless of context.
**Fix:** Add `loadingText` prop for contextual messages.

### Nit: Footer Payment Image Silently Hides on Error
**Location:** `C:\personal projects\qtways-website\src\components\layout\Footer.jsx` (line 163)
**Issue:** `onError` sets `display: 'none'` without visual indication.
**Fix:** Remove container entirely or show text fallback.

### Nit: Mobile Nav Escape Key Without Visual Hint
**Location:** `C:\personal projects\qtways-website\src\components\layout\MobileNav.jsx` (lines 45-57)
**Issue:** Escape key closes menu but there's no hint for users.
**Fix:** Add "Press ESC to close" text or tooltip.

### Nit: TrustBadges Heading Hierarchy
**Location:** `C:\personal projects\qtways-website\src\components\sections\TrustBadges.jsx` (line 34)
**Issue:** Uses `<h3>` without parent `<h2>` in section.
**Fix:** Either add section heading or use `<p>` with bold styling.

### Nit: Filter Section Toggle Missing ARIA Expanded
**Location:** `C:\personal projects\qtways-website\src\pages\ShopPage.jsx` (lines 537-548)
**Issue:** Expand/collapse button lacks `aria-expanded` attribute.
**Fix:** Add `aria-expanded={isExpanded}` to toggle buttons.

### Nit: Inconsistent Section Background Pattern
**Issue:** Some sections use `bg-cream-50`, some `bg-white`, some `bg-cream-100`.
**Fix:** Document intentional alternation pattern or standardize.

---

## Positive Observations

1. **Skip Link Implementation** - Properly implemented with screen reader support (`sr-only focus:not-sr-only`).

2. **Consistent Design Tokens** - Custom Tailwind classes (`container-custom`, `section-padding`, `shadow-soft`) promote consistency.

3. **Global Focus States** - `globals.css` defines focus-visible styles across the site.

4. **Reduced Motion Support** - `@media (prefers-reduced-motion: reduce)` properly implemented.

5. **Component Architecture** - Clean separation between layout, sections, and UI components.

6. **Mobile Nav Scroll Lock** - Body scroll properly locked when mobile nav is open.

7. **Semantic HTML** - Good use of `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`.

8. **Loading States** - Cart and checkout show loading indicators during async operations.

9. **Empty State Handling** - Cart and search show helpful empty states with CTAs.

10. **Image Error Handling** - Consistent fallback patterns across components.

---

## Files Requiring Updates

| File | Issues |
|------|--------|
| `src/pages/CheckoutPage.jsx` | #1, #2, #12 |
| `tailwind.config.js` | #3 |
| `src/components/ui/ProductCard.jsx` | #4 |
| `src/components/sections/Testimonials.jsx` | #5 |
| `src/pages/ShopPage.jsx` | #6, Nit #5 |
| `src/components/sections/Hero.jsx` | #7 |
| `src/components/sections/Newsletter.jsx` | #8 |
| `src/pages/CartPage.jsx` | #9, #13 |
| `src/components/sections/ShopByConcern.jsx` | #10 |
| `src/pages/ProductDetailPage.jsx` | #11, #14 |
| `src/components/ui/Button.jsx` | Nit #1 |
| `src/components/layout/Footer.jsx` | Nit #2 |
| `src/components/layout/MobileNav.jsx` | Nit #3 |
| `src/components/sections/TrustBadges.jsx` | Nit #4 |

---

## Recommended Action Priority

### Immediate (Before Launch)
1. Add `role="alert"` to form error messages (#1)
2. Verify all form label associations (#2)
3. Fix color token documentation mismatch (#3)
4. Remove lazy loading from hero mobile image (#7)

### Short-Term (This Sprint)
1. Add loading states to Quick Add buttons (#4)
2. Add pause control to testimonials carousel (#5)
3. Implement reduced motion check in animations (#6)
4. Add ARIA tabs pattern to product detail (#14)

### Future Enhancements
1. Add JSON-LD breadcrumb schema (#11)
2. Replace custom event with context pattern (#12)
3. Fix sticky sidebar footer overlap (#13)
4. Address all nitpicks

---

*This review was conducted based on static code analysis. Live testing in multiple browsers and with assistive technologies is recommended for comprehensive accessibility validation.*
