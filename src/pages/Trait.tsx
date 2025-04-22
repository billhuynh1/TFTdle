import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TraitGameHeader from "../components/TraitGameHeader.tsx";
import { useTraitContext } from "../context/TraitContext.tsx";
import SearchBars from "../components/SearchBars.tsx";
import AnswersItem from "../components/AnswersItem.tsx";
import { Trait } from "../type.ts";

const TraitPage = (): React.ReactElement => {
  const { traitList, traitAnswer, guessedTraits, setGuessedTraits } =
    useTraitContext();
  const [attempts, setAttempts] = React.useState<number>(0);
  const [isTraitGameOver, setIsTraitGameOver] = React.useState<boolean>(false);
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

  return (
    <>
      <TraitGameHeader />
      <SearchBars
        items={traitList}
        guessedItems={guessedTraits}
        setGuessedItems={setGuessedTraits}
        setAttempts={setAttempts}
        pathForImages=""
      />
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
