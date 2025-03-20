import React, { useEffect, useState } from "react";
import { Chibi } from "../type.ts";
import { useChibiContext } from "../context/ChibiContext.tsx";
import { useGame } from "../context/GameContext.tsx";

interface ChibiAnswerItemProps {
  chibi: Chibi;
}

const ChibiAnswerItem: React.FC<ChibiAnswerItemProps> = ({ chibi }) => {
  const [chibiItemColor, setChibiItemColor] = useState<string>("");
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}chibi_images/`;
  const { chibiFinisherAnswer } = useChibiContext();
  const { setIsFinisherGameOver } = useGame();

  useEffect(() => {
    if (chibi === chibiFinisherAnswer) {
      setChibiItemColor("correct");
      setIsFinisherGameOver(true);
    } else {
      setChibiItemColor("incorrect");
    }
  }, [chibi, chibiFinisherAnswer, setIsFinisherGameOver]);

  // Animation with each guess

  return (
    <div className={`chibi__answer__item ${chibiItemColor}`}>
      <div className="chibi__answer__content">
        <img
          src={`${imagePath}${chibi.imageUrl}`}
          alt={chibi.name}
          width={40}
          height={40}
          className="chibi__image"
        />
        <span className="chibi__answer_text">
          {chibi.name.replaceAll("_", " ")}
        </span>
      </div>
    </div>
  );
};

export default ChibiAnswerItem;
