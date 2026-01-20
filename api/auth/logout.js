import { clearAuthCookie } from '../../lib/middleware/auth.js';
import {
  successResponse,
  methodNotAllowedResponse,
  handleCors,
  withErrorHandling,
} from '../../lib/apiUtils.js';

/**
 * POST /api/auth/logout
 * Logout user by clearing auth cookie
 *
 * Response:
 * - success: boolean
 * - message: string
 */
async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Only allow POST requests
  if (req.method !== 'POST') {
    return methodNotAllowedResponse(res, ['POST']);
  }

  // Clear auth cookie
  const cookie = clearAuthCookie();
  res.setHeader('Set-Cookie', cookie);

  return successResponse(res, null, 'Logged out successfully');
}

export default withErrorHandling(handler);
