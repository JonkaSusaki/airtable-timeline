import { useMemo } from "react";
import getDatesArray from "../../utils/getDatesArray";
import "./styles.css";
import { TimelineMode } from "../../enums/TimelineMode";

type Props = {
  scale: number;
  minDate: Date;
  maxDate: Date;
};

export default function Header({ maxDate, minDate, scale }: Props) {
  const thresholdMonth = 100;

  const timelineMode: TimelineMode = useMemo(
    () => (scale > thresholdMonth ? TimelineMode.DAY : TimelineMode.MONTH),
    [scale]
  );

  const timelineHeaderItems = useMemo(() => {
    switch (timelineMode) {
      case TimelineMode.DAY:
        return renderDays(minDate, maxDate, scale);

      case TimelineMode.MONTH:
        return renderMonths(minDate, maxDate, scale);
    }
  }, [minDate, maxDate, scale, timelineMode]);

  return <div className="timelineHeader">{timelineHeaderItems}</div>;
}

function renderDays(minDate: Date, maxDate: Date, scale: number) {
  return getDatesArray(minDate, maxDate).map((date, i) => (
    <div
      key={date.getTime()}
      className="timelineHeaderItem"
      style={{ minWidth: `${scale}px` }}
    >
      <strong>
        {date.toLocaleDateString("en-GB", {
          day: "2-digit",
        })}
      </strong>
      <span>{date.toLocaleDateString("en-GB", { month: "short" })}</span>
    </div>
  ));
}

function renderMonths(minDate: Date, maxDate: Date, scale: number) {
  let current = new Date(minDate);
  let items: any[] = [];
  while (current <= maxDate) {
    const year = current.getFullYear();
    const month = current.getMonth();

    // Get month start and end dates
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0); // last day of month

    // Clamp to visible range
    const visibleStart =
      current.getMonth() === minDate.getMonth() ? minDate : monthStart;

    const visibleEnd =
      maxDate.getMonth() === current.getMonth() ? maxDate : monthEnd;

    // Calculate how many visible days in this month
    const visibleDays =
      (visibleEnd.getTime() - visibleStart.getTime()) / (1000 * 60 * 60 * 24) +
      1;

    items.push(
      <div
        key={current.getTime()}
        className="timelineHeaderItem"
        style={{ minWidth: `${scale * Math.ceil(visibleDays)}px` }}
      >
        <strong>
          {current.toLocaleDateString("en-GB", { month: "short" })}
        </strong>
      </div>
    );
    current.setMonth(current.getMonth() + 1);
  }

  return items;
}
