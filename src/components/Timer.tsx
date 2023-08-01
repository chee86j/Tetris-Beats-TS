import React, { useState, useEffect } from "react";

interface TimerProps {
  isPaused: boolean;
}

const Timer: React.FC<TimerProps> = ({ isPaused }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return <div className="timer">Time: {formatTime(seconds)}</div>;
};

export default Timer;
