import React from 'react';
import './App.css';
import SubmitButton from './components/SubmitButton';
import CharacterAnswer from './components/CharacterAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import supabase from './utils/supabaseClient';



function App() {
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
