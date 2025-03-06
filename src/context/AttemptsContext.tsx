import { createContext, useContext } from "react";
import { AttemptsContextType } from "../type.ts";

export const AttemptsContext = createContext<AttemptsContextType | undefined>(
  undefined,
);

// Custom hook to use the AttemptsContext
export const useAttemptsContext = (): AttemptsContextType => {
  const context = useContext(AttemptsContext);
  if (!context) {
    throw new Error("useAttemptsContext ");
  }
  return context;
};
