import dbConnect from '../../lib/mongodb.js';
import User from '../../lib/models/User.js';
import OTP from '../../lib/models/OTP.js';
import Cart from '../../lib/models/Cart.js';
import { validatePhone } from '../../lib/services/sms.js';
import {
  generateToken,
  serializeCookie,
  getAuthCookieOptions,
} from '../../lib/middleware/auth.js';
import {
  successResponse,
  errorResponse,
  methodNotAllowedResponse,
  handleCors,
  withErrorHandling,
} from '../../lib/apiUtils.js';

/**
 * POST /api/auth/verify-otp
 * Verify OTP and authenticate user
 *
 * Body:
 * - phone: string (10 digits or +91XXXXXXXXXX)
 * - otp: string (6 digits)
 * - sessionId?: string (optional, for merging guest cart)
 *
 * Response:
 * - success: boolean
 * - message: string
 * - data: { user: User, isNewUser: boolean }
 *
 * Sets httpOnly cookie with JWT token
 */
async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Only allow POST requests
  if (req.method !== 'POST') {
    return methodNotAllowedResponse(res, ['POST']);
  }

  const { phone, otp, sessionId } = req.body || {};

  // Validate phone number
  const validation = validatePhone(phone);
  if (!validation.valid) {
    return errorResponse(res, validation.error, 400);
  }

  const formattedPhone = validation.formatted;

  // Validate OTP format
  if (!otp || !/^\d{6}$/.test(otp)) {
    return errorResponse(res, 'Please enter a valid 6-digit OTP', 400);
  }

  await dbConnect();

  // Verify OTP
  const otpResult = await OTP.verifyOTP(formattedPhone, otp);

  if (!otpResult.valid) {
    return errorResponse(res, otpResult.error, 400);
  }

  try {
    // Find or create user
    let user = await User.findOne({ phone: formattedPhone });
    let isNewUser = false;

    if (!user) {
      user = await User.create({
        phone: formattedPhone,
        name: '',
        lastLogin: new Date(),
      });
      isNewUser = true;
    } else {
      user.lastLogin = new Date();
      await user.save();
    }

    // Merge guest cart if sessionId provided
    if (sessionId) {
      const guestCart = await Cart.findOne({ sessionId });
      if (guestCart && guestCart.items.length > 0) {
        let userCart = await Cart.findOne({ userId: user._id });

        if (!userCart) {
          // Transfer guest cart to user
          guestCart.userId = user._id;
          guestCart.sessionId = null;
          await guestCart.save();
        } else {
          // Merge guest cart into user cart
          await userCart.mergeWith(guestCart);
          await Cart.deleteOne({ _id: guestCart._id });
        }
      }
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Set cookie
    const cookieOptions = getAuthCookieOptions();
    const cookie = serializeCookie('token', token, cookieOptions);
    res.setHeader('Set-Cookie', cookie);

    // Return user data (excluding sensitive fields)
    const userData = {
      _id: user._id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      addresses: user.addresses,
      createdAt: user.createdAt,
    };

    return successResponse(res, {
      user: userData,
      isNewUser,
    }, isNewUser ? 'Account created successfully' : 'Login successful');

  } catch (error) {
    console.error('Verify OTP error:', error);
    return errorResponse(res, 'Authentication failed. Please try again.', 500);
  }
}

export default withErrorHandling(handler);
