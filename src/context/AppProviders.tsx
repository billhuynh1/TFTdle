import React, { useState, useMemo, useEffect } from "react";
import { ChampionContext } from "./ChampionContext.tsx";
import { GameContext } from "./GameContext.tsx";
import { AttemptsContext } from "./AttemptsContext.tsx";
import { SearchLockContext } from "./SearchLockContext.tsx";
import { LittleLegendContext } from "./LittleLegendContext.tsx";
import { Champion, Chibi, LittleLegend, Trait } from "../type.ts";
import fetchChibis from "../utils/fetchChibis.ts";
import { ChibiContext } from "./ChibiContext.tsx";
import usePolling from "../hooks/usePolling.ts";
import fetchChampions from "../utils/fetchChampions.ts";
import fetchLittleLegends from "../utils/fetchLittleLegends.ts";
import getDayOfYear from "../utils/getDayOfYear.ts";
import fetchTraits from "../utils/fetchTraits.ts";
import { TraitContext } from "./TraitContext.tsx";
import resetDailyData from "../utils/resetDailyData.ts";

interface AppProvidersProps {
  children: React.ReactNode;
}

// DONT FORGET TO CHANGE API BACKEND URL
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Traits
  const [traitList, setTraitList] = useState<Trait[]>([]);
  const [guessedTraits, setGuessedTraits] = useState<Trait[]>([]);
  const [traitAnswer, setTraitAnswer] = useState<Trait | undefined>(undefined);
  const [isTraitGameOver, setIsTraitGameOver] = useState<boolean>(false);
  const [traitIndex, setTraitIndex] = useState<number>(0);

  // Little Legend
  const [isLittleLegendGameOver, setIsLittleLegendGameOver] =
    useState<boolean>(false);
  const [littleLegendList, setLittleLegendList] = useState<LittleLegend[]>([]);
  const [guessedLittleLegends, setGuessedLittleLegends] = useState<
    LittleLegend[]
  >([]);
  const [littleLegendAnswer, setLittleLegendAnswer] = useState<LittleLegend>();
  const [littleLegendIndex, setLittleLegendIndex] = useState<number>(0);

  // Chibi
  const [chibiList, setChibiList] = useState<Chibi[]>([]);
  const [isFinisherGameOver, setIsFinisherGameOver] = useState<boolean>(false);
  const [chibiFinisherAnswer, setChibiFinisherAnswer] = useState<Chibi>();
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [guessedChibis, setGuessedChibis] = useState<Chibi[]>([]);

  // Champion
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isSearchLock, setIsSearchLock] = useState<boolean>(false);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [championIndex, setChampionIndex] = useState<number>(0);
  const [today, setToday] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [lastVisit, setLastVisit] = useState<string | null>(
    localStorage.getItem("lastVisit"),
  );

  // Cache champion list and chibi list

  const useDailyReset = (lastVisit: string | null, today: string): void => {
    useEffect(() => {
      if (!lastVisit || today === lastVisit) return;

      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      const finishedModes = localStorage.getItem("finishedModes");
      const allModes = ["/", "/finisher", "/littlelegend", "/trait"];
      const allCompleted = allModes.every((mode) =>
        finishedModes?.includes(mode),
      );

      if (lastVisit === yesterday && allCompleted) {
        const prevStreak = parseInt(localStorage.getItem("streak") || "0", 10);
        localStorage.setItem("streak", (prevStreak + 1).toString());
      } else {
        localStorage.setItem("streak", "0");
      }

      // Clear previous data
      if (today !== lastVisit) {
        setIsSearchLock(false);
        resetDailyData();
        localStorage.setItem("lastVisit", today);
      }
    }, [lastVisit, today]);
  };

  useDailyReset(lastVisit, today);

  usePolling();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [chibis, champs, littleLegends, traits] = await Promise.all([
          fetchChibis(),
          fetchChampions(),
          fetchLittleLegends(),
          fetchTraits(),
        ]);

        setChibiList(chibis);
        setChampionList(champs);
        setLittleLegendList(littleLegends);
        setTraitList(traits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  // Gets daily answers
  useEffect(() => {
    const dayOfYear = getDayOfYear(new Date());

    if (chibiList.length > 0) {
      const chibiIndex = dayOfYear % chibiList.length;
      setRandomIndex(chibiIndex);
      setChibiFinisherAnswer(chibiList[chibiIndex]);
    }

    if (championList.length > 0) {
      const champIndex = dayOfYear % championList.length;
      setChampionIndex(champIndex);
      setTestChampion(championList[champIndex]);
    }

    if (littleLegendList.length > 0) {
      const littleLegendIndex = dayOfYear % littleLegendList.length;
      setLittleLegendIndex(littleLegendIndex);
      setLittleLegendAnswer(littleLegendList[littleLegendIndex]);
    }

    if (traitList.length > 0) {
      const traitIndex = dayOfYear % traitList.length;
      setTraitIndex(traitIndex);
      setTraitAnswer(traitList[traitIndex]);
    }
  }, [chibiList, championList, littleLegendList, traitList]);

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

  const LittleLegendContextValue = useMemo(
    () => ({
      littleLegendAnswer,
      setLittleLegendAnswer,
      littleLegendList,
      guessedLittleLegends,
      setGuessedLittleLegends,
      isLittleLegendGameOver,
      setIsLittleLegendGameOver,
    }),
    [
      littleLegendAnswer,
      setLittleLegendAnswer,
      littleLegendList,
      guessedLittleLegends,
      setGuessedLittleLegends,
      isLittleLegendGameOver,
      setIsLittleLegendGameOver,
    ],
  );

  const TraitContextValue = useMemo(
    () => ({
      traitList,
      setTraitList,
      traitAnswer,
      setTraitAnswer,
      guessedTraits,
      setGuessedTraits,
      isTraitGameOver,
      setIsTraitGameOver,
    }),
    [
      traitList,
      setTraitList,
      traitAnswer,
      setTraitAnswer,
      guessedTraits,
      setGuessedTraits,
      isTraitGameOver,
      setIsTraitGameOver,
    ],
  );

  return (
    <ChampionContext.Provider value={ChampionContextValue}>
      <ChibiContext.Provider value={ChibiContextValue}>
        <LittleLegendContext.Provider value={LittleLegendContextValue}>
          <TraitContext.Provider value={TraitContextValue}>
            <AttemptsContext.Provider value={AttemptsContextValue}>
              <SearchLockContext.Provider value={searchLockContextValue}>
                <GameContext.Provider value={gameContextValue}>
                  {children}
                </GameContext.Provider>
              </SearchLockContext.Provider>
            </AttemptsContext.Provider>
          </TraitContext.Provider>
        </LittleLegendContext.Provider>
      </ChibiContext.Provider>
    </ChampionContext.Provider>
  );
};

export default AppProviders;
