import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBars from "../components/SearchBars.tsx";
import ChibiAnswer from "../components/ChibiAnswer.tsx";
import { useChibiContext } from "../context/ChibiContext.tsx";
import { Chibi } from "../type.ts";
import GameEnd from "../components/GameEnd.tsx";
import { useGame } from "../context/GameContext.tsx";

const FinisherPage: React.FC = () => {
  const location = useLocation();
  const mode = location.pathname.replace("/", "");
  const [attempts, setAttempts] = useState<number>(0);
  const [blurValue, setBlurValue] = useState<number>(0);
  const gifPath = "https://tftdle.s3.us-east-2.amazonaws.com/finishers/";
  const { chibiList, guessedChibis, setGuessedChibis, chibiFinisherAnswer } =
    useChibiContext();
  const { isFinisherGameOver } = useGame();

  // Util function
  const fetchGuesses = (): string => {
    const guesses: string = localStorage.getItem(`${mode}_guesses`) || "";
    return guesses;
  };

  // Util function
  const findChibiByNameInTable = (
    chibis: string[],
    chibiList: Chibi[],
  ): Chibi[] => {
    const chibiObjects = chibis.map(
      (name) => chibiList.find((chibi) => chibi.name === name)!,
    );
    return chibiObjects.reverse();
  };

  // Need to save guess to localStorage
  useEffect(() => {
    if (!chibiFinisherAnswer) return;

    const guessesFromStorage: string[] = JSON.parse(fetchGuesses());
    const updateGuesses = (chibis: string[]) => {
      const guesses = findChibiByNameInTable(chibis, chibiList);
      setGuessedChibis(guesses);
      // Setting attempts
    };
    updateGuesses(guessesFromStorage);
  }, [chibiFinisherAnswer, chibiList]);

  // Use hooks usedailyreset and usepolling to clear localStorage and reset chibi finisher answer.

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
      {!isFinisherGameOver ? (
        <SearchBars
          items={chibiList}
          guessedItems={guessedChibis}
          setGuessedItems={setGuessedChibis}
          setAttempts={setAttempts}
        />
      ) : (
        <GameEnd />
      )}
      <ChibiAnswer guessedChibis={guessedChibis} />
    </>
  );
};

export default FinisherPage;
