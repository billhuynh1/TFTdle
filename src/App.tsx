import React, { useEffect, useState } from 'react';
import './App.css';
import SubmitButton from './components/SubmitButton';
import CharacterAnswer from './components/CharacterAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import supabase from './utils/supabaseClient';


function App() {
  const [champion, setChampion] = useState<any[] | null>(null);

  useEffect(() => {
    getChampion();
  }, []);

  async function getChampion() {
    const { data } = await supabase.from("Champions").select();
    setChampion(data);
  }

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
