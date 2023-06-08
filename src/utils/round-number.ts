export const roundNumber = (number: number, decimalPlaces = 0) => {
  const decimal = 10 ** decimalPlaces;
  return Math.round(number * decimal) / decimal;
};
