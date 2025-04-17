import { createContext, useContext } from "react";
import { TraitContextType } from "../type.ts";

// Create the ChampionContext
export const TraitContext = createContext<TraitContextType | undefined>(
  undefined,
);

export const useTraitContext = (): TraitContextType => {
  const context = useContext(TraitContext);
  if (!context) {
    throw new Error("useTraitContext error ");
  }
  return context;
};
