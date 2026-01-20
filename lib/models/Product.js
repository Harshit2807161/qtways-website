import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
    default: null,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  concerns: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  ingredients: [{
    type: String,
    trim: true,
  }],
  benefits: [{
    type: String,
    trim: true,
  }],
  howToUse: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    min: 0,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    min: 0,
    default: 100,
  },
  badge: {
    type: String,
    enum: ['bestseller', 'new', 'sale', null],
    default: null,
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for common queries
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ concerns: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ badge: 1 });
ProductSchema.index({ isActive: 1 });

// Text index for search
ProductSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
});

// Virtual for discount percentage
ProductSchema.virtual('discount').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Ensure virtuals are included in JSON
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
