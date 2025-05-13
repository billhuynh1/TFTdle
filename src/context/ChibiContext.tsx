import { createContext, useContext } from "react";
import { ChibiContextType } from "../type";

export const ChibiContext = createContext<ChibiContextType | undefined>(
  undefined,
);

// Custom hook to use the ChibiContext
export const useChibiContext = (): ChibiContextType => {
  const context = useContext(ChibiContext);
  if (!context) {
    throw new Error("Error using ChibiContext ");
  }
  return context;
};
