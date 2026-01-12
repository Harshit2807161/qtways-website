import {
  Hero,
  TrustBadges,
  FeaturedProducts,
  BestSellers,
  ShopByCategory,
  ShopByConcern,
  Testimonials,
  BrandStory,
  Newsletter,
} from '../components';

export const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Shop by Concern */}
      <ShopByConcern />

      {/* Best Sellers */}
      <BestSellers />

      {/* Testimonials */}
      <Testimonials />

      {/* Brand Story */}
      <BrandStory />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
};

export default HomePage;
