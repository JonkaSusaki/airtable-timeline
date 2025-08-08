import { TimelineItem } from "../types/Timeline";

/**
 * Returns the min and max date of the given items.
 * @param {TimelineItem[]} items
 * @returns {{ minDate: Date, maxDate: Date }}
 */
export default function getMinMaxDates(items: TimelineItem[]) {
  const minDate = new Date(items[0].start);
  const maxDate = new Date(items[items.length - 1].end);
  maxDate.setDate(maxDate.getDate() + 1);
  return { minDate, maxDate };
}
