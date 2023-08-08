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
        <ArrowBigLeft />
      </button>
      <button onClick={rotate}>
        <ArrowBigUp />
      </button>
      <button className="holdButton" onClick={hold}>
        <RefreshCw />
      </button>
      <button onClick={drop}>
        <ArrowBigDownDash />
      </button>
      <button onClick={moveRight}>
        <ArrowBigRight />
      </button>
    </div>
  );
};

export default Controls;
