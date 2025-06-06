import React from "react";
import { Chibi } from "../type";
import ChibiAnswerItem from "./ChibiAnswerItem";

interface ChibiAnswerProps {
  guessedChibis: Chibi[];
}

const ChibiAnswer: React.FC<ChibiAnswerProps> = ({ guessedChibis }) => {
  return (
    <div className="chibi__answer">
      {guessedChibis.map((chibi) => (
        <ChibiAnswerItem key={chibi.id} chibi={chibi} />
      ))}
    </div>
  );
};

export default ChibiAnswer;
