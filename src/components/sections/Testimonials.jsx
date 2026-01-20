import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { TestimonialCard, TestimonialFeatured } from '../ui';
import { getFeaturedTestimonials, getAverageRating, getTotalReviews } from '../../data';
import { Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Testimonials = ({
  title = 'What Our Customers Say',
  subtitle = 'Real reviews from real people who love QTWAYS',
  variant = 'carousel',
  className,
  ...props
}) => {
  const testimonials = getFeaturedTestimonials();
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviews();

  if (variant === 'featured' && testimonials.length > 0) {
    return (
      <section
        className={`section-padding bg-cream-50 ${className}`}
        {...props}
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TestimonialFeatured testimonial={testimonials[0]} />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`section-padding bg-cream-50 ${className}`}
      {...props}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-charcoal-600 max-w-2xl mx-auto mb-6">
              {subtitle}
            </p>
          )}

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-soft">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-gold-500 fill-gold-500'
                      : 'text-charcoal-200 fill-charcoal-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-charcoal-900">{averageRating}</span>
            <span className="text-charcoal-500">from {totalReviews} reviews</span>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
