import React, { useEffect, useState } from "react";
import SearchBars from "../components/SearchBars.tsx";
import { Chibi } from "../type.ts";
import fetchChibis from "../utils/fetchChibis.ts";

const FinisherPage: React.FC = () => {
  // List of chibis
  const [chibiList, setChibiList] = useState<Chibi[]>([]);
  const [guessedChibis, setGuessedChibis] = useState<Chibi[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    const getChibis = async () => {
      const chibis = await fetchChibis();
      setChibiList(chibis);
    };
    getChibis();
  }, []);

  // Need to fix item names css and margin of footer
  return (
    <>
      <div className="finisher__header">
        Should be a gif of a finisher or something
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
