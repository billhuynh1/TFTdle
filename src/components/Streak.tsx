import { useState } from "react";

const Streak = () => {
  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem("streak") || "0", 10);
  });

  return (
    <div className="streak">
      <img
        src="./images/tft_streak.png"
        alt="Fire icon"
        className="streak-icon"
      />
      <span className="streak-count">{streak}</span>
    </div>
  );
};

export default Streak;
