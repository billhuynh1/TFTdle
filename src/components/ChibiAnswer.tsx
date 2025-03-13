import React from "react";
import { Chibi } from "../type.ts";

interface ChibiAnswerProps {
    guessedChibis: Chibi[]
}

const ChibiAnswer: React.FC<ChibiAnswerProps> = ({ guessedChibis }) => {
  return (
    <div className="chibi-answer">
      {guessedChibis.map((chibi) => (
        
        
      ))}
    </div>
  );
};
export default ChibiAnswer;
