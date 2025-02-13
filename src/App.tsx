import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { ClipLoader } from "react-spinners";
import ChampionAnswer from "./components/ChampionAnswer.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { Champion, GameContextType } from "./type.ts";
import AttributeHeader from "./components/AttributeHeader.tsx";
import GameHeader from "./components/GameHeader.tsx";
import GameEnd from "./components/GameEnd.tsx";
import About from "./components/About.tsx";
import DiscordPopup from "./components/DiscordPopup.tsx";
import fetchGameState from "./utils/fetchGameState.ts";
import fetchGuesses from "./utils/fetchGuesses.ts";
import findChampionByNameInTable from "./utils/findChampionByName.ts";

const ChampionContext = createContext<Champion | null>(null);
const GameContext = createContext<GameContextType | null>(null);
const AttemptsContext = createContext<number>(0);
export const useAttemptsContext = () => useContext(AttemptsContext);
export const useChampionContext = () => useContext(ChampionContext);
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

function App() {
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isAbout, setIsAbout] = useState<boolean>(false);
  const [isDiscordPopup, setIsDiscordPopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string>("");
  const contextValue = useMemo(
    () => ({ isGameOver, setIsGameOver }),
    [isGameOver, setIsGameOver],
  );
  const resetTime: Date = new Date();
  resetTime.setHours(24, 0, 0, 0);

  useEffect(() => {
    fetchGameState(setChampionList, setTestChampion, setIsLoading);
  }, []);

  // Poll to compare current time to reset time, clear localStorage at midnight.

  useEffect(() => {
    if (!testChampion) return;

    const guessesFromStorage: string[] = JSON.parse(fetchGuesses());
    const updateGuesses = async (champs: string[]) => {
      const guesses = findChampionByNameInTable(champs, championList);
      await setGuessedChampions(guesses);
      await setAttempts(guesses.length);
    };
    updateGuesses(guessesFromStorage);
  }, [testChampion]);

  useEffect(() => {
    setAttempts(guessedChampions.length);
    console.log(localStorage.getItem("guesses"));
  }, [guessedChampions]);

  const showConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 0.5 } });
  };

  if (isGameOver) {
    showConfetti();
  }

  const handleToggleAbout = () => {
    setIsAbout((isAbout) => !isAbout);
  };

  const handleToggleDiscordPopup = () => {
    setIsDiscordPopup((isDiscordPopup) => !isDiscordPopup);
  };

  const renderLoading = (): React.JSX.Element | null => {
    if (isLoading) {
      return (
        <ClipLoader
          aria-label="Loading data"
          size={50}
          color="white"
          speedMultiplier={0.5}
        />
      );
    }
    if (guessedChampions.length > 0) {
      return <AttributeHeader />;
    }
    return null;
  };

  console.log(isGameOver);

  return (
    <div className="App">
      <div className="background-container">
        <Header />
        <div className="container">
          <ChampionContext.Provider value={testChampion}>
            <AttemptsContext.Provider value={attempts}>
              {!isGameOver ? <GameHeader /> : null}
              {isGameOver ? (
                <GameEnd
                  attempts={attempts}
                  champIcon={testChampion?.imageurl}
                  champName={testChampion?.name}
                />
              ) : (
                <SearchBar
                  championList={championList}
                  guessedChampions={guessedChampions}
                  correctChampion={testChampion}
                  sessionId={sessionId}
                  setGuessedChampions={setGuessedChampions}
                  setAttempts={setAttempts}
                  setIsGameOver={setIsGameOver}
                />
              )}
            </AttemptsContext.Provider>
            <GameContext.Provider value={contextValue}>
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
            </GameContext.Provider>
          </ChampionContext.Provider>
          <Footer
            handleToggleAbout={handleToggleAbout}
            handleToggleDiscordPopup={handleToggleDiscordPopup}
          />
          {isAbout && <About handleToggleAbout={handleToggleAbout} />}
          {isDiscordPopup && <DiscordPopup />}
        </div>
      </div>
    </div>
  );
}

export default App;
