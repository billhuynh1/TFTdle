import React from "react";
import TraitGameHeader from "../components/TraitGameHeader.tsx";
import { useTraitContext } from "../context/TraitContext.tsx";
import SearchBars from "../components/SearchBars.tsx";
import AnswersItem from "../components/AnswersItem.tsx";

const Trait = (): React.ReactElement => {
  const { traitList, traitAnswer, guessedTraits, setGuessedTraits } =
    useTraitContext();
  const [attempts, setAttempts] = React.useState<number>(0);
  const [isTraitGameOver, setIsTraitGameOver] = React.useState<boolean>(false);

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

export default Trait;
