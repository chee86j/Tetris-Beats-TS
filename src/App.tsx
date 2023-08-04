import { useState } from "react";
import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import Timer from "./components/Timer";
import ShinyStars from "./components/ShinyStars";
import HeldPiece from "./components/HeldPiece";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

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
    heldBlock,
  } = useTetris();

  const toggleTheme = () => {
    setIsTetrisEffectTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className={`app ${isTetrisEffectTheme ? "tetris-effect-theme" : ""}`}>
      <ShinyStars children={undefined} />
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
          <div className="next">
            <div className="held-piece">
              Hold <HeldPiece block={heldBlock} />
            </div>
            Next <UpcomingBlocks upcomingBlocks={upcomingBlocks} />{" "}
          </div>
          <Board
            currentBoard={board}
            isDropping={false}
            moveShapeDown={function (): void {
              throw new Error("Function not implemented.");
            }}
            dropInterval={0}
          />
          <div className="game-info">
            <div className="score">Score: {score}</div>
            <div className="buttons">
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
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
