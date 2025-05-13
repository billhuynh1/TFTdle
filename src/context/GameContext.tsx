import React, { createContext, useContext } from "react";
import { GameContextType } from "../type";

// Create the GameContext
export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

// Hook to use GameContext with error handling
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
