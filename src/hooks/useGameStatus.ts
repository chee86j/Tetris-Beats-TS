import { useState, useEffect } from "react";

export enum TickSpeed {
  Normal = 1000,
  Sliding = 100,
  Fast = 50,
}

export function getTickSpeedForLevel(level: number): number {
  if (level === 0) return TickSpeed.Normal;
  // Gravity Formula for Tetris from https://harddrop.com/wiki/Tetris_Worlds
  const time = (0.8 - (level - 1) * 0.007) ** (level - 1);
  return time * 1000;
}

export function useGameStatus() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalLinesCleared] = useState(0);

  const [tickSpeed, setTickSpeed] = useState<TickSpeed | null>(null);
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const newCurrentLevel = Math.floor(totalLinesCleared / 10);
      setCurrentLevel(newCurrentLevel);
      setTickSpeed(getTickSpeedForLevel(newCurrentLevel));
    }
  }, [isPlaying, totalLinesCleared]);

  const pauseGame = () => {
    setIsPaused(true);
    setTickSpeed(null);
  };

  const resumeGame = () => {
    setIsPaused(false);
    setTickSpeed(TickSpeed.Normal);
  };

  return {
    isPlaying,
    setIsPlaying,
    gameOver,
    setGameOver,
    isPaused,
    pauseGame,
    resumeGame,
    tickSpeed,
    currentLevel,
  };
}
