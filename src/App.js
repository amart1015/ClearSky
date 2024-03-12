import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './purpleair.png';
import './App.css'; 
import PurpleAirAPI from './PurpleAirAPI';
import Landing from './Landing'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <p><b>ClearSky</b></p>
          <Routes>
            <Route path="/sensor-information" element={<PurpleAirAPI />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
