import React, { useEffect, useState, createContext, useContext } from 'react';
import './App.css';
import ChampionAnswer from './components/ChampionAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Champion, ChampionAnswerProps } from './type';
import { fetchChampions } from './utils/fetchChampions';
import AttributeSquare from './components/AttributeSquare';
import AttributeHeader from './components/AttributeHeader';

const attributeContents: string[] = ['Img','Champion', 'Gender', 'Cost', 'Type', 'Chibi', 'Attack Range'];
const ChampionContext = createContext<Champion | null>(null);
export const useChampionContext = () => useContext(ChampionContext);

function App() {

  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [testChampion, setTestChampion] = useState<Champion | null>(null);

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionList(championsData);
      setTestChampion(championsData[12]);
    }
    
    getChampions();
  }, []);
  
  console.log(testChampion);
  
  return (
    <>    
      <div className="App">
        <div className="container fade-in">
          <Header />
          <SearchBar 
            championList={championList}
            guessedChampions={guessedChampions}
            setGuessedChampions={setGuessedChampions}
          />
          <ChampionContext.Provider value={testChampion}>
            {guessedChampions.length > 0 ? <AttributeHeader /> : null}
            {guessedChampions.map((champ, index) => (
              <ChampionAnswer
                key={index}
                isAnimating={index === 0} 
                imageUrl='placeholder'
                name={champ.name}
                gender={champ.gender}
                cost={champ.cost}
                type={champ.type}
                chibi={champ.chibi}
                attRange={champ.attRange}
              />
            ))}
          </ChampionContext.Provider>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
