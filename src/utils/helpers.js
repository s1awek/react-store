/** @format */

export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === 'colors') {
    unique = unique.flat();
  }
  return ['all', ...new Set(unique)];
};

export const convertHex = (hex) => {
  if (hex.length > 4) return hex;
  const justNumber = hex.slice(1);
  return `#${justNumber}${justNumber}`;
};
