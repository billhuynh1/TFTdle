import { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import ChampionAnswer from "./components/ChampionAnswer.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { Champion, ChampionGuess } from "./type.ts";
import { fetchChampions } from "./utils/fetchChampions.ts";
import AttributeHeader from "./components/AttributeHeader.tsx";
import GameHeader from "./components/GameHeader.tsx";
import GameEnd from "./components/GameEnd.tsx";
import About from "./components/About.tsx";
import DiscordPopup from "./components/DiscordPopup.tsx";
import fetchGuessedChampions from "./utils/fetchGuessedChampions.ts";
import findChampionByNameInTable from "./utils/findChampionByName.ts";

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
  const resetTime: Date = new Date();
  resetTime.setHours(24, 0, 0, 0);

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionList(championsData);
    }

    getChampions();
  }, []);

  useEffect(() => {
    const fetchDailyChampion = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/dailychamp");
        console.log("This is fetchdailychap response ", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const championData = await response.json();
        setTestChampion(championData);
        console.log("This is the daily champ", championData);
      } catch (error) {
        console.error("Error fetching daily champion:", error);
      }
    };

    if (testChampion === null) {
      fetchDailyChampion();
    }
  }, []);

  const handleToggleAbout = () => {
    setIsAbout((isAbout) => !isAbout);
  };

  const handleToggleDiscordPopup = () => {
    setIsDiscordPopup((isDiscordPopup) => !isDiscordPopup);
  };

  const getGuessedChampions = async () => {
    try {
      const response: Response = await fetch(
        "http://localhost:8080/guess/get",
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Get guess response : ", data);
      const championNamesFromResponse: string[] = data.map(
        (item: ChampionGuess) => item.champ,
      );
      const listOfChampionFromTable = await findChampionByNameInTable(
        championNamesFromResponse,
      );
      const champions = await fetchGuessedChampions(listOfChampionFromTable);
      console.log("champions", champions);
      setGuessedChampions([...champions]);
      setAttempts(champions.length);
    } catch (error) {
      console.error("Error retrieving champions from session", error);
    }
  };

  useEffect(() => {
    if (!guessedChampions.length) {
      getGuessedChampions();
    }
  }, []);

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
