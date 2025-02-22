export const abbreviateNumberToString = (number: number): string => {
  const units = ["", "K", "M", "B", "T"];
  let unitIndex = 0;
  let value = number;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  return value.toFixed(2) + units[unitIndex];
};

export const convertDecimal = (value: number, decimal: number) => {
  return Number(value) / Math.pow(10, decimal);
};

export const convertDecimalObject = (object: any, keys: string[], decimals: number) => {
  keys.forEach((key) => {
    object[key] = convertDecimal(object[key], decimals);
  });
  return object;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
