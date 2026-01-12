import { motion } from 'framer-motion';
import { CategoryCard } from '../ui';
import { getFeaturedCategories } from '../../data';

export const ShopByCategory = ({
  title = 'Shop by Category',
  subtitle = 'Find the perfect products for every part of your skincare routine',
  className,
  ...props
}) => {
  const categories = getFeaturedCategories();

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
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard category={category} variant="overlay" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
