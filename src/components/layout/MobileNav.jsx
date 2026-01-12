import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, ChevronRight, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';
import { navigation, siteConfig } from '../../data';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
};

export const MobileNav = ({ isOpen, onClose, className, ...props }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal-900/50 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden',
              'flex flex-col shadow-elegant',
              className
            )}
            {...props}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cream-200">
              <Link to="/" onClick={onClose}>
                <span className="font-display text-2xl font-semibold text-charcoal-900">
                  {siteConfig.name}
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream-100 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-charcoal-700" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              {/* Main Navigation */}
              <div className="px-4 mb-6">
                <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wide mb-2">
                  Menu
                </p>
                <ul className="space-y-1">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between py-3 px-3 rounded-md transition-colors',
                            isActive
                              ? 'bg-cream-100 text-charcoal-900'
                              : 'text-charcoal-700 hover:bg-cream-50'
                          )
                        }
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="w-4 h-4 text-charcoal-400" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="px-4 mb-6">
                <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wide mb-2">
                  Shop by Category
                </p>
                <ul className="space-y-1">
                  {navigation.categories.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between py-3 px-3 rounded-md transition-colors',
                            isActive
                              ? 'bg-cream-100 text-charcoal-900'
                              : 'text-charcoal-700 hover:bg-cream-50'
                          )
                        }
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-4 h-4 text-charcoal-400" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="px-4 mb-6">
                <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wide mb-2">
                  Help
                </p>
                <ul className="space-y-1">
                  {navigation.footer.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="block py-2 px-3 text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t border-cream-200 p-4">
              {/* Contact */}
              <div className="space-y-2 mb-4">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {siteConfig.contact.email}
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {Object.entries(siteConfig.social).map(([key, { url }]) => {
                  const Icon = socialIcons[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100 rounded-md transition-colors"
                      aria-label={`Follow us on ${key}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
