import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductCard, Button } from '../ui';
import { getFeaturedProducts, getBestSellers } from '../../data';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const FeaturedProducts = ({
  title = 'Featured Products',
  subtitle = 'Discover our carefully curated selection of premium skincare essentials',
  products = null,
  viewAllLink = '/shop',
  viewAllText = 'View All Products',
  className,
  ...props
}) => {
  const displayProducts = products || getFeaturedProducts();

  return (
    <section
      className={`section-padding bg-white ${className}`}
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
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {displayProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Button
            as={Link}
            to={viewAllLink}
            variant="secondary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {viewAllText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Best Sellers variant
export const BestSellers = ({ className, ...props }) => {
  return (
    <FeaturedProducts
      title="Best Sellers"
      subtitle="Our most loved products, trusted by thousands of customers"
      products={getBestSellers()}
      viewAllLink="/shop?filter=bestseller"
      viewAllText="Shop Best Sellers"
      className={className}
      {...props}
    />
  );
};

export default FeaturedProducts;
