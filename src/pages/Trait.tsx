import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import TraitGameHeader from "../components/TraitGameHeader.tsx";
import { useTraitContext } from "../context/TraitContext.tsx";
import SearchBars from "../components/SearchBars.tsx";
import AnswersItem from "../components/AnswersItem.tsx";
import { Trait } from "../type.ts";
import TraitGameEnd from "../components/TraitGameEnd.tsx";

const TraitPage = (): React.ReactElement => {
  const {
    traitList,
    traitAnswer,
    guessedTraits,
    setGuessedTraits,
    isTraitGameOver,
    setIsTraitGameOver,
  } = useTraitContext();
  const [attempts, setAttempts] = React.useState<number>(0);
  const location = useLocation();
  const mode = location.pathname.replace("/", "");

  const fetchGuesses = (): string => {
    const guesses: string = localStorage.getItem(`${mode}_guesses`) || "";
    return guesses;
  };

  // Util function
  const findTraitByNameInTable = (
    traits: string[],
    traitList: Trait[],
  ): Trait[] => {
    const traitObjects = traits.map(
      (name) => traitList.find((trait) => trait.name === name)!,
    );
    return traitObjects.reverse();
  };

  useEffect(() => {
    if (!traitAnswer) return;

    const guessesFromStorage: string[] = JSON.parse(fetchGuesses()) || [];
    const updateGuesses = (traits: string[]) => {
      const guesses = findTraitByNameInTable(traits, traitList);
      setGuessedTraits(guesses);
    };
    updateGuesses(guessesFromStorage);
  }, [traitAnswer, traitList]);

  const showConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 0.5 } });
  };

  return (
    <>
      <TraitGameHeader />
      {!isTraitGameOver &&
        (showConfetti(),
        (<TraitGameEnd trait={traitAnswer} attempts={guessedTraits.length} />))}
      {!isTraitGameOver && (
        <SearchBars
          items={traitList}
          guessedItems={guessedTraits}
          setGuessedItems={setGuessedTraits}
          setAttempts={setAttempts}
          pathForImages=""
        />
      )}
      <div className="answers__container">
        {guessedTraits.map((trait) => {
          const itemColor = trait === traitAnswer ? "correct" : "incorrect";

          return (
            <AnswersItem
              key={trait.id}
              item={trait}
              pathOfImages="traits"
              itemColor={itemColor}
              setIsGameOver={setIsTraitGameOver}
            />
          );
        })}
      </div>
    </>
  );
};

export default TraitPage;
