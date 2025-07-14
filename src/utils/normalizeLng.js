export function normalizeLng(lng) {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}
