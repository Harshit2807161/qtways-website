/**
 * Format a number as Indian Rupee currency
 *
 * @param {number} price - The price to format
 * @param {Object} options - Formatting options
 * @param {boolean} options.showSymbol - Whether to show ₹ symbol (default: true)
 * @param {boolean} options.showDecimals - Whether to show decimal places (default: false)
 * @param {string} options.locale - Locale for formatting (default: 'en-IN')
 * @returns {string} Formatted price string
 *
 * @example
 * formatPrice(1299)           // '₹1,299'
 * formatPrice(1299.50, { showDecimals: true })  // '₹1,299.50'
 * formatPrice(1299, { showSymbol: false })      // '1,299'
 */
export function formatPrice(price, options = {}) {
  const {
    showSymbol = true,
    showDecimals = false,
    locale = 'en-IN'
  } = options;

  if (typeof price !== 'number' || isNaN(price)) {
    return showSymbol ? '₹0' : '0';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return formatter.format(price);
}

/**
 * Calculate discount percentage between original and sale price
 *
 * @param {number} originalPrice - The original price
 * @param {number} salePrice - The discounted price
 * @returns {number} Discount percentage (rounded)
 *
 * @example
 * calculateDiscount(1000, 750)  // 25
 */
export function calculateDiscount(originalPrice, salePrice) {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Format price range for products with variants
 *
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {string} Formatted price range
 *
 * @example
 * formatPriceRange(999, 1499)  // '₹999 - ₹1,499'
 * formatPriceRange(999, 999)   // '₹999'
 */
export function formatPriceRange(minPrice, maxPrice) {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice);
  }
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
}

/**
 * Format price with original price strikethrough for sales
 *
 * @param {number} currentPrice - Current/sale price
 * @param {number} originalPrice - Original price (optional)
 * @returns {Object} Object with formatted prices and discount
 *
 * @example
 * getPriceDisplay(750, 1000)
 * // { current: '₹750', original: '₹1,000', discount: 25, hasSale: true }
 */
export function getPriceDisplay(currentPrice, originalPrice = null) {
  const current = formatPrice(currentPrice);

  if (!originalPrice || originalPrice <= currentPrice) {
    return {
      current,
      original: null,
      discount: 0,
      hasSale: false
    };
  }

  return {
    current,
    original: formatPrice(originalPrice),
    discount: calculateDiscount(originalPrice, currentPrice),
    hasSale: true
  };
}

export default formatPrice;
