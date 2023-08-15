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
                moveLeft={() =>
                  dispatchBoardState({ type: "move", isPressingLeft: true })
                }
                moveDown={() =>
                  dispatchBoardState({ type: "move", isPressingDown: true })
                }
                moveRight={() =>
                  dispatchBoardState({ type: "move", isPressingRight: true })
                }
                rotate={() =>
                  dispatchBoardState({ type: "move", isRotating: true })
                }
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
      <ToastContainer />
    </div>
  );
}

export default App;
