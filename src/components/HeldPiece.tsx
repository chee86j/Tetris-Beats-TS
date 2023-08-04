import { Block, SHAPES } from "../types";

type Props = {
  block: Block | null; // Allow for null val when no piece is held
};

export default function HeldPiece({ block }: Props) {
  if (block === null) return <div className="held-piece"></div>;

  const shape = SHAPES[block].shape;

  return (
    <div className="held-piece">
      {shape.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((isSet, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${isSet ? "set" : ""}`}
              style={{
                backgroundColor: isSet ? "black" : "transparent",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
