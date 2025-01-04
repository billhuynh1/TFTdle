import { useState, createContext, useContext } from "react";
import "./App.css";
import ChampionAnswer from "./components/ChampionAnswer.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { Champion } from "./type.ts";
import AttributeHeader from "./components/AttributeHeader.tsx";
import GameHeader from "./components/GameHeader.tsx";
import GameEnd from "./components/GameEnd.tsx";
import About from "./components/About.tsx";
import DiscordPopup from "./components/DiscordPopup.tsx";
import fetchGameState from "./utils/fetchGameState.ts";

const ChampionContext = createContext<Champion | null>(null);
const AttemptsContext = createContext<number>(0);
export const useAttemptsContext = () => useContext(AttemptsContext);
export const useChampionContext = () => useContext(ChampionContext);

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
  const resetTime: Date = new Date();
  resetTime.setHours(24, 0, 0, 0);

  // Need a loading spinner
  // Some confetti on correct
  // Broken images : Lee Sin and Tahm kench.
  // Create tables for previous sets.
  // Cache images

  window.onload = () => {
    fetchGameState(
      setSessionId,
      setChampionList,
      setGuessedChampions,
      setAttempts,
      setTestChampion,
      setIsLoading,
      setIsGameOver,
    );
  };

  const handleToggleAbout = () => {
    setIsAbout((isAbout) => !isAbout);
  };

  const handleToggleDiscordPopup = () => {
    setIsDiscordPopup((isDiscordPopup) => !isDiscordPopup);
  };

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
            {guessedChampions.length > 0 && !isLoading ? (
              <AttributeHeader />
            ) : (
              <div className="loading-spinner">LOADINGGG!!</div>
            )}
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
