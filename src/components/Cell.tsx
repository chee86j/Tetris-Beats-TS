import { CellOptions } from "../types";

interface Props {
  type: CellOptions;
  className?: string;
}

function Cell({ type, className }: Props) {
  return <div className={`cell ${type} ${className}`} />;
}

export default Cell;
