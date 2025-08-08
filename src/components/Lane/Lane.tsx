import { useMemo } from "react";
import { TimelineItem } from "../../types/Timeline";
import Item from "../Item";
import "./style.css";

type Props = {
  lane: TimelineItem[];
  cellWidth: number;
  minDate: Date;
  laneIndex: number;
  sizeOfTimeline: number;
};

export default function Lane({
  lane,
  cellWidth,
  minDate,
  laneIndex,
  sizeOfTimeline,
}: Props) {
  const verticalLines = useMemo(
    () =>
      Array.from({ length: sizeOfTimeline }, (_, i) => (
        <div
          key={`v-${i}`}
          style={{ minWidth: `${cellWidth}px` }}
          className="timelineItem timelineGridVertical"
        />
      )),
    [sizeOfTimeline, cellWidth]
  );


  return (
    <div className="timelineLane">
      <div className="timelineGrid">{verticalLines}</div>

      {lane.map((item, index) => {
        return (
          <Item
            key={item.id}
            item={item}
            cellWidth={cellWidth}
            itemIndex={index}
            minDate={minDate}
            laneIndex={laneIndex}
          />
        );
      })}
    </div>
  );
}
