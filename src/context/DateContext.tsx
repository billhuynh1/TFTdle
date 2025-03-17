import { createContext, useContext } from "react";
import { DateContextType } from "../type.ts";

export const DateContext = createContext<DateContextType | undefined>(
  undefined,
);

// Custom hook to use the DateContext
export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("Error using DateContext ");
  }
  return context;
};
