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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import image1 from "./images/image1.jpg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import image2 from "./images/image2.jpg";
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
    setIsTetrisEffectTheme((prevTheme) => !prevTheme);
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
    <div className={`app ${isTetrisEffectTheme ? "theme1" : "theme2"}`}>
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
