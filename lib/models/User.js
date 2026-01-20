import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true,
  },
  addressLine2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{6}$/, 'Please enter a valid 6-digit PIN code'],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, { _id: true });

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\+91\d{10}$/, 'Please enter a valid Indian phone number'],
  },
  name: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  addresses: [AddressSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for faster queries
UserSchema.index({ phone: 1 });
UserSchema.index({ email: 1 }, { sparse: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
