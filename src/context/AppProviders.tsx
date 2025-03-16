import React, { useState, useMemo, useEffect } from "react";
import { ChampionContext } from "./ChampionContext.tsx";
import { GameContext } from "./GameContext.tsx";
import { AttemptsContext } from "./AttemptsContext.tsx";
import { SearchLockContext } from "./SearchLockContext.tsx";
import { Champion, Chibi } from "../type.ts";
import fetchClassicGameState from "../utils/fetchGameState.ts";
import fetchChibis from "../utils/fetchChibis.ts";
import { ChibiContext } from "./ChibiContext.tsx";

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
  const [chibiFinisherAnswer, setChibiFinisherAnswer] = useState<Chibi>();
  const [chibiList, setChibiList] = useState<Chibi[]>([]);
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [guessedChibis, setGuessedChibis] = useState<Chibi[]>([]);

  useEffect(() => {
    fetchClassicGameState(setChampionList, setTestChampion, setIsLoading);
  }, []);

  // logic on setting the chibi finisher ansswer here

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

  const ChibiContextValue = useMemo(
    () => ({
      chibiFinisherAnswer,
      setChibiFinisherAnswer,
      chibiList,
      guessedChibis,
      setGuessedChibis,
    }),
    [
      chibiFinisherAnswer,
      setChibiFinisherAnswer,
      chibiList,
      guessedChibis,
      setGuessedChibis,
    ],
  );

  // Fetch chibis from database
  useEffect(() => {
    const getChibis = async () => {
      const chibis = await fetchChibis();
      setChibiList(chibis);
    };
    getChibis();
  }, []);

  useEffect(() => {
    if (chibiList.length > 0) {
      setChibiFinisherAnswer(chibiList[randomIndex]);
    }
  }, [chibiList, randomIndex]);

  useEffect(() => {
    if (chibiList.length > 0) {
      // setRandomIndex(Math.floor(Math.random() * chibiListLength));
      setRandomIndex(25);
    }
  }, [chibiList]);

  // Figure out the test champion, might have to move the api call logic into here.
  return (
    <ChampionContext.Provider value={ChampionContextValue}>
      <ChibiContext.Provider value={ChibiContextValue}>
        <AttemptsContext.Provider value={AttemptsContextValue}>
          <SearchLockContext.Provider value={searchLockContextValue}>
            <GameContext.Provider value={gameContextValue}>
              {children}
            </GameContext.Provider>
          </SearchLockContext.Provider>
        </AttemptsContext.Provider>
      </ChibiContext.Provider>
    </ChampionContext.Provider>
  );
};

export default AppProviders;
