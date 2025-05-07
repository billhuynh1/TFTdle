import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import confetti from "canvas-confetti";
import { useGame } from "../context/GameContext.tsx";
import { useSearchLock } from "../context/SearchLockContext.tsx";
import { useChampionContext } from "../context/ChampionContext.tsx";
import { useAttemptsContext } from "../context/AttemptsContext.tsx";
import GameHeader from "../components/GameHeader.tsx";
import GameEnd from "../components/GameEnd.tsx";
import ChampionAnswer from "../components/ChampionAnswer.tsx";
import HintsHelper from "../components/HintsHelper.tsx";
import AttributeHeader from "../components/AttributeHeader.tsx";
import findChampionByNameInTable from "../utils/findChampionByName.ts";
import SearchBars from "../components/SearchBars.tsx";
import Modes from "../components/Modes.tsx";
import Headers from "../components/Headers.tsx";

const ClassicPage: React.FC = () => {
  const [renderHints, setRenderHints] = useState<boolean>(false);
  const { isGameOver } = useGame();
  const { isSearchLock } = useSearchLock();
  const {
    championList,
    testChampion,
    guessedChampions,
    setGuessedChampions,
    isLoading,
  } = useChampionContext();
  const { attempts, setAttempts } = useAttemptsContext();
  const location = useLocation();
  const mode = location.pathname.replace("/", "");

  const fetchGuesses = (): string => {
    const guesses: string = localStorage.getItem(`${mode}_guesses`) || "";
    return guesses;
  };

  useEffect(() => {
    if (!testChampion) return;

    const storedGuesses: string | null = fetchGuesses();
    const guessesFromStorage: string[] = storedGuesses
      ? JSON.parse(storedGuesses)
      : [];
    const updateGuesses = async (champs: string[]) => {
      const guesses = findChampionByNameInTable(champs, championList);
      await setGuessedChampions(guesses);
      await setAttempts(guesses.length);
    };
    updateGuesses(guessesFromStorage);
  }, [testChampion, championList]);

  useEffect(() => {
    setAttempts(guessedChampions.length);
  }, [guessedChampions]);

  // Util function to show confetti
  const showConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 0.5 } });
  };

  if (isGameOver) {
    showConfetti();
  }

  const renderLoading = (): React.JSX.Element | null => {
    if (isLoading && !testChampion) {
      return (
        <>
          <ClipLoader
            className="loader"
            aria-label="Loading data"
            size={50}
            color="white"
            speedMultiplier={0.5}
          />
          <span style={{ color: "white", zIndex: "2" }}>
            Give it a second...
          </span>
        </>
      );
    }

    if (guessedChampions.length > 0) {
      return <AttributeHeader />;
    }

    return null;
  };

  useEffect(() => {
    if (guessedChampions.length > 0) {
      setRenderHints(true);
    }
  }, [guessedChampions]);

  return (
    <>
      <Modes />
      <Headers />
      <GameHeader />
      {!isGameOver ? (
        <SearchBars
          items={championList}
          guessedItems={guessedChampions}
          setGuessedItems={setGuessedChampions}
          setAttempts={setAttempts}
          pathForImages="champions_set_13_assets"
        />
      ) : null}
      {renderLoading()}
      {guessedChampions.map((champ) => (
        <ChampionAnswer
          key={champ.name}
          imageUrl={champ.imageUrl}
          name={champ.name}
          gender={champ.gender}
          cost={champ.cost}
          type={champ.type}
          traits={champ.traits}
          attRange={champ.attRange}
        />
      ))}
      {isGameOver && (
        <GameEnd
          attempts={attempts}
          champIcon={testChampion?.imageUrl}
          champName={testChampion?.name}
        />
      )}
      <HintsHelper />
    </>
  );
};

export default ClassicPage;
