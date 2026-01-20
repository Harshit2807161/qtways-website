import dbConnect from '../../lib/mongodb.js';
import Product from '../../lib/models/Product.js';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  methodNotAllowedResponse,
  handleCors,
  withErrorHandling,
} from '../../lib/apiUtils.js';

/**
 * GET /api/products/:slug
 * Get a single product by slug
 *
 * Also returns related products (same category, excluding current)
 */
async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Only allow GET requests
  if (req.method !== 'GET') {
    return methodNotAllowedResponse(res, ['GET']);
  }

  const { slug } = req.query;

  if (!slug) {
    return errorResponse(res, 'Product slug is required', 400);
  }

  await dbConnect();

  // Find product by slug
  const product = await Product.findOne({
    slug: slug.toLowerCase(),
    isActive: true,
  }).lean();

  if (!product) {
    return notFoundResponse(res, 'Product not found');
  }

  // Get related products (same category, max 4)
  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true,
  })
    .limit(4)
    .lean();

  return successResponse(res, {
    product,
    relatedProducts,
  });
}

export default withErrorHandling(handler);
