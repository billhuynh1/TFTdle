import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Chibi } from "../type";
import { useChibiContext } from "../context/ChibiContext";
import Modes from "./Modes";

interface ChibiGameEndProps {
  chibi: Chibi | undefined;
  attempts: number;
}

const GameEnd: React.FC<ChibiGameEndProps> = ({ chibi, attempts }) => {
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
  const { chibiFinisherAnswer } = useChibiContext();
  const gifPath = `${process.env.REACT_APP_AWS_S3_URL}finishers/`;
  const [showContent, setShowContent] = useState<boolean>(false);
  const [difference, setDifference] = useState<number>(
    resetTime.getTime() - currentTime.getTime(),
  );
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}chibi_images/`;
  const chibiGameEndRef = useRef<HTMLDivElement>(null);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleAnimationEnd = () => {
    if (chibiGameEndRef.current) {
      chibiGameEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setShowContent(true);
    });
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
      ref={chibiGameEndRef}
      className="game-end game-end__header--finisher fade-in"
      onAnimationEnd={handleAnimationEnd}
    >
      <h1
        className="game-end__header game-end__header--finisher"
        style={{ color: "white", fontSize: "50px" }}
      >
        👏gg ez👏
      </h1>
      <span
        className="game-end__content game-end__content--finisher"
        style={{ color: "white", fontSize: "1.3em" }}
      >
        The chibi was
      </span>
      <div className="game-end__chibi">
        <img
          src={`${imagePath}${chibi?.imageUrl}`}
          className="game-end-champ-icon"
          alt="Correct chibi"
          width={60}
          height={60}
        />
        <div className="game-end__container">
          <span className="game-end__chibi__text">
            {chibi?.name?.replaceAll("_", " ")}
          </span>
        </div>
      </div>
      <span className="game-end__chibi__attempts">
        Number of attempts: <span style={{ color: "gold" }}>{attempts}</span>
      </span>
      <img
        src={`${gifPath}${chibiFinisherAnswer?.gifUrl}`}
        alt="Gif of chibi finisher"
        className="chibi-finisher chibi-finisher-game-end"
      />
      <div className="timer-container">
        <span className="timer-header">Next character in:</span>
        <span className="timer-content">{formatTime(difference)}</span>
      </div>
      <span className="timer-content-footer">(Time Zone: UTC)</span>
      <hr className="timer-separator" />
      <span className="timer-separator__text">Next Mode:</span>
      <Link to="/littlelegend">
        <button
          className="next-mode-button"
          type="button"
          aria-label="finsher mode button"
        >
          <img
            src="./images/littlelegend_button.png"
            className="next-mode-button-icon"
            alt="Next mode button"
          />
          <span className="next-mode-button-text">Little Legend</span>
          <span className="next-mode-button__description">
            Guess the little legend splash art
          </span>
        </button>
      </Link>
      <Modes />
    </div>
  );
};

export default GameEnd;
