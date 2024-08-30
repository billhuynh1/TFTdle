import { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import ChampionAnswer from "./components/ChampionAnswer.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { Champion } from "./type.ts";
import { fetchChampions } from "./utils/fetchChampions.ts";
import AttributeHeader from "./components/AttributeHeader.tsx";
import GameHeader from "./components/GameHeader.tsx";
import GameEnd from "./components/GameEnd.tsx";
import About from "./components/About.tsx";

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

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionList(championsData);
      setTestChampion(championsData[3]);
    }

    getChampions();
  }, []);

  const handleToggleAbout = () => {
    setIsAbout((isAbout) => !isAbout);
    console.log(isAbout);
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
                  setGuessedChampions={setGuessedChampions}
                  setAttempts={setAttempts}
                  setIsGameOver={setIsGameOver}
                />
              )}
            </AttemptsContext.Provider>
            {guessedChampions.length > 0 ? <AttributeHeader /> : null}
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
          <Footer handleToggleAbout={handleToggleAbout} />
          {isAbout && <About handleToggleAbout={handleToggleAbout} />}
        </div>
      </div>
    </div>
  );
}

export default App;
