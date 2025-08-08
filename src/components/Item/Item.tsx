import { TimelineItem } from "../../types/Timeline";
import calculateDiffDays from "../../utils/calculateDiffDays";

import "./style.css";

type Props = {
  item: TimelineItem;
  cellWidth: number;
  minDate: Date;
  laneIndex: number;
};

export default function Item({
  item,
  cellWidth,
  minDate,
  laneIndex,
}: Props) {
  const duration = calculateDiffDays(new Date(item.start), new Date(item.end));

  const offset = calculateDiffDays(minDate, new Date(item.start));
  const colors = ["#6c5ce7", "#0984e3", "#00b894"];

  const laneColor = colors[laneIndex % colors.length];

  return (
    <div
      className="timelineItem item"
      style={{
        width: `${(duration + 1) * cellWidth}px`,
        left: `${(offset + 1) * cellWidth}px`,
        backgroundColor: laneColor,
      }}
    >
      <span>{item.name}</span>
    </div>
  );
}
