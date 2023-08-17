import { useState } from "react";
import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import ShinyStars from "./components/ShinyStars";
import HeldPiece from "./components/HeldPiece";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameOver from "./components/GameOver";
import Controls from "./components/Controls";
import GameInfo from "./components/GameInfo";
import "./index.css";

function App() {
  const [currentTheme, setCurrentTheme] = useState("theme1");
  const {
    board,
    startGame,
    isPlaying,
    score,
    upcomingBlocks,
    pauseGame,
    resumeGame,
    gameOver,
    isPaused,
    heldBlock,
    swapWithHold,
    dispatchBoardState,
    hardDrop,
    totalLinesCleared,
    level,
  } = useTetris();

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      switch (prevTheme) {
        case "theme1":
          return "theme2";
        case "theme2":
          return "theme3";
        case "theme3":
          return "theme1";
        default:
          return prevTheme;
      }
    });
  };

  const handleMoveLeft = () => {
    dispatchBoardState({ type: "move", isPressingLeft: true });
  };
  const handleMoveDown = () => {
    dispatchBoardState({ type: "move", isPressingDown: true });
  };
  const handleMoveRight = () => {
    dispatchBoardState({ type: "move", isPressingRight: true });
  };
  const handleRotate = () => {
    dispatchBoardState({ type: "move", isRotating: true });
  };

  return (
    <div className={`app ${currentTheme}`}>
      <ShinyStars children={undefined} />
      <ToastContainer />
      <div className="title">
        <h1>
          <span className="t">T</span>
          <span className="e">E</span>
          <span className="t2">T</span>
          <span className="r">R</span>
          <span className="i">I</span>
          <span className="s">S</span>
        </h1>
        {!isPlaying && !gameOver && (
          <button onClick={startGame}>Start Game</button>
        )}
      </div>
      {gameOver ? (
        <GameOver score={score} startGame={startGame} />
      ) : (
        isPlaying && (
          <div className="game-container">
            <div className="next">
              <div className="held-piece">
                Hold <HeldPiece block={heldBlock} />
              </div>
              Next <UpcomingBlocks upcomingBlocks={upcomingBlocks} />{" "}
            </div>
            <div>
              <Board
                currentBoard={board}
                isDropping={false}
                moveShapeDown={function (): void {
                  throw new Error("Function not implemented.");
                }}
                dropInterval={0}
              />
              <Controls
                moveLeft={handleMoveLeft}
                moveDown={handleMoveDown}
                moveRight={handleMoveRight}
                rotate={handleRotate}
                drop={hardDrop}
                hold={swapWithHold}
              />
            </div>

            <GameInfo
              level={level}
              score={score}
              totalLinesCleared={totalLinesCleared}
              isPaused={isPaused}
              isPlaying={isPlaying}
              resumeGame={resumeGame}
              pauseGame={pauseGame}
              startGame={startGame}
              toggleTheme={toggleTheme}
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;
