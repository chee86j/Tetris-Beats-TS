import Cell from "./Cell";
import { BoardShape, EmptyCell } from "../types";
import { useEffect } from "react";

interface Props {
  currentBoard: BoardShape;
  isDropping: boolean;
  moveShapeDown: () => void;
  dropInterval: number;
  tetrominoCellClassName: string;
}

function Board({
  currentBoard,
  isDropping,
  moveShapeDown,
  dropInterval,
  tetrominoCellClassName,
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
            <Cell
              key={`${rowIndex}-${colIndex}`}
              type={cell}
              className={
                cell !== EmptyCell.Empty
                  ? `${tetrominoCellClassName} committed` // Apply both classes
                  : ""
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
