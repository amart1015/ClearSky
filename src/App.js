import React from 'react';
import logo from './purpleair.png';
import './App.css'; 
import PurpleAirAPI from './PurpleAirAPI';
import PurpleAirWidget from './PurpleAirWidget'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><b>ClearSky</b></p>
        <PurpleAirAPI />
        {/* <PurpleAirWidget /> */}
      </header>
    </div>
  );
}

export default App;