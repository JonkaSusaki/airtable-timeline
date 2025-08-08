import { createContext, useState } from "react";
import timelineItems from "../timelineItems";
import { TimelineItem } from "../types/Timeline";

export const TimelineContext = createContext({});

export default function TimelineContextProvider({ children }) {
  const [items, setItems] = useState(timelineItems);

  function handleChangeItem(item: TimelineItem) {
    const newItems = items.map((i) => {
      if (i.id !== item.id) {
        return i;
      }

      return {
        id: item.id,
        end: item.end,
        start: item.start,
        name: item.name,
      };
    });

    setItems(newItems);
  }

  return (
    <TimelineContext.Provider value={{ items, handleChangeItem }}>
      {children}
    </TimelineContext.Provider>
  );
}
