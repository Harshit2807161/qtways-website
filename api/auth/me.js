import { authenticate } from '../../lib/middleware/auth.js';
import {
  successResponse,
  unauthorizedResponse,
  methodNotAllowedResponse,
  handleCors,
  withErrorHandling,
} from '../../lib/apiUtils.js';

/**
 * GET /api/auth/me
 * Get current authenticated user
 *
 * Requires: Authentication (JWT cookie)
 *
 * Response:
 * - success: boolean
 * - data: { user: User } or null if not authenticated
 */
async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Only allow GET requests
  if (req.method !== 'GET') {
    return methodNotAllowedResponse(res, ['GET']);
  }

  // Authenticate user
  const user = await authenticate(req);

  if (!user) {
    return unauthorizedResponse(res, 'Not authenticated');
  }

  // Return user data (excluding sensitive fields)
  const userData = {
    _id: user._id,
    phone: user.phone,
    name: user.name,
    email: user.email,
    addresses: user.addresses,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };

  return successResponse(res, { user: userData });
}

export default withErrorHandling(handler);
