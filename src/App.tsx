import { useState } from "react";
import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import Timer from "./components/Timer";
import "./index.css"; // Import your original CSS here

function App() {
  const [isTetrisEffectTheme, setIsTetrisEffectTheme] = useState(true);
  const {
    board,
    startGame,
    isPlaying,
    score,
    upcomingBlocks,
    pauseGame,
    resumeGame,
    isPaused,
  } = useTetris();

  const toggleTheme = () => {
    setIsTetrisEffectTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className={`app ${isTetrisEffectTheme ? "tetris-effect-theme" : ""}`}>
      <div className="title">
        <h1>
          <span className="t">T</span>
          <span className="e">E</span>
          <span className="t2">T</span>
          <span className="r">R</span>
          <span className="i">I</span>
          <span className="s">S</span>
        </h1>
        {!isPlaying && <button onClick={startGame}>Start Game</button>}
      </div>
      {isPlaying && (
        <div className="game-container">
          <Board currentBoard={board} />
          <div className="game-info">
            <div className="score">Score: {score}</div>
            <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
            <Timer isPaused={isPaused} />
            {isPlaying && isPaused && (
              <button onClick={resumeGame}>Resume</button>
            )}
            {isPlaying && !isPaused && (
              <button onClick={pauseGame}>Pause</button>
            )}
            <button onClick={startGame}>New Game</button>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
