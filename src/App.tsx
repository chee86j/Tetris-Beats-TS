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
import { CarouselComponent } from "./components/Carousel";
import ReactAudioPlayer from "react-audio-player";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
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

  const [audioIndex, setAudioIndex] = useState(0);

  const audioUrls = [
    "https://cdn.pixabay.com/audio/2021/09/27/audio_59b8f3d306.mp3",
    "https://cdn.pixabay.com/audio/2023/08/18/audio_902cf86e70.mp3",
    "https://cdn.pixabay.com/audio/2023/06/28/audio_352cf6aad4.mp3",
    "https://cdn.pixabay.com/audio/2022/05/04/audio_6b39b8c39b.mp3",
    "https://cdn.pixabay.com/audio/2022/09/03/audio_fc484f828f.mp3",
    "https://cdn.pixabay.com/audio/2022/02/07/audio_6ccd59b11c.mp3",
    "https://cdn.pixabay.com/audio/2021/11/09/audio_cf3e4529a2.mp3",
    "https://cdn.pixabay.com/audio/2023/02/13/audio_90696831ef.mp3",
    "https://cdn.pixabay.com/audio/2023/01/08/audio_80ccdfebed.mp3",
    "https://cdn.pixabay.com/audio/2023/04/27/audio_d6ce814591.mp3",
    "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
    "https://cdn.pixabay.com/audio/2022/07/26/audio_112f2d606c.mp3",
    "https://cdn.pixabay.com/audio/2021/09/06/audio_14fb3b6893.mp3",
  ];

  const playPrevious = () => {
    setAudioIndex(
      (prevIndex) => (prevIndex - 1 + audioUrls.length) % audioUrls.length
    );
  };

  const playNext = () => {
    setAudioIndex((prevIndex) => (prevIndex + 1) % audioUrls.length);
  };

  return (
    <div className={`app`}>
      <CarouselComponent />
      {isPlaying && (
        <div className="audio-controls">
          <button onClick={playPrevious}>
            <ArrowLeftToLine size={12} />
          </button>
          <button onClick={playNext}>
            <ArrowRightToLine size={12} />
          </button>
        </div>
      )}
      <ReactAudioPlayer
        className="audio"
        src={audioUrls[audioIndex]}
        autoPlay
        loop
        controls
      />
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
              {/* {!isPaused && ( */}
              <Controls
                moveLeft={handleMoveLeft}
                moveDown={handleMoveDown}
                moveRight={handleMoveRight}
                rotate={handleRotate}
                drop={hardDrop}
                hold={swapWithHold}
              />
              {/* )} */}
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
              switchAudio={() =>
                setAudioIndex((prevIndex) => (prevIndex + 1) % audioUrls.length)
              }
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;
