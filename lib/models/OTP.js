import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+91\d{10}$/, 'Please enter a valid Indian phone number'],
  },
  otp: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL: 5 minutes (300 seconds)
  },
});

// Index for faster queries
OTPSchema.index({ phone: 1 });
OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Static method to generate OTP
OTPSchema.statics.generateOTP = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Static method to create or update OTP for a phone number
OTPSchema.statics.createForPhone = async function(phone) {
  // Delete any existing OTP for this phone
  await this.deleteMany({ phone });

  // Generate new OTP
  const otp = this.generateOTP();

  // Create new OTP document
  const otpDoc = await this.create({
    phone,
    otp,
    attempts: 0,
  });

  return otpDoc;
};

// Static method to verify OTP
OTPSchema.statics.verifyOTP = async function(phone, inputOTP) {
  const otpDoc = await this.findOne({ phone });

  if (!otpDoc) {
    return { valid: false, error: 'OTP expired or not found' };
  }

  if (otpDoc.attempts >= 5) {
    await this.deleteOne({ phone });
    return { valid: false, error: 'Too many attempts. Please request a new OTP.' };
  }

  if (otpDoc.otp !== inputOTP) {
    otpDoc.attempts += 1;
    await otpDoc.save();
    return {
      valid: false,
      error: `Incorrect OTP. ${5 - otpDoc.attempts} attempts remaining.`,
      attemptsRemaining: 5 - otpDoc.attempts,
    };
  }

  // OTP is valid - delete it
  await this.deleteOne({ phone });
  return { valid: true };
};

export default mongoose.models.OTP || mongoose.model('OTP', OTPSchema);
