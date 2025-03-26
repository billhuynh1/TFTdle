import React, { useEffect, useRef, useState } from "react";
import { Chibi } from "../type.ts";

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
  const [showContent, setShowContent] = useState<boolean>(false);
  const [difference, setDifference] = useState<number>(
    resetTime.getTime() - currentTime.getTime(),
  );
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}chibi_images/`;
  const chibiGameEndRef = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = () => {
    if (chibiGameEndRef.current) {
      chibiGameEndRef.current?.scrollIntoView({
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
    </div>
  );
};

export default GameEnd;
