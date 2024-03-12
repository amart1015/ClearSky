import React from 'react';
import "./InteractiveMap.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const InteractiveMap = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSensorClick = (sensorId) => {
    // Navigate to PurpleAirAPI page with sensorId as a query parameter
    navigate(`/sensor-information?sensorId=${sensorId}`);
  };

  return (
    <div style={{ position: "relative", maxWidth: "100%", margin: "auto" }}>
        <p><b><i>Click a button on the map to view sensor information</i></b></p>
      <img
        src="/MMC-1.png"
        alt="Interactive Map"
        style={{ width: "100%", height: "auto" }}
      />
      <button
        onClick={() => handleSensorClick(1)}
        style={{ position: "absolute", top: "25%", left: "54%" }}
      >
        1
      </button>
      <button
        onClick={() => handleSensorClick(2)}
        style={{ position: "absolute", top: "50%", left: "24%" }}
      >
        2
      </button>
    </div>
  );
};

export default InteractiveMap;
