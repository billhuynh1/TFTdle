import React, { useState, useMemo, useEffect } from "react";
import { ChampionContext } from "./ChampionContext.tsx";
import { GameContext } from "./GameContext.tsx";
import { AttemptsContext } from "./AttemptsContext.tsx";
import { SearchLockContext } from "./SearchLockContext.tsx";
import Champion from "../type.ts";
import fetchGameState from "../utils/fetchGameState.ts";

interface AppProvidersProps {
  children: React.ReactNode;
}

// DONT FORGET TO CHANGE API BACKEND URL
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isSearchLock, setIsSearchLock] = useState<boolean>(false);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);

  useEffect(() => {
    fetchGameState(setChampionList, setTestChampion, setIsLoading);
  }, []);

  const gameContextValue = useMemo(
    () => ({ isGameOver, setIsGameOver }),
    [isGameOver],
  );

  const searchLockContextValue = useMemo(
    () => ({ isSearchLock, setIsSearchLock }),
    [isSearchLock],
  );

  const ChampionContextValue = useMemo(
    () => ({
      testChampion,
      championList,
      isLoading,
      setIsLoading,
      setGuessedChampions,
      guessedChampions,
    }),
    [testChampion, championList, isLoading, guessedChampions],
  );

  const AttemptsContextValue = useMemo(
    () => ({
      attempts,
      setAttempts,
    }),
    [attempts, setAttempts],
  );

  // Figure out the test champion, might have to move the api call logic into here.
  return (
    <ChampionContext.Provider value={ChampionContextValue}>
      <AttemptsContext.Provider value={AttemptsContextValue}>
        <SearchLockContext.Provider value={searchLockContextValue}>
          <GameContext.Provider value={gameContextValue}>
            {children}
          </GameContext.Provider>
        </SearchLockContext.Provider>
      </AttemptsContext.Provider>
    </ChampionContext.Provider>
  );
};

export default AppProviders;
