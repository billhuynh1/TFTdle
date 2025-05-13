import { createContext, useContext } from "react";
import { ChampionContextType } from "../type";

// Create the ChampionContext
export const ChampionContext = createContext<ChampionContextType | undefined>(
  undefined,
);

export const useChampionContext = (): ChampionContextType => {
  const context = useContext(ChampionContext);
  if (!context) {
    throw new Error("useChampionContext ");
  }
  return context;
};
