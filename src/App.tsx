import React, { useEffect, useState } from 'react';
import './App.css';
import SubmitButton from './components/SubmitButton';
import ChampionAnswer from './components/ChampionAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Champion, ChampionAnswerProps } from './type';
import { fetchChampions } from './utils/fetchChampions';


function App() {

  const [search, setSearchResults] = useState<Champion[]>([]);
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [champion, setChampion] = useState<Champion>({
    name: "",
    gender: "",
    cost: 0,
    type: "",
    chibi: "",
    attRange: 0,
  });

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionList(championsData);
      const champ = championsData[0];
      setChampion({
        name: champ.name,
        gender: champ.gender,
        cost: champ.cost,
        type: champ.type,
        chibi: champ.chibi,
        attRange: champ.attRange,
      })
    }
    
    getChampions();
  }, []);
  
  return (
    <>    
      <div className="App">
        <div className="container">
          <Header/>
          <SearchBar/>
          <ChampionAnswer 
            name={champion.name}
            gender={champion.gender}
            cost={champion.cost}
            type={champion.type}
            chibi={champion.chibi}
            attRange={champion.attRange}
          />
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
