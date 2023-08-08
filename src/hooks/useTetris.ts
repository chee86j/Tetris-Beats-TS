import { useCallback, useEffect, useState } from "react";
import {
  Block,
  BlockShape,
  BoardShape,
  EmptyCell,
  SHAPES,
  GhostBlock,
} from "../types";
import { useInterval } from "./useInterval";
import {
  useTetrisBoard,
  hasCollisions,
  BOARD_HEIGHT,
  getEmptyBoard,
  getRandomBlock,
} from "./useTetrisBoard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum TickSpeed {
  Normal = 800,
  Sliding = 100,
  Fast = 50,
  Instantly = 0.0001,
}

function generateNextBlocks(numBlocks: number): Block[] {
  const blocks: Block[] = [];
  for (let i = 0; i < numBlocks; i++) {
    const block = getRandomBlock();
    blocks.push(block);
  }
  return blocks;
}

export function useTetris() {
  const [score, setScore] = useState(0);
  const [upcomingBlocks, setUpcomingBlocks] = useState<Block[]>([]);
  const [isCommitting, setIsCommitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tickSpeed, setTickSpeed] = useState<TickSpeed | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDropping, setIsDropping] = useState(true);
  const [heldBlock, setHeldBlock] = useState<Block | null>(null);
  const [level, setLevel] = useState(1);

  const [
    { board, droppingRow, droppingColumn, droppingBlock, droppingShape },
    dispatchBoardState,
  ] = useTetrisBoard();

  const swapWithHold = useCallback(() => {
    if (!isPlaying) return;

    const newHeldBlock = droppingBlock;
    dispatchBoardState({
      type: "swap",
      block: heldBlock === null ? undefined : heldBlock,
    });
    setHeldBlock(newHeldBlock);
  }, [dispatchBoardState, isPlaying, droppingBlock, heldBlock]);

  const startGame = useCallback(() => {
    const startingBlocks = generateNextBlocks(6);
    setScore(0);
    setUpcomingBlocks(startingBlocks);
    setIsCommitting(false);
    setIsPlaying(true);
    setTickSpeed(TickSpeed.Normal);
    setGameOver(false);
    setLevel(1);
    dispatchBoardState({ type: "start" });
    setHeldBlock(null);
  }, [dispatchBoardState]);

  const getGhostPosition = (
    shape: BlockShape,
    row: number,
    col: number
  ): { ghostRow: number; ghostCol: number } => {
    let ghostRow = row;
    while (!hasCollisions(board, shape, ghostRow + 1, col)) {
      ghostRow++;
    }
    return { ghostRow, ghostCol: col };
  };

  const pauseGame = useCallback(() => {
    setIsPaused(true);
    setTickSpeed(null);
    setIsDropping(false);
  }, []);

  const resumeGame = useCallback(() => {
    setIsPaused(false);
    setTickSpeed(TickSpeed.Normal);
    setIsDropping(true);
  }, []);

  const calculateScore = useCallback(
    (linesCleared: number): { points: number; linesCleared: number } => {
      if (linesCleared === 0) {
        return { points: 0, linesCleared: 0 };
      }
      // BPS points for 1, 2, 3, and 4 lines cleared
      const basePoints = [40, 100, 300, 1200];
      // Calculate the points for the given number of lines cleared and level
      const points = basePoints[linesCleared - 1] * (level + 1);

      return { points, linesCleared };
    },
    [level]
  );

  const notifyScore = (points: number, linesCleared: number) => {
    toast.success(`Cleared ${linesCleared} lines! Scored ${points} points!`);
  };

  const commitPosition = useCallback(() => {
    if (!hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)) {
      setIsCommitting(false);
      setTickSpeed(TickSpeed.Normal);
      return;
    }

    const newBoard = structuredClone(board) as BoardShape;
    addShapeToBoard(
      newBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );

    let numCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((entry) => entry !== EmptyCell.Empty)) {
        numCleared++;
        newBoard.splice(row, 1);
      }
    }

    const newUpcomingBlocks = structuredClone(upcomingBlocks) as Block[];
    const newBlock = newUpcomingBlocks.pop() as Block;
    newUpcomingBlocks.unshift(getRandomBlock());

    if (hasCollisions(board, SHAPES[newBlock].shape, 0, 3)) {
      setIsPlaying(false);
      setTickSpeed(null);
      setGameOver(true);
    } else {
      setTickSpeed(TickSpeed.Normal);
    }
    setUpcomingBlocks(newUpcomingBlocks);

    const { points, linesCleared } = calculateScore(numCleared);

    if (points > 0) {
      notifyScore(points, linesCleared);
    }

    // Update the score here by adding the points earned from clearing lines
    setScore((prevScore) => prevScore + points);

    dispatchBoardState({
      type: "commit",
      newBoard: [...getEmptyBoard(BOARD_HEIGHT - newBoard.length), ...newBoard],
      newBlock,
    });
    setIsCommitting(false);
  }, [
    board,
    dispatchBoardState,
    droppingBlock,
    droppingColumn,
    droppingRow,
    droppingShape,
    upcomingBlocks,
    calculateScore,
  ]);

  const hardDrop = useCallback(() => {
    let finalRow = droppingRow;
    while (!hasCollisions(board, droppingShape, finalRow + 1, droppingColumn)) {
      finalRow++;
    }
    const newBoard = structuredClone(board) as BoardShape;
    addShapeToBoard(
      newBoard,
      droppingBlock,
      droppingShape,
      finalRow,
      droppingColumn
    );

    let numCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((entry) => entry !== EmptyCell.Empty)) {
        numCleared++;
        newBoard.splice(row, 1);
      }
    }

    const newUpcomingBlocks = structuredClone(upcomingBlocks) as Block[];
    const newBlock = newUpcomingBlocks.pop() as Block;
    newUpcomingBlocks.unshift(getRandomBlock());

    if (hasCollisions(board, SHAPES[newBlock].shape, 0, 3)) {
      setIsPlaying(false);
      setTickSpeed(null);
      setGameOver(true);
    } else {
      setTickSpeed(TickSpeed.Normal);
    }
    setUpcomingBlocks(newUpcomingBlocks);

    const { points, linesCleared } = calculateScore(numCleared);

    if (points > 0) {
      notifyScore(points, linesCleared);
    }

    // Update the score here by adding the points earned from clearing lines
    setScore((prevScore) => prevScore + points);

    dispatchBoardState({
      type: "commit",
      newBoard: [...getEmptyBoard(BOARD_HEIGHT - newBoard.length), ...newBoard],
      newBlock,
    });
    setIsCommitting(false);
  }, [
    board,
    dispatchBoardState,
    droppingBlock,
    droppingColumn,
    droppingRow,
    droppingShape,
    upcomingBlocks,
    calculateScore,
  ]);

  const gameTick = useCallback(() => {
    if (isCommitting) {
      commitPosition();
    } else if (
      hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)
    ) {
      setTickSpeed(TickSpeed.Sliding);
      setIsCommitting(true);
    } else {
      dispatchBoardState({ type: "drop" });
    }
  }, [
    board,
    commitPosition,
    dispatchBoardState,
    droppingColumn,
    droppingRow,
    droppingShape,
    isCommitting,
  ]);

  useInterval(() => {
    if (!isPlaying) {
      return;
    }
    gameTick();
  }, tickSpeed);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let isPressingLeft = false;
    let isPressingRight = false;
    let moveIntervalID: number | undefined;

    const updateMovementInterval = () => {
      clearInterval(moveIntervalID);
      dispatchBoardState({
        type: "move",
        isPressingLeft,
        isPressingRight,
      });
      moveIntervalID = window.setInterval(() => {
        dispatchBoardState({
          type: "move",
          isPressingLeft,
          isPressingRight,
        });
      }, 300) as unknown as number;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.key === "ArrowDown") {
        setTickSpeed(TickSpeed.Fast);
      }

      if (event.key === "ArrowUp") {
        dispatchBoardState({
          type: "move",
          isRotating: true,
        });
      }

      if (event.key === "ArrowLeft") {
        isPressingLeft = true;
        updateMovementInterval();
      }

      if (event.key === "ArrowRight") {
        isPressingRight = true;
        updateMovementInterval();
      }

      if (event.code === "Space") {
        hardDrop();
        return;
      }

      if (event.key === "c") {
        swapWithHold();
        return;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.code === "Space") {
        setTickSpeed(TickSpeed.Normal);
      }

      if (event.key === "ArrowLeft") {
        isPressingLeft = false;
        updateMovementInterval();
      }

      if (event.key === "ArrowRight") {
        isPressingRight = false;
        updateMovementInterval();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      clearInterval(moveIntervalID);
      setTickSpeed(TickSpeed.Normal);
    };
  }, [dispatchBoardState, isPlaying, hardDrop, swapWithHold]);

  const renderedBoard = structuredClone(board) as BoardShape;
  if (isPlaying) {
    const { ghostRow, ghostCol } = getGhostPosition(
      droppingShape,
      droppingRow,
      droppingColumn
    );

    addShapeToBoard(
      renderedBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );

    addShapeToBoard(
      renderedBoard,
      GhostBlock,
      droppingShape,
      ghostRow,
      ghostCol,
      true
    );
  }

  return {
    board: renderedBoard,
    startGame,
    isPlaying,
    score,
    upcomingBlocks,
    gameOver,
    isDropping,
    pauseGame,
    resumeGame,
    isPaused,
    heldBlock,
    swapWithHold,
    dispatchBoardState,
    hardDrop,
  };
}

function addShapeToBoard(
  board: BoardShape,
  droppingBlock: Block | typeof GhostBlock,
  droppingShape: BlockShape,
  droppingRow: number,
  droppingColumn: number,
  isGhost?: boolean
) {
  droppingShape
    .filter((row) => row.some((isSet) => isSet))
    .forEach((row: boolean[], rowIndex: number) => {
      row.forEach((isSet: boolean, colIndex: number) => {
        if (isSet) {
          board[droppingRow + rowIndex][droppingColumn + colIndex] = isGhost
            ? GhostBlock
            : droppingBlock;
        }
      });
    });
}
