import React from "react";
import { useTraitContext } from "../context/TraitContext.tsx";
import TraitHintHelper from "./TraitHintHelper.tsx";

const TraitGameHeader = (): React.ReactElement => {
  const { traitAnswer, guessedTraits } = useTraitContext();
  return (
    <div className="game-header-trait">
      <span className="game-header-trait__header">
        Which trait has this description?
      </span>
      <span className="game-header-trait__description">
        <span className="quote-mark left">“</span>
        {traitAnswer?.description}
        <span className="quote-mark right">“</span>
      </span>
      <TraitHintHelper attempts={guessedTraits.length} />
    </div>
  );
};

export default TraitGameHeader;
