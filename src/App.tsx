import { useEffect, useState, createContext, useContext } from 'react';
import './App.css';
import ChampionAnswer from './components/ChampionAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Champion } from './type';
import { fetchChampions } from './utils/fetchChampions';
import AttributeHeader from './components/AttributeHeader';
import GameHeader from './components/GameHeader';

const ChampionContext = createContext<Champion | null>(null);
const AttemptsContext = createContext<number>(0);
export const useAttmptsContext = () => useContext(AttemptsContext);
export const useChampionContext = () => useContext(ChampionContext);

function App() {

  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionList(championsData);
      setTestChampion(championsData[15]);
    }
    
    getChampions();
  }, []);

  return (
    <>    
      <div className="App">
        <div className="background-container">
        <Header/>
          <div className="container">
          <GameHeader/>
            <SearchBar 
              championList={championList}
              guessedChampions={guessedChampions}
              setGuessedChampions={setGuessedChampions}
            />
            <ChampionContext.Provider value={testChampion}>
              {guessedChampions.length > 0 ? <AttributeHeader /> : null}
              {guessedChampions.map((champ) => (
                <ChampionAnswer
                  key={champ.name}
                  imageurl={champ.imageurl}
                  name={champ.name}
                  gender={champ.gender}
                  cost={champ.cost}
                  type={champ.type}
                  chibi={champ.chibi}
                  attRange={champ.attRange}
                />
              ))}
            </ChampionContext.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
