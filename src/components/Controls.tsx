import React from "react";
import {
  ArrowBigLeft,
  ArrowBigDownDash,
  ArrowBigRight,
  ArrowBigUp,
  RefreshCw,
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
  return (
    <div className="controls-container">
      <button onClick={moveLeft}>
        <ArrowBigLeft size={24} strokeWidth={2} />
      </button>
      <button onClick={rotate}>
        <ArrowBigUp size={24} strokeWidth={2} />
      </button>
      <button className="holdButton" onClick={hold}>
        <RefreshCw size={24} strokeWidth={2} />
      </button>
      <button onClick={drop}>
        <ArrowBigDownDash size={24} strokeWidth={2} />
      </button>
      <button onClick={moveRight}>
        <ArrowBigRight size={24} strokeWidth={2} />
      </button>
    </div>
  );
};

export default Controls;
