import React, { useEffect, useState } from 'react';
import './App.css';
import ChampionAnswer from './components/ChampionAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Champion, ChampionAnswerProps } from './type';
import { fetchChampions } from './utils/fetchChampions';
import AttributeSquare from './components/AttributeSquare';


const attributeContents: string[] = ['Img','Champion', 'Gender', 'Cost', 'Type', 'Chibi',];

function App() {

  const [championList, setChampionList] = useState<Champion[]>([]);
  const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionList(championsData);
    }
    
    getChampions();
  }, []);
  
  useEffect(() => {
    console.log(guessedChampions);
  }, [guessedChampions]);

  return (
    <>    
      <div className="App">
        <div className="container fade-in">
          <Header/>
          <SearchBar 
            championList={championList}
            guessedChampions={guessedChampions}
            setGuessedChampions={setGuessedChampions}
            />
          
          <div className="guessed-container">
              { guessedChampions.length > 0 ?       
              <div className="attribute-container">
                  {attributeContents.map((content, index) => (
                  <AttributeSquare key={index} content={content}/>
                  ))}
              </div>
              : null}
            {
              guessedChampions.map((champ, index) => (<ChampionAnswer
                isAnimating={index === 0} 
                name={champ.name}
                gender={champ.gender}
                cost={champ.cost}
                type={champ.type}
                chibi={champ.chibi}
                attRange={champ.attRange}
              />))
            }
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
