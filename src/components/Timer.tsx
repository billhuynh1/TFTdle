import { useEffect, useState } from "react";

const Timer = () => {
  const currentTime = new Date();
  const resetTime = new Date(
    Date.UTC(
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate() + 1,
      0,
      0,
      0,
    ),
  );
  const [difference, setDifference] = useState<number>(
    resetTime.getTime() - currentTime.getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDifference(resetTime.getTime() - now.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer-container timer-container-instructions">
      <span className="timer-header">Next character in:</span>
      <span className="timer-content">{formatTime(difference)}</span>
      <span className="timer-content-footer timer-content-footer-instructions">
        (Timezone: UTC)
      </span>
    </div>
  );
};

export default Timer;
