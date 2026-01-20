import dbConnect from '../../lib/mongodb.js';
import OTP from '../../lib/models/OTP.js';
import { sendOTP, validatePhone } from '../../lib/services/sms.js';
import {
  successResponse,
  errorResponse,
  methodNotAllowedResponse,
  handleCors,
  withErrorHandling,
  checkRateLimit,
} from '../../lib/apiUtils.js';

/**
 * POST /api/auth/send-otp
 * Send OTP to phone number for authentication
 *
 * Body:
 * - phone: string (10 digits or +91XXXXXXXXXX)
 *
 * Response:
 * - success: boolean
 * - message: string
 * - data: { phone: string (masked), expiresIn: number }
 */
async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Only allow POST requests
  if (req.method !== 'POST') {
    return methodNotAllowedResponse(res, ['POST']);
  }

  const { phone } = req.body || {};

  // Validate phone number
  const validation = validatePhone(phone);
  if (!validation.valid) {
    return errorResponse(res, validation.error, 400);
  }

  const formattedPhone = validation.formatted;

  // Rate limiting: max 3 OTP requests per phone per 10 minutes
  if (!checkRateLimit(`otp:${formattedPhone}`, 3, 10 * 60 * 1000)) {
    return errorResponse(res, 'Too many OTP requests. Please try again later.', 429);
  }

  await dbConnect();

  try {
    // Generate and store OTP
    const otpDoc = await OTP.createForPhone(formattedPhone);

    // Send OTP via SMS
    await sendOTP(formattedPhone, otpDoc.otp);

    // Mask phone number for response
    const maskedPhone = formattedPhone.replace(/(\+91)(\d{2})(\d{4})(\d{4})/, '$1$2****$4');

    return successResponse(res, {
      phone: maskedPhone,
      expiresIn: 300, // 5 minutes in seconds
    }, 'OTP sent successfully');

  } catch (error) {
    console.error('Send OTP error:', error);

    if (error.message.includes('credentials not configured')) {
      return errorResponse(res, 'SMS service not configured', 500);
    }

    return errorResponse(res, 'Failed to send OTP. Please try again.', 500);
  }
}

export default withErrorHandling(handler);
