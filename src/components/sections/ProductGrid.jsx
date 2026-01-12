import { motion } from 'framer-motion';
import { ProductCard, ProductCardCompact } from '../ui';
import { cn } from '../../utils';

/**
 * Flexible product grid section
 * Supports different layouts and configurations
 */
export const ProductGrid = ({
  products = [],
  title,
  subtitle,
  columns = 4,
  compact = false,
  showAnimation = true,
  className,
  ...props
}) => {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  };

  const CardComponent = compact ? ProductCardCompact : ProductCard;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className={cn('section-padding', className)} {...props}>
      <div className="container-custom">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-charcoal-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Product Grid */}
        {showAnimation ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={cn(
              'grid gap-6',
              columnClasses[columns] || columnClasses[4]
            )}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <CardComponent product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className={cn(
              'grid gap-6',
              columnClasses[columns] || columnClasses[4]
            )}
          >
            {products.map((product) => (
              <CardComponent key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-500">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * New Arrivals Grid - Preconfigured for new products
 */
export const NewArrivalsGrid = ({
  products,
  className,
  ...props
}) => (
  <ProductGrid
    products={products}
    title="New Arrivals"
    subtitle="Be the first to try our latest skincare innovations"
    columns={4}
    className={className}
    {...props}
  />
);

/**
 * Sale Products Grid - Preconfigured for sale items
 */
export const SaleGrid = ({
  products,
  className,
  ...props
}) => (
  <ProductGrid
    products={products}
    title="On Sale"
    subtitle="Great deals on your favorite products"
    columns={4}
    className={className}
    {...props}
  />
);

export default ProductGrid;
