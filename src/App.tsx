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

  const [championsList, setChampionsList] = useState<Champion>();
  const [champId, setChampId] = useState<number | null>(null);
  const [champName, setChampName] = useState<string | null>(null);
  const [champGender, setChampGender] = useState<string | null>(null);
  const [champCost, setChampCost] = useState<number | null>(null);
  const [champType, setChampType] = useState<string | null>(null);
  const [champChibi, setChampChibi] = useState<string | null>(null);
  const [attRange, setAttRange] = useState<number | null>(null);

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      const champ = championsData[0];
      setChampionsList(champ);
      setChampName(champ.name);
      setChampGender(champ.gender);
      setChampCost(champ.cost);
      setChampType(champ.type);
      setChampChibi(champ.chibi);
      setAttRange(champ.attRange);
    }
    
    getChampions();
  }, []);
  
  
  // championsList.map(champ => (
  //   console.log(champ.name)
  // ));

  

  return (
    <>    
      <div className="App">
        <div className="container">
          <Header/>
          <SearchBar/>
          <ChampionAnswer 
            name={champName}
            gender={champGender}
            cost={champCost}
            type={champType}
            chibi={champChibi}
            attRange={attRange}
          />
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
