import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import Timeline from "./components/Timeline";
import TimelineContextProvider from "./context/TimelineProvider"

function App() {
  return (
    <div>
      <h2>Good luck with your assignment! {"\u2728"}</h2>
      <h3>{timelineItems.length} timeline items to render</h3>

      <div style={{ padding: '5% 0 0 5%' }}>
        <p>
          <code>SHIFT</code> + <code>SCROLL</code> to navigate the timeline
          <br />
          <code>CTRL</code> + <code>SCROLL</code> to zoom the timeline
        </p>
      </div>

      <TimelineContextProvider>
        <Timeline />
      </TimelineContextProvider>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);