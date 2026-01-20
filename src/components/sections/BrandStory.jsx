import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Award } from 'lucide-react';
import { Button } from '../ui';

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We source the finest natural ingredients from around the world.',
  },
  {
    icon: Heart,
    title: 'Cruelty Free',
    description: 'Never tested on animals. Always kind to nature.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Every product meets our rigorous quality standards.',
  },
];

export const BrandStory = ({
  className,
  ...props
}) => {
  return (
    <section
      className={`section-padding bg-cream-50 overflow-hidden ${className}`}
      {...props}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/about-story.jpg"
                alt="QTWAYS Brand Story"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80';
                }}
              />
            </div>

            {/* Accent Shape */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-gold-100 rounded-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-medium rounded-full mb-6">
              Our Story
            </span>

            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-6">
              Beauty That Cares,
              <span className="block text-gold-600">Naturally</span>
            </h2>

            <p className="text-charcoal-600 leading-relaxed mb-6">
              At QTWAYS, we believe that true beauty comes from nature. Founded with a passion
              for creating effective, natural skincare, we've dedicated ourselves to developing
              products that work in harmony with your skin.
            </p>

            <p className="text-charcoal-600 leading-relaxed mb-8">
              Every product is crafted with carefully selected ingredients, backed by science,
              and designed to deliver visible results. Because you deserve skincare that truly cares.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="w-10 h-10 bg-cream-100 rounded-full flex items-center justify-center mb-3 mx-auto sm:mx-0">
                    <value.icon className="w-5 h-5 text-gold-600" />
                  </div>
                  <h3 className="font-medium text-charcoal-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-charcoal-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button
              as={Link}
              to="/about"
              variant="secondary"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
