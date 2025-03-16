import React, { useEffect, useState } from "react";
import SearchBars from "../components/SearchBars.tsx";
import ChibiAnswer from "../components/ChibiAnswer.tsx";
import { useChibiContext } from "../context/ChibiContext.tsx";

const FinisherPage: React.FC = () => {
  const [attempts, setAttempts] = useState<number>(0);
  const [blurValue, setBlurValue] = useState<number>(0);
  const gifPath = "https://tftdle.s3.us-east-2.amazonaws.com/finishers/";
  const { chibiList, guessedChibis, setGuessedChibis, chibiFinisherAnswer } =
    useChibiContext();

  // Need to save guess to localStorage

  return (
    <>
      <div className="finisher__header">
        <img
          src={`${gifPath}${chibiFinisherAnswer?.gifUrl}`}
          alt="Gif of chibi finisher"
          className="chibi-finisher"
          style={{ filter: `blur(${blurValue}px)` }}
        />
      </div>
      <SearchBars
        items={chibiList}
        guessedItems={guessedChibis}
        setGuessedItems={setGuessedChibis}
        setAttempts={setAttempts}
      />
      <ChibiAnswer guessedChibis={guessedChibis} />
    </>
  );
};

export default FinisherPage;
