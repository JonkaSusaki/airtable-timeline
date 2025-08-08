import { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import { TimelineItem } from "../../types/Timeline";
import getMinMaxDates from "../../utils/getMinMaxDates";
import Lane from "../Lane";
import Header from "../Header";
import { assignLanes } from "../../assignLanes.js";
import calculateDiffDays from "../../utils/calculateDiffDays.js";

type Props = {
  items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
  const MIN_SCALE = 30;
  const MAX_SCALE = 600;

  const [scale, setScale] = useState(200);
  const containerRef = useRef(null);

  const { minDate, maxDate } = useMemo(() => {
    return getMinMaxDates(items);
  }, [items]);

  const diffDays = useMemo(() => {
    return calculateDiffDays(minDate, maxDate);
  }, [minDate, maxDate]);

  const lanes = useMemo(() => {
    return assignLanes(items) as TimelineItem[][];
  }, [items]);


  const handleWheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const zoomStep = 10;
    const delta = e.deltaY;
    setScale((prev) =>
      Math.max(
        MIN_SCALE,
        Math.min(prev + (delta < 0 ? zoomStep : -zoomStep), MAX_SCALE)
      )
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="timelineContainer" ref={containerRef}>
      <Header maxDate={maxDate} minDate={minDate} scale={scale} />

      <div className="timelineBody">
        {lanes.map((lane, i) => (
          <Lane
            key={`lane-${i}`}
            sizeOfTimeline={diffDays}
            laneIndex={i}
            cellWidth={scale}
            lane={lane}
            minDate={minDate}
          />
        ))}
      </div>
    </div>
  );
}
