import dbConnect from '../../lib/mongodb.js';
import Product from '../../lib/models/Product.js';
import {
  successResponse,
  errorResponse,
  methodNotAllowedResponse,
  handleCors,
  withErrorHandling,
} from '../../lib/apiUtils.js';

/**
 * GET /api/products
 * List products with optional filtering, sorting, and pagination
 *
 * Query parameters:
 * - category: Filter by category (e.g., "face-care")
 * - concern: Filter by concern (e.g., "acne-prone-skin")
 * - badge: Filter by badge (e.g., "bestseller", "new")
 * - featured: Filter featured products (true/false)
 * - inStock: Filter in-stock products (true/false)
 * - search: Search by name, description, tags
 * - sort: Sort field (e.g., "price", "-price", "name", "-createdAt")
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 12, max: 50)
 * - minPrice: Minimum price filter
 * - maxPrice: Maximum price filter
 */
async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Only allow GET requests
  if (req.method !== 'GET') {
    return methodNotAllowedResponse(res, ['GET']);
  }

  await dbConnect();

  const {
    category,
    concern,
    badge,
    featured,
    inStock,
    search,
    sort = '-createdAt',
    page = '1',
    limit = '12',
    minPrice,
    maxPrice,
  } = req.query;

  // Build query
  const query = { isActive: true };

  if (category) {
    query.category = category.toLowerCase();
  }

  if (concern) {
    query.concerns = concern.toLowerCase();
  }

  if (badge) {
    query.badge = badge.toLowerCase();
  }

  if (featured === 'true') {
    query.featured = true;
  }

  if (inStock === 'true') {
    query.inStock = true;
  } else if (inStock === 'false') {
    query.inStock = false;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  // Handle search
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  // Build sort
  let sortObj = {};
  if (sort.startsWith('-')) {
    sortObj[sort.substring(1)] = -1;
  } else {
    sortObj[sort] = 1;
  }

  // Pagination
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const [products, total] = await Promise.all([
    Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Product.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return successResponse(res, {
    products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    },
  });
}

export default withErrorHandling(handler);
