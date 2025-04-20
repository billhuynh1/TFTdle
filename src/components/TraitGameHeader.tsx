import React from "react";
import { useTraitContext } from "../context/TraitContext.tsx";

const TraitGameHeader = () => {
  const { traitAnswer } = useTraitContext();
  return (
    <div className="game-header-trait">
      <span className="game-header-trait__header">
        Which trait has this description?
      </span>
      <q className="game-header-trait__description">
        {traitAnswer?.description}
      </q>
    </div>
  );
};

export default TraitGameHeader;
