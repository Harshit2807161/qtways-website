/**
 * SMS Gateway Service
 * Supports MSG91 (recommended for India) and Twilio (international)
 */

const SMS_PROVIDER = process.env.SMS_PROVIDER || 'msg91'; // 'msg91' or 'twilio'

/**
 * Send OTP via MSG91
 * @param {string} phone - Phone number with country code (+91XXXXXXXXXX)
 * @param {string} otp - 6-digit OTP
 */
async function sendViaMSG91(phone, otp) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const senderId = process.env.MSG91_SENDER_ID || 'QTWAYS';

  if (!authKey || !templateId) {
    throw new Error('MSG91 credentials not configured');
  }

  // Remove +91 prefix for MSG91
  const mobileNumber = phone.replace(/^\+91/, '');

  const response = await fetch('https://control.msg91.com/api/v5/otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authkey': authKey,
    },
    body: JSON.stringify({
      template_id: templateId,
      mobile: mobileNumber,
      sender: senderId,
      otp: otp,
      otp_length: 6,
      otp_expiry: 5, // 5 minutes
    }),
  });

  const data = await response.json();

  if (data.type !== 'success') {
    console.error('MSG91 Error:', data);
    throw new Error(data.message || 'Failed to send OTP');
  }

  return { success: true, provider: 'msg91' };
}

/**
 * Send OTP via Twilio
 * @param {string} phone - Phone number with country code (+91XXXXXXXXXX)
 * @param {string} otp - 6-digit OTP
 */
async function sendViaTwilio(phone, otp) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error('Twilio credentials not configured');
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: new URLSearchParams({
      To: phone,
      From: fromNumber,
      Body: `Your QTWAYS verification code is: ${otp}. Valid for 5 minutes. Do not share this code with anyone.`,
    }),
  });

  const data = await response.json();

  if (data.error_code) {
    console.error('Twilio Error:', data);
    throw new Error(data.message || 'Failed to send OTP');
  }

  return { success: true, provider: 'twilio', sid: data.sid };
}

/**
 * Mock SMS sender for development
 * @param {string} phone - Phone number
 * @param {string} otp - 6-digit OTP
 */
async function sendViaMock(phone, otp) {
  console.log('========================================');
  console.log('📱 MOCK SMS SERVICE');
  console.log(`📞 To: ${phone}`);
  console.log(`🔐 OTP: ${otp}`);
  console.log('========================================');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true, provider: 'mock', otp };
}

/**
 * Send OTP to phone number
 * @param {string} phone - Phone number with country code (+91XXXXXXXXXX)
 * @param {string} otp - 6-digit OTP
 * @returns {Promise<{success: boolean, provider: string}>}
 */
export async function sendOTP(phone, otp) {
  // Use mock in development if no provider is configured
  const isDev = process.env.NODE_ENV === 'development';
  const hasCredentials = process.env.MSG91_AUTH_KEY || process.env.TWILIO_ACCOUNT_SID;

  if (isDev && !hasCredentials) {
    return sendViaMock(phone, otp);
  }

  switch (SMS_PROVIDER) {
    case 'msg91':
      return sendViaMSG91(phone, otp);
    case 'twilio':
      return sendViaTwilio(phone, otp);
    default:
      return sendViaMock(phone, otp);
  }
}

/**
 * Validate Indian phone number
 * @param {string} phone - Phone number to validate
 * @returns {{valid: boolean, formatted: string|null, error: string|null}}
 */
export function validatePhone(phone) {
  if (!phone) {
    return { valid: false, formatted: null, error: 'Phone number is required' };
  }

  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // Handle various input formats
  if (cleaned.startsWith('+91')) {
    // Already has country code
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = '+' + cleaned;
  } else if (cleaned.length === 10) {
    cleaned = '+91' + cleaned;
  } else {
    return { valid: false, formatted: null, error: 'Please enter a valid 10-digit phone number' };
  }

  // Validate final format: +91 followed by 10 digits
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  if (!phoneRegex.test(cleaned)) {
    return { valid: false, formatted: null, error: 'Please enter a valid Indian mobile number' };
  }

  return { valid: true, formatted: cleaned, error: null };
}

/**
 * Format phone number for display
 * @param {string} phone - Phone number (+91XXXXXXXXXX)
 * @returns {string} Formatted phone (e.g., +91 98765 43210)
 */
export function formatPhoneForDisplay(phone) {
  if (!phone) return '';

  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.length === 13 && cleaned.startsWith('+91')) {
    const number = cleaned.slice(3);
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
  }

  return phone;
}

export default { sendOTP, validatePhone, formatPhoneForDisplay };
