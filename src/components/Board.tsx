import Cell from "./Cell";
import { BoardShape } from "../types";
import { useEffect } from "react";

interface Props {
  currentBoard: BoardShape;
  isDropping: boolean;
  moveShapeDown: () => void;
  dropInterval: number;
}

function Board({
  currentBoard,
  isDropping,
  moveShapeDown,
  dropInterval,
}: Props) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDropping) {
        moveShapeDown();
      }
    }, dropInterval);

    return () => {
      clearInterval(interval);
    };
  }, [isDropping, moveShapeDown, dropInterval]);

  return (
    <div className="board">
      {currentBoard.map((row, rowIndex) => (
        <div className="row" key={`${rowIndex}`}>
          {row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
