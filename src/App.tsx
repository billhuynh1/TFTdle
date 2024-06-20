import React, { useEffect, useState } from 'react';
import './App.css';
import SubmitButton from './components/SubmitButton';
import CharacterAnswer from './components/CharacterAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import supabase from './utils/supabaseClient';
import { Champion } from './type';


function App() {

  const [championsList, setChampionsList] = useState<Champion[]>([]);

  const fetchChampions = async (): Promise<Champion[]> => {
    const { data, error } = await supabase.from("champions").select("*");

    if (error) {
      throw error;
    }

    return data || [];
  }

  useEffect(() => {
    async function getChampions() {
      const championsData = await fetchChampions();
      setChampionsList(championsData);
      console.log(championsData);
    }
    
    getChampions();
  }, []);

  championsList.map(champ => (
    console.log(champ.name)
  ));


  return (
    <>    
      <div className="App">
        <div className="container">
          <Header/>
          <SearchBar/>
          <CharacterAnswer/>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
