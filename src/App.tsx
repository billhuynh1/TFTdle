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
import { Champion, GameContextType, SearchLockContextType } from "./type.ts";
import AttributeHeader from "./components/AttributeHeader.tsx";
import GameHeader from "./components/GameHeader.tsx";
import GameEnd from "./components/GameEnd.tsx";
import About from "./components/About.tsx";
import DiscordPopup from "./components/DiscordPopup.tsx";
import HintsHelper from "./components/HintsHelper.tsx";
import fetchGameState from "./utils/fetchGameState.ts";
import fetchGuesses from "./utils/fetchGuesses.ts";
import findChampionByNameInTable from "./utils/findChampionByName.ts";
import Modes from "./components/Modes.tsx";

const ChampionContext = createContext<Champion | null>(null);
const GameContext = createContext<GameContextType | null>(null);
const AttemptsContext = createContext<number>(0);
const SearchLockContext = createContext<SearchLockContextType | null>(null);
export const useAttemptsContext = () => useContext(AttemptsContext);
export const useChampionContext = () => useContext(ChampionContext);
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
export const useSearchLock = (): SearchLockContextType => {
  const context = useContext(SearchLockContext);
  if (!context) {
    throw new Error(
      "useSearchLockContext must be used within a SearchLockProvider",
    );
  }
  return context;
};

function App() {
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isSearchLock, setIsSearchLock] = useState<boolean>(false);
  const [renderAbout, setrenderAbout] = useState<boolean>(false);
  const [renderDiscordPopup, setrenderDiscordPopup] = useState<boolean>(false);
  const [renderHints, setRenderHints] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string>("");
  const [searchLock, setSearchLock] = useState<boolean>(false);
  const [today, setToday] = useState<string>(new Date().toDateString());
  const [lastVisit, setLastVisit] = useState<string | null>(() => {
    const storedDate = localStorage.getItem("lastVisit");
    if (storedDate === null) {
      localStorage.setItem("lastVisit", today);
      return today;
    }
    return storedDate;
  });

  const contextValue = useMemo(
    () => ({ isGameOver, setIsGameOver, isSearchLock, setIsSearchLock }),
    [searchLock, isGameOver, setSearchLock, setIsGameOver, setIsSearchLock],
  );

  // Update Game end component
  useEffect(() => {
    fetchGameState(setChampionList, setTestChampion, setIsLoading);
  }, []);

  const useDailyReset = (): void => {
    useEffect(() => {
      if (today !== lastVisit) {
        setSearchLock(false);
        localStorage.clear();
        localStorage.setItem("lastVisit", today);
      }
    }, []);
  };

  useDailyReset();

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
  }, [guessedChampions]);

  const showConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 0.5 } });
  };

  if (isGameOver) {
    showConfetti();
  }

  const handleToggleAbout = () => {
    setrenderAbout((renderAbout) => !renderAbout);
  };

  const handleToggleDiscordPopup = () => {
    setrenderDiscordPopup((renderDiscordPopup) => !renderDiscordPopup);
  };

  const renderLoading = (): React.JSX.Element | null => {
    if (isLoading) {
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

  const usePolling = () => {
    useEffect(() => {
      const checkReset = () => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          localStorage.clear();
          alert("New daily! Please refresh the page.");
        }
      };

      const interval = setInterval(checkReset, 60 * 1000);

      return () => clearInterval(interval);
    }, []);
  };

  usePolling();

  return (
    <div className="App">
      <div className="background-container">
        <Header />
        <div className="container">
          <Modes />
          <ChampionContext.Provider value={testChampion}>
            <AttemptsContext.Provider value={attempts}>
              <SearchLockContext.Provider value={contextValue}>
                <GameContext.Provider value={contextValue}>
                  {!isGameOver ? <GameHeader /> : null}
                  {isGameOver ? (
                    <GameEnd
                      attempts={attempts}
                      champIcon={testChampion?.imageurl}
                      champName={testChampion?.name}
                    />
                  ) : (
                    !isSearchLock && ( // Only render SearchBar if isSearchLock is false
                      <SearchBar
                        championList={championList}
                        guessedChampions={guessedChampions}
                        correctChampion={testChampion}
                        sessionId={sessionId}
                        setGuessedChampions={setGuessedChampions}
                        setAttempts={setAttempts}
                        setIsGameOver={setIsGameOver}
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
                </GameContext.Provider>
              </SearchLockContext.Provider>
            </AttemptsContext.Provider>
          </ChampionContext.Provider>

          {renderHints && <HintsHelper />}

          <Footer
            handleToggleAbout={handleToggleAbout}
            handleToggleDiscordPopup={handleToggleDiscordPopup}
          />
          <span className="website">tft-dle.com - 2025</span>
          {renderAbout && <About handleToggleAbout={handleToggleAbout} />}
          {renderDiscordPopup && <DiscordPopup />}
        </div>
      </div>
    </div>
  );
}

export default App;
