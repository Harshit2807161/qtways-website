import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

/**
 * Reusable Carousel component wrapping Swiper
 *
 * @param {Object} props
 * @param {React.ReactNode[]} props.children - Slides content
 * @param {number} props.slidesPerView - Number of slides visible (default: 1)
 * @param {number} props.spaceBetween - Space between slides in px (default: 16)
 * @param {boolean} props.navigation - Show navigation arrows (default: true)
 * @param {boolean} props.pagination - Show pagination dots (default: false)
 * @param {boolean} props.autoplay - Enable autoplay (default: false)
 * @param {number} props.autoplayDelay - Autoplay delay in ms (default: 5000)
 * @param {boolean} props.loop - Enable infinite loop (default: false)
 * @param {boolean} props.freeMode - Enable free scroll mode (default: false)
 * @param {Object} props.breakpoints - Responsive breakpoints config
 * @param {string} props.className - Additional container classes
 */
export const Carousel = ({
  children,
  slidesPerView = 1,
  spaceBetween = 16,
  navigation = true,
  pagination = false,
  autoplay = false,
  autoplayDelay = 5000,
  loop = false,
  freeMode = false,
  breakpoints,
  className,
  slideClassName,
  ...props
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Build modules array based on props
  const modules = [];
  if (navigation) modules.push(Navigation);
  if (pagination) modules.push(Pagination);
  if (autoplay) modules.push(Autoplay);
  if (freeMode) modules.push(FreeMode);

  // Default responsive breakpoints
  const defaultBreakpoints = {
    640: { slidesPerView: Math.min(slidesPerView, 2) },
    768: { slidesPerView: Math.min(slidesPerView, 3) },
    1024: { slidesPerView: slidesPerView },
  };

  return (
    <div className={cn('relative group', className)}>
      <Swiper
        modules={modules}
        slidesPerView={1}
        spaceBetween={spaceBetween}
        navigation={navigation ? {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        } : false}
        pagination={pagination ? {
          clickable: true,
          dynamicBullets: true,
        } : false}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        loop={loop}
        freeMode={freeMode ? {
          enabled: true,
          sticky: false,
        } : false}
        breakpoints={breakpoints || defaultBreakpoints}
        onInit={(swiper) => {
          // Re-assign navigation elements after init
          if (navigation && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        className="!overflow-visible"
        {...props}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <SwiperSlide key={index} className={slideClassName}>
              {child}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className={slideClassName}>{children}</SwiperSlide>
        )}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {navigation && (
        <>
          <button
            ref={prevRef}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10',
              'w-10 h-10 bg-white rounded-full shadow-soft',
              'flex items-center justify-center',
              'text-charcoal-800 hover:bg-charcoal-900 hover:text-white',
              'transition-all duration-300',
              'opacity-0 group-hover:opacity-100',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10',
              'w-10 h-10 bg-white rounded-full shadow-soft',
              'flex items-center justify-center',
              'text-charcoal-800 hover:bg-charcoal-900 hover:text-white',
              'transition-all duration-300',
              'opacity-0 group-hover:opacity-100',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

/**
 * Product Carousel - Preconfigured for product display
 */
export const ProductCarousel = ({ children, className, ...props }) => (
  <Carousel
    slidesPerView={4}
    spaceBetween={24}
    navigation
    breakpoints={{
      0: { slidesPerView: 1.2, spaceBetween: 16 },
      480: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
    }}
    className={className}
    {...props}
  >
    {children}
  </Carousel>
);

/**
 * Hero Carousel - Preconfigured for hero banners
 */
export const HeroCarousel = ({ children, className, ...props }) => (
  <Carousel
    slidesPerView={1}
    navigation
    pagination
    autoplay
    autoplayDelay={6000}
    loop
    className={className}
    {...props}
  >
    {children}
  </Carousel>
);

/**
 * Testimonial Carousel - Preconfigured for testimonials
 */
export const TestimonialCarousel = ({ children, className, ...props }) => (
  <Carousel
    slidesPerView={3}
    spaceBetween={32}
    navigation
    breakpoints={{
      0: { slidesPerView: 1, spaceBetween: 16 },
      640: { slidesPerView: 1.5, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 32 },
    }}
    className={className}
    {...props}
  >
    {children}
  </Carousel>
);

export default Carousel;
