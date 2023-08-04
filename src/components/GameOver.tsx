import React from "react";

interface GameOverProps {
  score: number;
  startGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, startGame }) => {
  return (
    <div className="game-over">
      <h1>
        Game Over
        <p className="earnedScore">Your Score: {score}</p>
        <button onClick={startGame}>Start a New Game</button>
      </h1>
    </div>
  );
};

export default GameOver;
