import React, { useState } from "react";
import SearchBars from "../components/SearchBars.tsx";
import Champion from "../type.ts";

interface Chibi extends Champion {}

const FinisherPage: React.FC = () => {
  // List of chibis
  const [chibis, setChibis] = useState<Chibi[]>(null);
  const [guessedChibis, setGuessedChibis] = useState<Chibi[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  return (
    <>
      <div className="finisher__header">
        Should be a gif of a finisher or something
      </div>
      <SearchBars
        items={chibis}
        guessedItems={guessedChibis}
        setGuessedItems={setGuessedChibis}
        setAttempts={setAttempts}
      />
    </>
  );
};

export default FinisherPage;
