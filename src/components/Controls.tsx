import React from "react";

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
      <button onClick={moveLeft}>Left</button>
      <button onClick={rotate}>Rotate</button>
      <button onClick={hold}>Hold</button>
      <button onClick={drop}>Drop</button>
      <button onClick={moveRight}>Right</button>
    </div>
  );
};

export default Controls;
