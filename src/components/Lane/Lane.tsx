import { useMemo } from "react";
import { TimelineItem } from "../../types/Timeline";
import Item from "../Item";
import "./style.css";
import Grid from "./Grid";

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

  return (
    <div className="timelineLane">
      <Grid cellWidth={cellWidth} sizeOfTimeline={sizeOfTimeline} />

      {lane.map((item, index) => {
        return (
          <Item
            key={item.id}
            item={item}
            cellWidth={cellWidth}
            minDate={minDate}
            laneIndex={laneIndex}
          />
        );
      })}
    </div>
  );
}
