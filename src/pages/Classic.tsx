import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import confetti from "canvas-confetti";
import { useGame } from "../context/GameContext.tsx";
import { useSearchLock } from "../context/SearchLockContext.tsx";
import { useChampionContext } from "../context/ChampionContext.tsx";
import { useAttemptsContext } from "../context/AttemptsContext.tsx";
import GameHeader from "../components/GameHeader.tsx";
import GameEnd from "../components/GameEnd.tsx";
import SearchBar from "../components/SearchBar.tsx";
import ChampionAnswer from "../components/ChampionAnswer.tsx";
import HintsHelper from "../components/HintsHelper.tsx";
import AttributeHeader from "../components/AttributeHeader.tsx";
import findChampionByNameInTable from "../utils/findChampionByName.ts";
import fetchGuesses from "../utils/fetchGuesses.ts";

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

  useEffect(() => {
    if (!testChampion) return;

    const guessesFromStorage: string[] = JSON.parse(fetchGuesses())
      ? JSON.parse(fetchGuesses())
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
      {!isGameOver && <GameHeader />}
      {isGameOver ? (
        <GameEnd
          attempts={attempts}
          champIcon={testChampion?.imageurl}
          champName={testChampion?.name}
        />
      ) : (
        !isSearchLock && (
          <SearchBar
            championList={championList}
            guessedChampions={guessedChampions}
            setGuessedChampions={setGuessedChampions}
            setAttempts={setAttempts}
          />
        )
      )}
      {renderLoading()}
      {guessedChampions.map((champ) => (
        <ChampionAnswer
          key={champ.name}
          imageurl={champ.imageurl}
          name={champ.name}
          gender={champ.gender}
          cost={champ.cost}
          type={champ.type}
          traits={champ.traits}
          attRange={champ.attRange}
        />
      ))}
      <HintsHelper />
    </>
  );
};

export default ClassicPage;
