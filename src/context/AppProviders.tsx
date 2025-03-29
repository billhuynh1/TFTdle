import React, { useState, useMemo, useEffect } from "react";
import { ChampionContext } from "./ChampionContext.tsx";
import { GameContext } from "./GameContext.tsx";
import { AttemptsContext } from "./AttemptsContext.tsx";
import { SearchLockContext } from "./SearchLockContext.tsx";
import { Champion, Chibi } from "../type.ts";
import fetchChibis from "../utils/fetchChibis.ts";
import { ChibiContext } from "./ChibiContext.tsx";
import usePolling from "../hooks/usePolling.ts";
import fetchChampions from "../utils/fetchChampions.ts";

interface AppProvidersProps {
  children: React.ReactNode;
}

// DONT FORGET TO CHANGE API BACKEND URL
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isFinisherGameOver, setIsFinisherGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isSearchLock, setIsSearchLock] = useState<boolean>(false);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [chibiFinisherAnswer, setChibiFinisherAnswer] = useState<Chibi>();
  const [chibiList, setChibiList] = useState<Chibi[]>([]);
  // Need to change name of random index
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [guessedChibis, setGuessedChibis] = useState<Chibi[]>([]);
  const [championIndex, setChampionIndex] = useState<number>(0);
  const [today, setToday] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [lastVisit, setLastVisit] = useState<string | null>(() => {
    const storedDate = localStorage.getItem("lastVisit");
    if (storedDate === null) {
      localStorage.setItem("lastVisit", today);
      return today;
    }
    return storedDate;
  });

  // Cache champion list and chibi list

  const useDailyReset = (): void => {
    useEffect(() => {
      if (today !== lastVisit) {
        setIsSearchLock(false);
        localStorage.removeItem("guesses");
        localStorage.removeItem("finisher_guesses");
        localStorage.setItem("lastVisit", today);
      }
    }, [today, lastVisit]);
  };

  useDailyReset();

  usePolling();

  // Fetch chibis from database
  useEffect(() => {
    const getChibis = async () => {
      const chibis = await fetchChibis();
      setChibiList(chibis);
    };
    getChibis();
  }, []);

  // Fetch champs from database
  useEffect(() => {
    const getChamps = async () => {
      const champs = await fetchChampions();
      setChampionList(champs);
    };
    getChamps();
  }, []);

  const getDayOfYear = (date: Date): number => {
    const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear; // Milliseconds since Jan 1st
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert to days
  };

  // Gets daily finisher answer
  useEffect(() => {
    if (chibiList.length > 0) {
      setRandomIndex(getDayOfYear(new Date()) % chibiList.length);
    }
  }, [chibiList]);

  useEffect(() => {
    if (championList.length > 0) {
      setChampionIndex(getDayOfYear(new Date()) % championList.length);
    }
  }, [championList]);

  useEffect(() => {
    setChibiFinisherAnswer(chibiList[randomIndex]);
  }, [randomIndex]);

  useEffect(() => {
    // fetchClassicGameState(setChampionList, setTestChampion, setIsLoading);
    setTestChampion(championList[championIndex]);
  }, [championIndex]);

  const gameContextValue = useMemo(
    () => ({
      isGameOver,
      setIsGameOver,
      isFinisherGameOver,
      setIsFinisherGameOver,
      randomIndex,
      setRandomIndex,
    }),
    [
      isGameOver,
      setIsGameOver,
      isFinisherGameOver,
      setIsFinisherGameOver,
      randomIndex,
      setRandomIndex,
    ],
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
