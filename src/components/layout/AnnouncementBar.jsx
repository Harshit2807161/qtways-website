import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';
import { announcements } from '../../data';

export const AnnouncementBar = ({ className, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentAnnouncement = announcements[currentIndex];

  // Auto-rotate announcements
  useEffect(() => {
    if (isPaused || announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  if (!isVisible) return null;

  const content = (
    <span className="text-sm font-medium">{currentAnnouncement.text}</span>
  );

  return (
    <div
      className={cn(
        'relative bg-charcoal-900 text-white py-2.5',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...props}
    >
      <div className="container-custom">
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          {announcements.length > 1 && (
            <button
              onClick={goToPrevious}
              className="p-1 hover:bg-charcoal-800 rounded transition-colors hidden sm:block"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Announcement Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {currentAnnouncement.link ? (
                <Link
                  to={currentAnnouncement.link}
                  className="hover:text-gold-400 transition-colors inline-flex items-center gap-2"
                >
                  {content}
                  <span className="text-gold-400">→</span>
                </Link>
              ) : (
                content
              )}
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          {announcements.length > 1 && (
            <button
              onClick={goToNext}
              className="p-1 hover:bg-charcoal-800 rounded transition-colors hidden sm:block"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-charcoal-800 rounded transition-colors"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dots indicator for mobile */}
        {announcements.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-1.5 sm:hidden">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors',
                  index === currentIndex ? 'bg-gold-400' : 'bg-charcoal-600'
                )}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;
