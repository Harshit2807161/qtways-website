# Design Review Findings - QTWAYS Website

> Review conducted: January 11, 2026
> Reviewed against: `context/design-principles.md` and `context/style-guide.md`

---

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 3 | ✅ Fixed |
| Major | 5 | ✅ Fixed |
| Minor | 4 | ✅ Fixed |

> **All issues resolved on January 12, 2026**

---

## Critical Issues

### 1. Missing Skip-to-Content Link
**Location:** `App.jsx`
**Issue:** No skip-to-content link for keyboard users to bypass navigation.
**Design Principle:** Accessibility Checklist - "Skip to main content link"
**Fix:**
```jsx
// Add at start of App component, before AnnouncementBar
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-white focus:rounded-md"
>
  Skip to main content
</a>
// Add id="main-content" to the main content div
```

### 2. Missing ARIA Labels on Icon Buttons
**Location:** `Header.jsx`, `MobileNav.jsx`, `CartDrawer.jsx`
**Issue:** Some icon-only buttons lack `aria-label` attributes.
**Design Principle:** Accessibility - "ARIA labels where needed"
**Fix:** Audit all icon buttons and add descriptive aria-labels.

### 3. Newsletter Input Missing Visible Label
**Location:** `Newsletter.jsx:83-90`
**Issue:** Input has placeholder but no `<label>` element.
**Design Principle:** Forms - "Labels above inputs"
**Fix:**
```jsx
<label htmlFor="email-input" className="sr-only">Email address</label>
<input id="email-input" ... />
```

---

## Major Issues

### 4. Background Color Inconsistency
**Location:** `ShopByConcern.jsx:27`, `Testimonials.jsx:26`, `BrandStory.jsx`
**Issue:** Using `bg-white` instead of cream tones per style guide.
**Design Principle:** "Don't use pure white (#FFFFFF) for backgrounds"
**Current:** `bg-white`
**Fix:** Change to `bg-cream-50` for consistency with warm theme.

### 5. Missing Lazy Loading on Images
**Location:** `Hero.jsx:110-117`, `CategoryCard.jsx`, various sections
**Issue:** Hero image and some category images missing `loading="lazy"`.
**Design Principle:** Performance - "Images optimized and lazy loaded"
**Fix:** Add `loading="lazy"` to all below-fold images.

### 6. Text Color Inconsistencies
**Location:** Multiple files
**Issue:** Using `charcoal-500` for secondary text instead of `charcoal-600`.
**Style Guide:** "charcoal-600 (#5C5C5C) - Secondary text, captions"
**Files to update:**
- `Hero.jsx:89,93,97` - Stats labels use `charcoal-500`
- `ShopByConcern.jsx:70` - Uses `charcoal-500`
**Fix:** Change `text-charcoal-500` to `text-charcoal-600`.

### 7. Hero Image Hidden on Mobile
**Location:** `Hero.jsx:103-141`
**Issue:** Hero image container has `hidden lg:block`, showing nothing on mobile.
**Design Principle:** Mobile-first design
**Fix:** Consider showing a smaller/cropped hero image on mobile, or add visual interest to text-only mobile view.

### 8. Missing Focus States
**Location:** Various interactive elements
**Issue:** Not all interactive elements have visible focus states.
**Design Principle:** "Focus visible on all interactive elements"
**Fix:** Audit and add `focus-visible:ring-2 focus-visible:ring-gold-500` to:
- Footer social links
- Newsletter input (already has, verify)
- All Link components that aren't buttons

---

## Minor Issues

### 9. ShopByConcern Grid Layout
**Location:** `ShopByConcern.jsx:49`
**Issue:** 5-column grid on desktop (`lg:grid-cols-5`) may look unbalanced.
**Current:** `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`
**Fix:** Consider `lg:grid-cols-4` for better visual balance, or ensure content fills 5 columns evenly.

### 10. Missing Title Attributes on Social Icons
**Location:** `Footer.jsx:41-52`
**Issue:** Social links have `aria-label` but no `title` for hover tooltip.
**Fix:** Add `title={key}` to show platform name on hover.

### 11. Animation Delay Inconsistency
**Location:** Multiple section files
**Issue:** Stagger delays vary (0.05, 0.1, 0.2) without clear pattern.
**Design Principle:** "Stagger delays: 50-100ms between items"
**Fix:** Standardize to 0.1s (100ms) for all staggered animations.

### 12. Hero Badge Colors
**Location:** `Hero.jsx:31`
**Issue:** Badge uses `bg-gold-100 text-gold-700` which doesn't match Badge component.
**Style Guide:** Badges should use defined variants.
**Fix:** Consider using the Badge component or matching its color scheme.

---

## Responsive Testing Checklist

### 375px (Mobile)
- [ ] Hero text readable without horizontal scroll
- [ ] Navigation hamburger menu visible and functional
- [ ] Product cards stack properly
- [ ] Touch targets are 44px minimum
- [ ] Footer columns stack vertically

### 768px (Tablet)
- [ ] Grid layouts adjust to 2-3 columns
- [ ] Hero content centered
- [ ] Navigation still uses mobile menu
- [ ] Product carousel shows 2 slides

### 1440px (Desktop)
- [ ] Container width is appropriate (now 1400px on 2xl)
- [ ] Full navigation visible
- [ ] Hero shows side-by-side layout with image
- [ ] Product carousel shows 4 slides
- [ ] Footer shows 4-column grid

---

## Action Items

1. **Accessibility Sprint** (Critical)
   - Add skip-to-content link
   - Add missing aria-labels
   - Add Newsletter label
   - Test with screen reader

2. **Visual Consistency Sprint** (Major)
   - Fix background colors
   - Fix text colors
   - Add lazy loading
   - Review mobile hero

3. **Polish Sprint** (Minor)
   - Standardize animations
   - Fix grid layouts
   - Add title attributes
   - Update badge colors

---

## Files to Modify

| File | Issues |
|------|--------|
| `App.jsx` | #1 (skip link) |
| `Header.jsx` | #2 (aria-labels) |
| `Hero.jsx` | #5, #6, #7, #12 |
| `Newsletter.jsx` | #3 (label) |
| `ShopByConcern.jsx` | #4, #6, #9 |
| `Testimonials.jsx` | #4 |
| `Footer.jsx` | #10 |
| `globals.css` | #8 (focus styles) |
