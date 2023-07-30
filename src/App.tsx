import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import Timer from "./components/Timer";

function App() {
  const { board, startGame, isPlaying, score, upcomingBlocks } = useTetris();

  return (
    <div className="app">
      {isPlaying ? (
        <div>
          <h1>Tetris</h1>
          <Board currentBoard={board} />
          <div className="controls">
            <h2>Score: {score}</h2>
            <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
            <Timer />
          </div>
        </div>
      ) : (
        <div>
          <h1>Tetris</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
