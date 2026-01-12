import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Droplet, Clock, Sun, Feather } from 'lucide-react';
import { getFeaturedConcerns } from '../../data';

const iconMap = {
  Target,
  Droplet,
  Clock,
  Sun,
  Feather,
  Sparkles: Sun, // Fallback
  Layers: Target, // Fallback
  Scissors: Target, // Fallback
};

export const ShopByConcern = ({
  title = 'Shop by Concern',
  subtitle = 'Find targeted solutions for your specific skin needs',
  className,
  ...props
}) => {
  const concerns = getFeaturedConcerns();

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

        {/* Concerns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {concerns.map((concern, index) => {
            const Icon = iconMap[concern.icon] || Target;
            return (
              <motion.div
                key={concern.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/concern/${concern.slug}`}
                  className="group block bg-cream-50 rounded-xl p-6 text-center hover:bg-cream-100 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-elegant transition-shadow">
                    <Icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="font-medium text-charcoal-900 mb-1 group-hover:text-gold-600 transition-colors">
                    {concern.name}
                  </h3>
                  <p className="text-xs text-charcoal-500 line-clamp-2">
                    {concern.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold-600 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;
