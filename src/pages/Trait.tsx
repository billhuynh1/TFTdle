import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import TraitGameHeader from "../components/TraitGameHeader";
import { useTraitContext } from "../context/TraitContext";
import SearchBars from "../components/SearchBars";
import AnswersItem from "../components/AnswersItem";
import { Trait } from "../type";
import TraitGameEnd from "../components/TraitGameEnd";
import Modes from "../components/Modes";
import Headers from "../components/Headers";
import Share from "../components/Share";

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
      <Modes />
      <Headers />
      <TraitGameHeader />
      {!isTraitGameOver && (
        <SearchBars
          items={traitList}
          guessedItems={guessedTraits}
          setGuessedItems={setGuessedTraits}
          setAttempts={setAttempts}
          pathForImages="converted_trait_images"
        />
      )}
      <div className="answers__container">
        {guessedTraits.map((trait) => {
          const itemColor = trait === traitAnswer ? "correct" : "incorrect";

          return (
            <AnswersItem
              key={trait.id}
              item={trait}
              pathOfImages="converted_trait_images"
              itemColor={itemColor}
              setIsGameOver={setIsTraitGameOver}
            />
          );
        })}
      </div>
      {isTraitGameOver &&
        (showConfetti(),
        (
          <>
            <TraitGameEnd trait={traitAnswer} attempts={guessedTraits.length} />
            <Share mode={mode} />
          </>
        ))}
    </>
  );
};

export default TraitPage;
