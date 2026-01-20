/**
 * API utility functions for Vercel serverless functions (Node.js runtime)
 */

/**
 * Standard JSON response
 */
export function jsonResponse(res, data, status = 200) {
  res.status(status).json(data);
}

/**
 * Success response
 */
export function successResponse(res, data, message = 'Success') {
  jsonResponse(res, {
    success: true,
    message,
    data,
  });
}

/**
 * Error response
 */
export function errorResponse(res, message, status = 400, errors = null) {
  const body = {
    success: false,
    message,
  };

  if (errors) {
    body.errors = errors;
  }

  jsonResponse(res, body, status);
}

/**
 * Not found response
 */
export function notFoundResponse(res, message = 'Resource not found') {
  errorResponse(res, message, 404);
}

/**
 * Unauthorized response
 */
export function unauthorizedResponse(res, message = 'Unauthorized') {
  errorResponse(res, message, 401);
}

/**
 * Method not allowed response
 */
export function methodNotAllowedResponse(res, allowedMethods = ['GET']) {
  res.setHeader('Allow', allowedMethods.join(', '));
  errorResponse(res, `Method not allowed. Allowed: ${allowedMethods.join(', ')}`, 405);
}

/**
 * Validate required fields in body
 */
export function validateRequired(body, fields) {
  const missing = fields.filter(field => !body[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

/**
 * Rate limiting helper (simple in-memory, resets on cold start)
 * For production, use Redis or similar
 */
const rateLimitStore = new Map();

export function checkRateLimit(key, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }

  const requests = rateLimitStore.get(key).filter(time => time > windowStart);
  requests.push(now);
  rateLimitStore.set(key, requests);

  if (requests.length > maxRequests) {
    return false;
  }

  return true;
}

/**
 * Set CORS headers
 */
export function setCorsHeaders(res, origin = '*') {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

/**
 * Handle CORS preflight
 */
export function handleCors(req, res, allowedOrigins = ['*']) {
  const origin = req.headers.origin || '*';
  const isAllowed = allowedOrigins.includes('*') || allowedOrigins.includes(origin);

  setCorsHeaders(res, isAllowed ? origin : allowedOrigins[0]);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }

  return false;
}

/**
 * Wrapper for API handlers with error handling
 */
export function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);

      if (error.name === 'ValidationError') {
        return errorResponse(res, 'Validation failed', 400, error.errors);
      }

      if (error.status) {
        return errorResponse(res, error.message, error.status);
      }

      return errorResponse(res, 'Internal server error', 500);
    }
  };
}
