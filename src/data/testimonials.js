/**
 * Customer testimonials data for QTWAYS website
 */

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: '/images/testimonials/avatar-1.jpg',
    rating: 5,
    title: 'Best Vitamin C Serum I\'ve Used!',
    content: 'I\'ve tried many vitamin C serums, but QTWAYS is truly exceptional. My dark spots have visibly faded in just 4 weeks, and my skin has never looked more radiant. The texture is lightweight and absorbs beautifully.',
    productId: 'fc-001',
    productName: 'Vitamin C Brightening Serum',
    verified: true,
    date: '2024-12-15',
    helpful: 47,
    featured: true
  },
  {
    id: 2,
    name: 'Rahul Mehra',
    location: 'Delhi',
    avatar: '/images/testimonials/avatar-2.jpg',
    rating: 5,
    title: 'Finally Found the Right Moisturizer',
    content: 'As someone with combination skin, finding a moisturizer that doesn\'t make me oily was challenging. The Hyaluronic Acid Moisturizer is perfect - hydrating without heaviness. My skin feels balanced all day.',
    productId: 'fc-002',
    productName: 'Hydrating Hyaluronic Acid Moisturizer',
    verified: true,
    date: '2024-12-10',
    helpful: 32,
    featured: true
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    location: 'Bangalore',
    avatar: '/images/testimonials/avatar-3.jpg',
    rating: 5,
    title: 'Transformed My Oily Skin',
    content: 'The Niacinamide Serum has been a game-changer for my oily, acne-prone skin. My pores look smaller, and I no longer get that midday oil slick. Definitely repurchasing!',
    productId: 'fc-003',
    productName: 'Niacinamide Pore Minimizing Serum',
    verified: true,
    date: '2024-11-28',
    helpful: 56,
    featured: true
  },
  {
    id: 4,
    name: 'Sneha Patel',
    location: 'Ahmedabad',
    avatar: '/images/testimonials/avatar-4.jpg',
    rating: 4,
    title: 'Gentle Yet Effective',
    content: 'I have very sensitive skin, so I was nervous to try new products. The Gentle Foam Cleanser is incredibly mild but still removes all my makeup. No tightness or irritation at all.',
    productId: 'fc-004',
    productName: 'Gentle Foam Cleanser',
    verified: true,
    date: '2024-11-20',
    helpful: 28,
    featured: false
  },
  {
    id: 5,
    name: 'Kavitha Nair',
    location: 'Chennai',
    avatar: '/images/testimonials/avatar-5.jpg',
    rating: 5,
    title: 'Holy Grail Body Lotion',
    content: 'Living in a humid city, I needed something that moisturizes without feeling sticky. The Shea Butter Body Lotion is perfect - absorbs quickly and keeps my skin soft all day. The scent is subtle and lovely.',
    productId: 'bc-001',
    productName: 'Shea Butter Body Lotion',
    verified: true,
    date: '2024-12-05',
    helpful: 41,
    featured: true
  },
  {
    id: 6,
    name: 'Amit Kumar',
    location: 'Kolkata',
    avatar: '/images/testimonials/avatar-6.jpg',
    rating: 5,
    title: 'My Hair Has Never Looked Better',
    content: 'Started using the Argan Oil Hair Serum 2 months ago. My frizzy hair is now smooth and shiny. I use just 2 drops after washing - a little goes a long way. Highly recommend!',
    productId: 'hc-001',
    productName: 'Argan Oil Hair Serum',
    verified: true,
    date: '2024-11-15',
    helpful: 38,
    featured: true
  },
  {
    id: 7,
    name: 'Deepika Joshi',
    location: 'Pune',
    avatar: '/images/testimonials/avatar-7.jpg',
    rating: 5,
    title: 'Traditional Oil with Modern Results',
    content: 'I was looking for an ayurvedic hair oil that actually works. The Strengthening Hair Oil with Bhringraj and Amla has significantly reduced my hair fall. My grandmother would approve!',
    productId: 'hc-002',
    productName: 'Strengthening Hair Oil',
    verified: true,
    date: '2024-12-01',
    helpful: 63,
    featured: false
  },
  {
    id: 8,
    name: 'Meera Krishnan',
    location: 'Hyderabad',
    avatar: '/images/testimonials/avatar-8.jpg',
    rating: 5,
    title: 'Visible Results with Retinol',
    content: 'I was intimidated by retinol, but the encapsulated formula in this night cream is so gentle. My fine lines around the eyes have softened, and my skin texture has improved dramatically.',
    productId: 'fc-005',
    productName: 'Retinol Night Repair Cream',
    verified: true,
    date: '2024-12-08',
    helpful: 52,
    featured: true
  },
  {
    id: 9,
    name: 'Rajesh Gupta',
    location: 'Jaipur',
    avatar: '/images/testimonials/avatar-9.jpg',
    rating: 4,
    title: 'Good Immunity Support',
    content: 'Been taking these supplements for a month. I feel more energetic and haven\'t caught a cold this season despite everyone around me being sick. Will continue using.',
    productId: 'hw-001',
    productName: 'Immunity Boost Supplements',
    verified: true,
    date: '2024-11-25',
    helpful: 19,
    featured: false
  },
  {
    id: 10,
    name: 'Nisha Agarwal',
    location: 'Lucknow',
    avatar: '/images/testimonials/avatar-10.jpg',
    rating: 5,
    title: 'Collagen from Within',
    content: 'The Collagen Beauty Drink tastes great and I\'ve noticed my skin is more plump and my nails are stronger. It\'s become part of my morning routine. Worth the investment!',
    productId: 'hw-002',
    productName: 'Collagen Beauty Drink',
    verified: true,
    date: '2024-12-12',
    helpful: 34,
    featured: false
  }
];

// Helper functions
export const getTestimonialById = (id) => testimonials.find(t => t.id === id);

export const getTestimonialsByProduct = (productId) =>
  testimonials.filter(t => t.productId === productId);

export const getFeaturedTestimonials = () =>
  testimonials.filter(t => t.featured);

export const getTopTestimonials = (count = 6) =>
  [...testimonials]
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, count);

export const getRecentTestimonials = (count = 6) =>
  [...testimonials]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);

export const getAverageRating = () => {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return (total / testimonials.length).toFixed(1);
};

export const getTotalReviews = () => testimonials.length;

export default testimonials;
