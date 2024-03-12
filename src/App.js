import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import logo from './purpleair.png';
import './App.css'; 
import PurpleAirAPI from './PurpleAirAPI';
import PurpleAirWidget from './PurpleAirWidget'; 
import InteractiveMap from './InteractiveMap'; 

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
            {/* <Route path="/purple-air-widget" element={<PurpleAirWidget />} /> */}
            <Route path="/" element={<InteractiveMap />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
