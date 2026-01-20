import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  sessionId: {
    type: String,
    default: null,
  },
  items: [CartItemSchema],
}, {
  timestamps: true,
});

// Index for faster queries
CartSchema.index({ userId: 1 });
CartSchema.index({ sessionId: 1 });
CartSchema.index({ updatedAt: 1 });

// Ensure either userId or sessionId is present
CartSchema.pre('save', function(next) {
  if (!this.userId && !this.sessionId) {
    next(new Error('Cart must have either userId or sessionId'));
  }
  next();
});

// Static method to find or create cart
CartSchema.statics.findOrCreate = async function(query) {
  let cart = await this.findOne(query);
  if (!cart) {
    cart = await this.create({ ...query, items: [] });
  }
  return cart;
};

// Instance method to add item
CartSchema.methods.addItem = async function(productId, quantity = 1) {
  const existingItem = this.items.find(
    item => item.productId.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
  } else {
    this.items.push({ productId, quantity });
  }

  return this.save();
};

// Instance method to update item quantity
CartSchema.methods.updateItemQuantity = async function(productId, quantity) {
  const item = this.items.find(
    item => item.productId.toString() === productId.toString()
  );

  if (item) {
    if (quantity <= 0) {
      this.items = this.items.filter(
        i => i.productId.toString() !== productId.toString()
      );
    } else {
      item.quantity = Math.min(quantity, 10);
    }
    return this.save();
  }

  return this;
};

// Instance method to remove item
CartSchema.methods.removeItem = async function(productId) {
  this.items = this.items.filter(
    item => item.productId.toString() !== productId.toString()
  );
  return this.save();
};

// Instance method to clear cart
CartSchema.methods.clear = async function() {
  this.items = [];
  return this.save();
};

// Instance method to merge guest cart into user cart
CartSchema.methods.mergeWith = async function(guestCart) {
  for (const guestItem of guestCart.items) {
    const existingItem = this.items.find(
      item => item.productId.toString() === guestItem.productId.toString()
    );

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + guestItem.quantity, 10);
    } else {
      this.items.push({
        productId: guestItem.productId,
        quantity: guestItem.quantity,
      });
    }
  }

  return this.save();
};

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
