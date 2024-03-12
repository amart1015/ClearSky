import React, { useEffect } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    
    return () => {
      document.body.style.backgroundColor = 'white';
    };
  }, []);

  const handleSensorClick = (sensorId) => {
    navigate(`/sensor-information?sensorId=${sensorId}`);
  };

  return (
    <div className="landing-container">
      <p>
        <b>
          <i>Select which sensor you would like to view</i>
        </b>
      </p>
      <button className="button-1" onClick={() => handleSensorClick(196941)}>
        PCA - Paul Cejas Architecture Building
      </button>
    </div>
  );
};

export default Landing;
