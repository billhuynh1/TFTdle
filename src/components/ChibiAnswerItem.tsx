import React from "react";
import { Chibi } from "../type.ts";

const ChibiAnswerItem: React.FC<Chibi> = ({ ...chibi }) => {
  const gifPath = "https://tftdle.s3.us-east-2.amazonaws.com/finishers/";

  return (
    <div className="chibi__answer__item">
      <img src={`${gifPath}${chibi.gifUrl}`} alt="img of chibi" />
    </div>
  );
};
