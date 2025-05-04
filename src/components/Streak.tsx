import { useState } from "react";

const Streak = () => {
  // Implemented daily streak, needs testing, play through
  const initialStreak = parseInt(localStorage.getItem("streak") || "0", 10);
  const [streak, setStreak] = useState<number>(initialStreak);
  return (
    <div className="streak">
      <img src="./images/tft_streak.png" alt="Fire icon" />
      <span>{streak}</span>
    </div>
  );
};

export default Streak;
