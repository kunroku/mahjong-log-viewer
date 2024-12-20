export const nearlyEqual = (a: number, b: number) =>
  Math.round(a * 1e5) === Math.round(b * 1e5);
