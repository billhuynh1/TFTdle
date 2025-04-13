import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LittleLegend } from "../type.ts";
import LittleLegendBonus from "./LittleLegendBonus.tsx";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";

interface LittleLegendGameEndProps {
  littleLegend: LittleLegend | undefined;
  attempts: number;
}

const GameEnd: React.FC<LittleLegendGameEndProps> = ({
  littleLegend,
  attempts,
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
  const { isLittleLegendGameOver } = useLittleLegendContext();
  const [showContent, setShowContent] = useState<boolean>(false);
  const [difference, setDifference] = useState<number>(
    resetTime.getTime() - currentTime.getTime(),
  );
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}little_legends/`;
  const littleLegendGameEndRef = useRef<HTMLDivElement>(null);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleAnimationEnd = () => {
    if (littleLegendGameEndRef.current) {
      littleLegendGameEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = currentTime;

      setDifference(resetTime.getTime() - now.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  if (!showContent) {
    return null;
  }

  // Use grid templates
  return (
    <div
      ref={littleLegendGameEndRef}
      className="game-end game-end__header--finisher fade-in"
      onAnimationEnd={handleAnimationEnd}
    >
      <h1
        className="game-end__header game-end__header--finisher"
        style={{ color: "white", fontSize: "50px" }}
      >
        👏a G👏
      </h1>
      <span
        className="game-end__content game-end__content--finisher"
        style={{ color: "white", fontSize: "1.3em" }}
      >
        The little legend was
      </span>
      <div className="game-end__champ little-legend">
        <img
          src={`${imagePath}${littleLegend?.imageUrl}`}
          className="game-end-champ-icon"
          alt="Correct chibi"
          width={60}
          height={60}
        />
        <div className="game-end__container">
          <span className="game-end__text little-legend">
            {littleLegend?.baseType?.replaceAll("_", " ")}
          </span>
        </div>
      </div>
      {isLittleLegendGameOver && (
        <LittleLegendBonus littleLegend={littleLegend} />
      )}
      <span className="game-end__chibi__attempts">
        Number of attempts: <span style={{ color: "gold" }}>{attempts}</span>
      </span>
      <div className="timer-container">
        <span className="timer-header">Next Champion in:</span>
        <span className="timer-content">{formatTime(difference)}</span>
      </div>
      <span className="timer-content-footer">(UTC time)</span>
      <Link to="/littlelegend">
        <button
          className="next-mode-button"
          type="button"
          aria-label="next game mode button"
        >
          <span className="next-mode-button-text">
            Next mode: Coming soon...
          </span>
        </button>
      </Link>
    </div>
  );
};

export default GameEnd;
