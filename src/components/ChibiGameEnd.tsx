import React, { useEffect, useState } from "react";
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
    <div className="game-end game-end__header--finisher fade-in">
      <h1
        className="game-end__header game-end__header--finisher"
        style={{ color: "white", fontSize: "50px" }}
      >
        👏gg ez👏
      </h1>
      <span
        className="game-end__content"
        style={{ color: "white", padding: "", fontSize: "20px" }}
      >
        The chibi was:
      </span>
      <div className="game-end__champ">
        <img
          src={`${imagePath}${chibi?.imageUrl}`}
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
          {chibi?.name?.replaceAll("_", " ")}
        </span>
      </div>
      <span>{attempts}</span>
    </div>
  );
};

export default GameEnd;
