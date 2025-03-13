import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import SearchBars from "../components/SearchBars.tsx";
import { Chibi } from "../type.ts";
import fetchChibis from "../utils/fetchChibis.ts";

const FinisherPage: React.FC = () => {
  const [chibiList, setChibiList] = useState<Chibi[]>([]);
  const [guessedChibis, setGuessedChibis] = useState<Chibi[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [chibiFinisherAnswer, setChibiFinisherAnswer] = useState<Chibi>();
  const [chibiListLength, setChibiListLength] = useState<number>(0);
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [blurValue, setBlurValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const gifPath = "https://tftdle.s3.us-east-2.amazonaws.com/finishers/";

  useEffect(() => {
    const getChibis = async () => {
      const chibis = await fetchChibis();
      setChibiList(chibis);
      setChibiListLength(chibis.length);
    };
    getChibis();
  }, []);

  useEffect(() => {
    if (chibiListLength > 0) {
      setRandomIndex(Math.floor(Math.random() * chibiListLength));
    }
  }, [chibiListLength]);

  useEffect(() => {
    if (chibiListLength > 0 && randomIndex !== null) {
      setChibiFinisherAnswer(chibiList[randomIndex]);
      setIsLoading(false);
    }
  }, [randomIndex, chibiList]);

  // Could be util
  const renderLoading = (): React.JSX.Element | null => {
    if (isLoading) {
      return (
        <>
          <ClipLoader
            className="loader"
            aria-label="Loading data"
            size={50}
            color="white"
            speedMultiplier={0.5}
          />
          <span style={{ color: "white", zIndex: "2" }}>
            Give it a second...
          </span>
        </>
      );
    }
    return null;
  };
  // Need to fix item names css and margin of footer
  return (
    <>
      <div className="finisher__header">
        {renderLoading()}
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
    </>
  );
};

export default FinisherPage;
