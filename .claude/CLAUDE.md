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

**✅ Always:**
- Use Tailwind for styling
- Follow component structure in /components
- Extract reusable logic to hooks
- Use data from /data files

**⚠️ Ask first:**
- Adding new dependencies
- Creating new page routes
- Modifying tailwind.config.js

**🚫 Never:**
- Commit API keys or secrets
- Use inline styles
- Skip responsive testing
- Modify public/images without optimization

---

## Known Gotchas

- Swiper requires specific CSS imports for navigation/pagination
- Framer Motion animations need `layout` prop for smooth resizing
- Mobile nav drawer needs body scroll lock when open
- Product images should be WebP format with JPEG fallback
- ALWAYS KEEP TRACK OF THE CURRENT SPRINT'S PROGRESS BY UPDATING @docs/implementation-progress.md USING agent-technical-writer and also updating a CHANGELOG against every github push 
- Use specialised agents wherever you find someone's role fitting to your to-do
- Maintain a github repo called qtways-website and use branches for different features and merge them to main after testing 
- Keep adding permissions you get from me to allow in settings.local.json
---

## Brand Info

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

