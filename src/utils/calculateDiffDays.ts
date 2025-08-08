/**
 *
 * Calculates the number of days between two dates
 *
 */
export default function calculateDiffDays(
  minDate: Date,
  maxDate: Date
): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.ceil(Math.abs(maxDate.getTime() - minDate.getTime()) / oneDay);
}
