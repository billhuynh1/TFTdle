import React, { useEffect, useState } from 'react';
import './App.css';
import SubmitButton from './components/SubmitButton';
import CharacterAnswer from './components/CharacterAnswer';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
// import supabase from './utils/supabaseClient';
import { createClient } from "@supabase/supabase-js";



function App() {
  const supabaseUrl = "https://fwimlkxoggqhamjejeuz.supabase.co";
  const supebaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3aW1sa3hvZ2dxaGFtamVqZXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNTQ2NTQsImV4cCI6MjAzMzczMDY1NH0.nWOGoM3-rFH5CXoSnT2YCyPyUhxnAN-X78Y-YHCMHGE";
  const supabase = createClient(supabaseUrl, supebaseAnonKey);

  useEffect(() => {
    async function getChampions() {
      const { data } = await supabase.from("champions").select();
      const championName = await supabase.from("champions").select("name");

      console.log(data);
    }
        
    getChampions();
  }, []);

  async function getChampName() {
    const champName = await supabase.from("champions").select("name");
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
