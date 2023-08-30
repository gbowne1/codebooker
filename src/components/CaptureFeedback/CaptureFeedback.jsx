import React from "react";
import "./CaptureFeedback.css"

export const CaptureFeedback = () => {

  const [panelActive, setPanelActive] = useState(false);

  const togglePanel = () => {
    setPanelActive((prev) => !prev);
  };

  return (
    <div className={`feedback-panel ${panelActive ? 'active' : ''}`}>
      <button className="close-button" onClick={togglePanel}>
        X
      </button>
      <p>TEST TEXT HERE</p>
    </div>
  )
}