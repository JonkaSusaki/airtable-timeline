import { useContext, useState } from "react";
import { TimelineItem } from "../../types/Timeline";
import store from "../../timelineItems";
import { TimelineContext } from "../../context/TimelineProvider";

type Props = {
  item: TimelineItem;
  close: () => void;
};
export default function Modal({ item, close }: Props) {
  const { handleChangeItem } = useContext(TimelineContext);

  const [name, setName] = useState(item.name);
  const [start, setStart] = useState(item.start);
  const [end, setEnd] = useState(item.end);

  function save() {
    handleChangeItem({
      id: item.id,
      name,
      start,
      end,
    });
    close();
  }

  return (
    <div className="modal">
      <div className="modal-content" role="dialog">
        <button
          className="close-button"
          aria-label="Close modal"
          onClick={close}
        >
          &times;
        </button>
        <div className="modal-header">Item</div>
        <div className="modal-body">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
          <input
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
        </div>
        <div className="modal-footer">
          <button onClick={save}>Save</button>
          <button className="danger" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
