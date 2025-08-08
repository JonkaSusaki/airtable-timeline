import { useMemo } from "react";

type Props = {
  sizeOfTimeline: number;
  cellWidth: number;
};
export default function Grid({ cellWidth, sizeOfTimeline }: Props) {
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
    <>
      <div className="timelineGrid">{verticalLines}</div>
    </>
  );
}
