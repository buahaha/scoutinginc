import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>Scouting Inc</code> corporation.
        </p>
        <a
          className="App-link"
          href="https://toscn.herokuapp.com"
          target="_toscn"
          rel="noopener noreferrer"
        >
          TOSCN - friendly industrialists and explorers
        </a>
        <a
          href="https://wiki.eveuniversity.org/"
          target="_uniwiki"
        >
          UNIWIKI
        </a>
        <a
          href="https://support.eveonline.com/hc/en-us"
          target="_support"
        >
          EVE Online Support  
        </a>
      </header>
    </div>
  );
}

export default App;
