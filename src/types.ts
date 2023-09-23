export enum Block {
  I = "I",
  J = "J",
  L = "L",
  O = "O",
  S = "S",
  T = "T",
  Z = "Z",
}

export enum EmptyCell {
  Empty = "Empty",
}

export const GhostBlock = "Ghost";

export type CellOptions = Block | EmptyCell | typeof GhostBlock;

export type BoardShape = CellOptions[][];

export type BlockShape = boolean[][];

type ShapesObj = {
  [key in Block]: {
    shape: BlockShape;
  };
};

export const SHAPES: ShapesObj = {
  I: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
    ],
  },
  J: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [true, false, false, false],
      [true, true, true, false],
    ],
  },
  L: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, true, false],
      [true, true, true, false],
    ],
  },
  O: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, false, false],
      [true, true, false, false],
    ],
  },
  S: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [false, true, true, false],
      [true, true, false, false],
    ],
  },
  T: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [false, true, false, false],
      [true, true, true, false],
    ],
  },
  Z: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, false, false],
      [false, true, true, false],
    ],
  },
};
