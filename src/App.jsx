import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AnnouncementBar,
  Header,
  MobileNav,
  Footer,
  WhatsAppButton,
  SearchModal,
  CartDrawer,
} from './components';
import { useCart } from './hooks';
import HomePage from './pages/HomePage';

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header
        onMenuOpen={() => setIsMobileNavOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={itemCount}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Placeholder routes for future pages */}
          <Route path="/shop" element={<PlaceholderPage title="Shop" />} />
          <Route path="/category/:slug" element={<PlaceholderPage title="Category" />} />
          <Route path="/concern/:slug" element={<PlaceholderPage title="Concern" />} />
          <Route path="/product/:slug" element={<PlaceholderPage title="Product" />} />
          <Route path="/about" element={<PlaceholderPage title="About Us" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
          <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms-of-service" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="/shipping-policy" element={<PlaceholderPage title="Shipping Policy" />} />
          <Route path="/return-policy" element={<PlaceholderPage title="Return Policy" />} />
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

// Temporary placeholder for future pages
const PlaceholderPage = ({ title }) => (
  <div className="container-custom section-padding text-center">
    <h1 className="font-display text-4xl text-charcoal-900 mb-4">{title}</h1>
    <p className="text-charcoal-600">This page is coming soon.</p>
  </div>
);

export default App;
