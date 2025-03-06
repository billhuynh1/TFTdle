import React, { createContext, useContext } from "react";

// Define SearchLockContextType (replace 'any' with actual types)
export interface SearchLockContextType {
  isSearchLock: boolean;
  setIsSearchLock: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create SearchLockContext
export const SearchLockContext = createContext<
  SearchLockContextType | undefined
>(undefined);

// Hook to use SearchLockContext with error handling
export const useSearchLock = (): SearchLockContextType => {
  const context = useContext(SearchLockContext);
  if (!context) {
    throw new Error("useSearchLock must be used within a SearchLockProvider");
  }
  return context;
};
