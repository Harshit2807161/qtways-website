import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';
import { navigation, siteConfig } from '../../data';

export const Header = ({
  onMenuOpen,
  onSearchOpen,
  onCartOpen,
  cartItemCount = 0,
  className,
  ...props
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white',
        className
      )}
      {...props}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuOpen}
            className="p-2 -ml-2 lg:hidden hover:bg-cream-100 rounded-md transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-charcoal-800" />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <span className="font-display text-2xl md:text-3xl font-semibold text-charcoal-900 tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.main.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors relative py-2',
                    isActive
                      ? 'text-charcoal-900'
                      : 'text-charcoal-600 hover:text-charcoal-900',
                    isActive && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-500'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="p-2 hover:bg-cream-100 rounded-md transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5 text-charcoal-700" />
            </button>

            {/* Wishlist - Hidden on mobile */}
            {siteConfig.features.wishlist && (
              <Link
                to="/wishlist"
                className="p-2 hover:bg-cream-100 rounded-md transition-colors hidden md:block"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5 text-charcoal-700" />
              </Link>
            )}

            {/* Account - Hidden on mobile */}
            <Link
              to="/account"
              className="p-2 hover:bg-cream-100 rounded-md transition-colors hidden md:block"
              aria-label="My account"
            >
              <User className="w-5 h-5 text-charcoal-700" />
            </Link>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="p-2 hover:bg-cream-100 rounded-md transition-colors relative"
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-700" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold-500 text-white text-xs font-medium rounded-full flex items-center justify-center"
                  >
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar - Desktop only */}
      <div className="hidden lg:block border-t border-cream-200">
        <div className="container-custom">
          <nav className="flex items-center justify-center gap-8 py-3">
            {navigation.categories.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors',
                    isActive
                      ? 'text-gold-600'
                      : 'text-charcoal-600 hover:text-charcoal-900'
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
