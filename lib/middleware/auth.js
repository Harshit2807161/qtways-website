import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import dbConnect from '../mongodb.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define JWT_SECRET environment variable');
}

/**
 * Generate JWT token for a user
 */
export function generateToken(userId) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from request (cookie or header)
 */
export function extractToken(req) {
  // Try cookie first
  const cookies = req.headers.cookie;
  if (cookies) {
    const parsed = parse(cookies);
    if (parsed.token) {
      return parsed.token;
    }
  }

  // Try Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

/**
 * Authentication middleware for API routes
 * Returns user object if authenticated, null otherwise
 */
export async function authenticate(req) {
  const token = extractToken(req);

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) {
    return null;
  }

  try {
    await dbConnect();
    const user = await User.findById(decoded.userId).lean();
    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(req) {
  const user = await authenticate(req);

  if (!user) {
    const error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }

  return user;
}

/**
 * Create auth cookie options
 */
export function getAuthCookieOptions(maxAge = 7 * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  };
}

/**
 * Serialize cookie for Set-Cookie header
 */
export function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${value}`];

  if (options.httpOnly) parts.push('HttpOnly');
  if (options.secure) parts.push('Secure');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);

  return parts.join('; ');
}

/**
 * Clear auth cookie (for logout)
 */
export function clearAuthCookie() {
  return serializeCookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
