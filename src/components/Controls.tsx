import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  ArrowBigLeft,
  ArrowBigDownDash,
  ArrowBigRight,
  ArrowBigUp,
  RefreshCw,
  Lock,
  Unlock,
} from "lucide-react";

interface ControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  drop: () => void;
  hold: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  moveLeft,
  moveRight,
  rotate,
  drop,
  hold,
}) => {
  const [isDraggable, setIsDraggable] = useState(false);

  return (
    <Draggable disabled={!isDraggable}>
      <div className="controls-container">
        {/* Directional Controls */}
        <div className="directional-controls">
          <button onClick={moveLeft}>
            <ArrowBigLeft size={18} strokeWidth={2} />
          </button>
          <button onClick={rotate}>
            <ArrowBigUp size={18} strokeWidth={2} />
          </button>

          <button onClick={moveRight}>
            <ArrowBigRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* A and B Buttons */}
        <div className="ab-controls">
          <button className="holdButton" onClick={hold}>
            <RefreshCw size={18} strokeWidth={2} /> {/* A Button */}
          </button>
          <button onClick={drop}>
            <ArrowBigDownDash size={18} strokeWidth={2} />
          </button>
          {/* Lock and Unlock Controls */}
          <div className="lock-controls">
            <button onClick={() => setIsDraggable(!isDraggable)}>
              {isDraggable ? <Unlock size={18} /> : <Lock size={16} />}
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Controls;
