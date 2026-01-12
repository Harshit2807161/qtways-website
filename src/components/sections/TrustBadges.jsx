import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { trustBadges } from '../../data';

const iconMap = {
  Truck,
  Shield,
  RotateCcw,
  HeadphonesIcon: Headphones,
};

export const TrustBadges = ({ className, ...props }) => {
  return (
    <section
      className={`py-12 bg-cream-100 border-y border-cream-200 ${className}`}
      {...props}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustBadges.map((badge, index) => {
            const Icon = iconMap[badge.icon] || Shield;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft mb-3">
                  <Icon className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-medium text-charcoal-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-charcoal-500">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
