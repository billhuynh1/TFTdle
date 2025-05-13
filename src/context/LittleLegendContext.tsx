import { createContext, useContext } from "react";
import { LittleLegendContextType } from "../type";

// Create the ChampionContext
export const LittleLegendContext = createContext<
  LittleLegendContextType | undefined
>(undefined);

export const useLittleLegendContext = (): LittleLegendContextType => {
  const context = useContext(LittleLegendContext);
  if (!context) {
    throw new Error("useLittleLegendContext ");
  }
  return context;
};
