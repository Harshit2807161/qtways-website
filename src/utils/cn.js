/**
 * Utility function to conditionally join class names
 * Filters out falsy values and joins remaining classes with spaces
 *
 * @param {...(string|boolean|undefined|null)} classes - Class names to join
 * @returns {string} Joined class names
 *
 * @example
 * cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')
 * // Returns: 'btn btn-active' if isActive is true and isDisabled is false
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Utility to merge class names with Tailwind conflict resolution
 * For more complex cases where you need to override Tailwind classes
 *
 * @param {string} base - Base class names
 * @param {string} override - Override class names (takes precedence)
 * @returns {string} Merged class names
 *
 * @example
 * mergeClasses('px-4 py-2 bg-blue-500', 'bg-red-500')
 * // Returns: 'px-4 py-2 bg-red-500'
 */
export function mergeClasses(base, override) {
  if (!override) return base;
  if (!base) return override;

  const baseClasses = base.split(' ');
  const overrideClasses = override.split(' ');

  // Extract Tailwind prefixes (e.g., 'bg', 'text', 'p', 'px', 'py', etc.)
  const getPrefix = (cls) => {
    const match = cls.match(/^([a-z]+)-/);
    return match ? match[1] : cls;
  };

  // Get prefixes from override classes
  const overridePrefixes = new Set(overrideClasses.map(getPrefix));

  // Filter base classes that don't conflict with overrides
  const filteredBase = baseClasses.filter(cls => {
    const prefix = getPrefix(cls);
    return !overridePrefixes.has(prefix);
  });

  return [...filteredBase, ...overrideClasses].join(' ');
}

export default cn;
