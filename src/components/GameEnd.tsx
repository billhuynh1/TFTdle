import React, { useEffect, useState } from "react";

interface GameEndProps {
  attempts: number;
  champIcon?: string;
  champName?: string;
}

const GameEnd: React.FC<GameEndProps> = ({
  attempts,
  champIcon,
  champName,
}) => {
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

  const [showContent, setShowContent] = useState<boolean>(false);
  const [difference, setDifference] = useState<number>(
    resetTime.getTime() - currentTime.getTime(),
  );

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = currentTime;

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return null;
  }

  // Use grid templates
  return (
    <div className="game-end fade-in">
      <h1
        className="game-end__header"
        style={{ color: "white", fontSize: "50px" }}
      >
        👏ez claps👏
      </h1>
      <span
        className="game-end__content"
        style={{ color: "white", padding: "", fontSize: "20px" }}
      >
        The champion was:
      </span>
      <div className="game-end__champ">
        <img
          src={`${imagePath}${champIcon}`}
          className="game-end-champ-icon"
          alt="Correct champion"
          width={60}
          height={60}
        />
        <span
          className="game-end__champ__text"
          style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
        >
          {" "}
          {champName?.replaceAll("_", " ")}
        </span>
      </div>
      <span className="attempts" style={{ color: "white" }}>
        Number of attempts: <span style={{ color: "gold" }}>{attempts}</span>
      </span>
      <div className="timer-container">
        <span className="timer-header">Next Champion in:</span>
        <span className="timer-content">{formatTime(difference)}</span>
      </div>
      <span className="timer-content-footer">(UTC time)</span>
    </div>
  );
};

export default GameEnd;
