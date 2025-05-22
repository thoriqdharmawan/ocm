/**
 * Merges multiple class names conditionally, similar to tw-merge functionality
 *
 * @param {...any} classes - Any number of class arguments
 * @returns {string} - Combined class string
 *
 * @example
 * // Basic usage
 * cn('btn', 'btn-primary') // => 'btn btn-primary'
 *
 * // With conditions
 * cn('btn', isActive && 'btn-active') // => 'btn btn-active' if isActive is true
 *
 * // With object syntax
 * cn('btn', { 'btn-active': isActive, 'btn-disabled': isDisabled })
 *
 * // With arrays
 * cn('btn', ['btn-lg', isRounded && 'rounded'])
 */
export function cn(...classes: any[]): string {
  const result: string[] = [];

  // Helper function to process each item
  const processItem = (item: any) => {
    if (!item) return;

    if (typeof item === "string") {
      result.push(item);
    } else if (Array.isArray(item)) {
      item.forEach(processItem);
    } else if (typeof item === "object") {
      Object.entries(item).forEach(([key, value]) => {
        if (value) result.push(key);
      });
    }
  };

  classes.forEach(processItem);
  return result.join(" ");
}
