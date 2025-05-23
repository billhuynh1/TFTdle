import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import SearchBars from "../components/SearchBars";
import ChibiAnswer from "../components/ChibiAnswer";
import { useChibiContext } from "../context/ChibiContext";
import { Chibi } from "../type";
import { useGame } from "../context/GameContext";
import ChibiGameEnd from "../components/ChibiGameEnd";
import Modes from "../components/Modes";
import Headers from "../components/Headers";
import Share from "../components/Share";

const FinisherPage: React.FC = () => {
  const location = useLocation();
  const mode = location.pathname.replace("/", "");
  const [attempts, setAttempts] = useState<number>(0);
  const [blurValue, setBlurValue] = useState<number>(35);
  const gifPath = `${process.env.REACT_APP_AWS_S3_URL}finishers/`;

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

    const guessesFromStorage: string[] = JSON.parse(fetchGuesses()) || [];
    const updateGuesses = (chibis: string[]) => {
      const guesses = findChibiByNameInTable(chibis, chibiList);
      setGuessedChibis(guesses);
    };
    updateGuesses(guessesFromStorage);
  }, [chibiFinisherAnswer, chibiList]);

  useEffect(() => {
    const temp: number = guessedChibis.length * 2.5;
    setBlurValue(Math.max(35 - temp, 0));
  }, [guessedChibis]);

  useEffect(() => {
    if (isFinisherGameOver) {
      // When switching between pages, the blur value resets to 30
      setBlurValue(0); // Set blur to 0 when game is over
    }
  }, [isFinisherGameOver, guessedChibis]);

  // Needs confetti when game is over

  const showConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 0.5 } });
  };

  if (isFinisherGameOver) {
    showConfetti();
  }

  return (
    <>
      <Modes />
      <Headers />
      <div className="finisher__header">
        <span className="finisher__header__text">
          Which chibi finisher is this?
        </span>
        <img
          src={`${gifPath}${chibiFinisherAnswer?.gifUrl}`}
          alt="Gif of chibi finisher"
          className="chibi-finisher"
          style={{ filter: `blur(${blurValue}px)` }}
        />
        <span className="little-legend__footer__text">
          Each guess unblurs the finisher
        </span>
      </div>
      {!isFinisherGameOver ? (
        <SearchBars
          items={chibiList}
          guessedItems={guessedChibis}
          setGuessedItems={setGuessedChibis}
          setAttempts={setAttempts}
          pathForImages="chibi_images"
        />
      ) : null}
      <ChibiAnswer guessedChibis={guessedChibis} />
      {isFinisherGameOver && (
        <>
          <ChibiGameEnd
            chibi={chibiFinisherAnswer}
            attempts={guessedChibis.length}
          />
          <Share mode={mode} />
        </>
      )}
    </>
  );
};

export default FinisherPage;
