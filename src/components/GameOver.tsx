import React from "react";

interface GameOverProps {
  score: number;
  startGame: () => void;
}

interface ScoreObject {
  score: number;
  timestamp: number;
}

const saveScoreToLocal = (score: number) => {
  const currentScores: ScoreObject[] = JSON.parse(
    localStorage.getItem("scores") || "[]"
  );
  const newScore: ScoreObject = {
    score,
    timestamp: Date.now(),
  };
  localStorage.setItem("scores", JSON.stringify([...currentScores, newScore]));
};

const removeOldScores = () => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // in milliseconds
  const currentScores: ScoreObject[] = JSON.parse(
    localStorage.getItem("scores") || "[]"
  );
  const filteredScores = currentScores.filter(
    (score) => Date.now() - score.timestamp < oneWeek
  );
  localStorage.setItem("scores", JSON.stringify(filteredScores));
};

const GameOver: React.FC<GameOverProps> = ({ score, startGame }) => {
  saveScoreToLocal(score);
  removeOldScores();

  const scoresFromLocal: ScoreObject[] = JSON.parse(
    localStorage.getItem("scores") || "[]"
  );
  const sortedScores = scoresFromLocal.sort(
    (a: ScoreObject, b: ScoreObject) => b.score - a.score
  );

  const topScores = Array.from(new Set(sortedScores.map((s) => s.score)))
    .filter((scoreValue) => scoreValue > 0)
    .slice(0, 5);

  return (
    <div className="game-over">
      Game Over
      <p className="earnedScore">Your Score: {score}</p>
      <div className="pastScores">
        Highest Scores
        {topScores.map((scoreValue, index) => (
          <p key={index}>Score: {scoreValue}</p>
        ))}
        <button onClick={startGame}>Start New Game</button>
      </div>
    </div>
  );
};

export default GameOver;
