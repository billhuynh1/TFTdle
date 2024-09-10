import { useEffect, useState } from "react";

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
  // TODO: Move all time logic to App.tsx, and pass the date as a prop
  const currentTime = new Date();
  const resetTime: Date = new Date();
  resetTime.setHours(24, 0, 0, 0);

  const [showContent, setShowContent] = useState<boolean>(false);
  const [difference, setDifference] = useState<number>(
    resetTime.getTime() - currentTime.getTime(),
  );

  const imagePath = "https://tftdle.s3.us-east-2.amazonaws.com/images/";

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
    return `${hours}h : ${minutes}m : ${seconds}s`;
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

  return (
    <div className="game-end-container fade-in">
      <span style={{ color: "white", padding: "10px" }}>
        The correct champion is:
      </span>
      <span style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}>
        {champName}
      </span>
      <img
        src={`${imagePath}${champIcon}`}
        className="champion-image-game-end"
        alt="Correct champion"
      />
      <span style={{ color: "white" }}>Number of attempts: {attempts}</span>
      <span style={{ color: "white", padding: "20px" }}>
        Next champion in: {formatTime(difference)}
      </span>
    </div>
  );
};

export default GameEnd;
