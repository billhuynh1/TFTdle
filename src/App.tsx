import React from 'react';
import './App.css';
import CharacterGuess from './components/CharacterGuess';
import CharacterAnswer from './components/CharacterAnswer';

function App() {
  return (
    <>    
      <div className="App">
        <div className="container">
          <div className="title">TFTDLE</div>
          <CharacterGuess/>
          <CharacterAnswer/>
        </div>
      </div>
    </>
  );
}

export default App;
