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
import { CarouselComponent } from "./components/Carousel";

import "./index.css";

function App() {
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
    <div className={`app`}>
      <CarouselComponent />
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
        <h2 className="instructions">
          {!isPlaying && !gameOver && (
            <>
              <div>Left Arrow - Move Left</div>
              <div>Right Arrow - Move Right</div>
              <div>Down Arrow - Move Down</div>
              <div>Up Arrow - Rotate</div>
              <div>C - Hold</div>
              <div>Space - Hard Drop</div>
            </>
          )}
        </h2>
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
            <div className="board board-border">
              <Board
                currentBoard={board}
                isDropping={false}
                moveShapeDown={function (): void {
                  throw new Error("Function not implemented.");
                }}
                dropInterval={0}
                tetrominoCellClassName="cell committed"
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
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;
