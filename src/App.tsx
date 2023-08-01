import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import Timer from "./components/Timer";

function App() {
  const { board, startGame, isPlaying, score, upcomingBlocks } = useTetris();

  return (
    <div className="app">
      {isPlaying ? (
        <div className="game-container">
          <div className="title">
            <h1>
              <span className="t">T</span>
              <span className="e">E</span>
              <span className="t2">T</span>
              <span className="r">R</span>
              <span className="i">I</span>
              <span className="s">S</span>
            </h1>
          </div>
          <div className="main-container">
            <Board currentBoard={board} />
            <div className="game-info">
              <div className="score">Score: {score}</div>
              <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
              <Timer />
              <button onClick={startGame}>New Game</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="title">
          <h1>
            <span className="t">T</span>
            <span className="e">E</span>
            <span className="t2">T</span>
            <span className="r">R</span>
            <span className="i">I</span>
            <span className="s">S</span>
          </h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
