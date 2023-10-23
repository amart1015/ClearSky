import React from 'react';
import logo from './purpleair.png';
import './App.css';
import PurpleAirWidget from './PurpleAirWidget'; // Make sure the path is correct.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><b>ClearSky</b></p>
        <PurpleAirWidget />
      </header>
    </div>
  );
}

export default App;
