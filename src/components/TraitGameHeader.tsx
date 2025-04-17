import React from "react";
import { useTraitContext } from "../context/TraitContext.tsx";

const TraitGameHeader = () => {
  const { traitAnswer } = useTraitContext();
  return (
    <div className="game-header trait">
      <p>{traitAnswer?.description}</p>
    </div>
  );
};

export default TraitGameHeader;
