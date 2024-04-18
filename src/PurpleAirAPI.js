import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PurpleAirAPI.css";
import axios from "axios";
import Popup from "reactjs-popup";
import LineChart from './LineChart'; 
import "reactjs-popup/dist/index.css";

const PurpleAirAPI = () => {
  const [data, setData] = useState(null);
  const [mongoDbData, setMongoDbData] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search);
  const sensorId = searchParams.get("sensorId");

  // const data = {
  //   aqi: 50, // Replace with a static AQI value
  //   city: {
  //     name: "City Name", // Replace with a static city name
  //     location: "City Location", // Replace with a static location
  //   },
  //   sensor: {
  //     temperature: 84,
  //     humidity: 39,
  //     pressure: 1014.43,
  //     "pm2.5": 10,
  //     last_seen: 1707873004,
  //   },
  // };

  useEffect(() => {
    const fetchPurpleAirData = async (sensorId) => {
        try {
            const response = await axios.get(`/api/purpleair?sensorId=${sensorId}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching PurpleAir data:", error);
        }
    };    

    const fetchMongoDbData = async () => {
      try {
        const response = await axios.get("/api/data");
        setMongoDbData(response.data[0]);
      } catch (error) {
        console.error("Error fetching MongoDB data:", error);
      }
    };


    fetchPurpleAirData(sensorId);
    fetchMongoDbData();
  }, [sensorId]);

  if (!data || !mongoDbData) {
    document.body.style.backgroundColor = null;
    return (
      <div className="loading-container">
        Loading Air Quality Information...
        <div className="spinner"></div>
      </div>
    );
  } else {
    document.body.style.backgroundColor = colorAQI(
      aqiFromPM(data.sensor["pm2.5"])
    );
  }

  const aqi = aqiFromPM(data.sensor["pm2.5"]);
  function aqiFromPM(pm) {
    if (isNaN(pm)) return "-";
    if (pm === undefined) return "-";
    if (pm < 0) return pm;
    if (pm > 1000) return "-";
    if (pm > 350.5) {
      return calcAQI(pm, 500, 401, 500.4, 350.5);
    } else if (pm > 250.5) {
      return calcAQI(pm, 400, 301, 350.4, 250.5);
    } else if (pm > 150.5) {
      return calcAQI(pm, 300, 201, 250.4, 150.5);
    } else if (pm > 55.5) {
      return calcAQI(pm, 200, 151, 150.4, 55.5);
    } else if (pm > 35.5) {
      return calcAQI(pm, 150, 101, 55.4, 35.5);
    } else if (pm > 12.1) {
      return calcAQI(pm, 100, 51, 35.4, 12.1);
    } else if (pm >= 0) {
      return calcAQI(pm, 50, 0, 12, 0);
    } else {
      return undefined;
    }
  }

  function colorAQI(aqi) {
    const transparency = 0.5;

    if (aqi >= 0 && aqi <= 50) {
      return `rgba(0, 128, 0, ${transparency})`;
    } else if (aqi >= 51 && aqi <= 100) {
      return `rgba(255, 255, 0, ${transparency})`;
    } else if (aqi >= 101 && aqi <= 150) {
      return `rgba(255, 165, 0, ${transparency})`;
    } else if (aqi >= 151 && aqi <= 200) {
      return `rgba(255, 0, 0, ${transparency})`;
    } else if (aqi >= 201 && aqi <= 300) {
      return `rgba(128, 0, 128, ${transparency})`;
    } else if (aqi >= 301 && aqi <= 500) {
      return `rgba(128, 0, 0, ${transparency})`;
    } else {
      return `rgba(0, 0, 0, ${transparency})`;
    }
  }

  function calcAQI(Cp, Ih, Il, BPh, BPl) {
    var a = Ih - Il;
    var b = BPh - BPl;
    var c = Cp - BPl;
    return Math.round((a / b) * c + Il);
  }

  function getAirQualityCategory(aqi) {
    if (aqi >= 0 && aqi <= 50) {
      return "Good";
    } else if (aqi >= 51 && aqi <= 100) {
      return "Moderate";
    } else if (aqi >= 101 && aqi <= 150) {
      return "Unhealthy for Sensitive Groups";
    } else if (aqi >= 151 && aqi <= 200) {
      return "Unhealthy";
    } else if (aqi >= 201 && aqi <= 300) {
      return "Very Unhealthy";
    } else if (aqi >= 301 && aqi <= 500) {
      return "Hazardous";
    } else {
      return "Invalid AQI"; 
    }
  }

  function getFfromC(c) {
    return (c * 9) / 5 + 32;
  }

  return (
    <div>
      <h2>Air Quality Information</h2>
      <p>For Sensor: {sensorId}</p>
      <p>
        <strong>
          <Popup
            trigger={
              <button
                type="button"
                className="btTxt submit transparent-button"
                id="saveForm"
              >
                <div className="button-content">
                  <img
                    src="/information-button.png"
                    alt="Save Form"
                    style={{ width: "13px", height: "13px" }} 
                  />
                </div>
              </button>
            }
            position="right center"
            on="hover"
          >
            <div>
              <p>
                The Air Quality Index (AQI) is a numerical scale used to measure
                and communicate the level of air pollution in a specific area,
                indicating the potential health impacts on individuals exposed
                to the air.
              </p>
            </div>
          </Popup>
          AQI:
        </strong>{" "}
        {aqi} [
        <i>
          {getAirQualityCategory(aqi)}{" "}
          <Popup
            trigger={
              <button
                type="button"
                className="btTxt submit transparent-button"
                id="saveForm"
              >
                <div className="button-content">
                  <img
                    src="/information-button.png"
                    alt="Save Form"
                    style={{ width: "15px", height: "15px" }} 
                  />
                </div>
              </button>
            }
            position="left center"
            on="hover"
          >
            <div style={{ maxWidth: "100%", height: "auto" }}>
              <img
                src="/AQI-Graphic.png"
                alt="AQI Graphic"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </Popup>
        </i>
        ]{" "}
      </p>
      <div className="data-container">
        <div className="data-field">
        <p>
          <strong>Temperature:</strong>
        </p>
        {
          sensorId === '196941' ? (
            <p>{data.sensor.temperature-8} °F</p> 
          ) : (
            <p>{Math.round(getFfromC(mongoDbData.temperature))} °F</p> 
          )
        }
          <div className="last-updated-container">
            <p style={{ fontSize: "14px" }}>Last Updated:</p>
            {
                sensorId === '196941' ? (
                  <p style={{ fontSize: "14px" }}>
                    {new Date(data.sensor.last_seen * 1000).toLocaleString()}
                  </p>
                ) : (
                  <p style={{ fontSize: "14px" }}>{mongoDbData.last_seen}</p>
                )
              }
          </div>
        </div>
        <div className="data-field">
          <p>
            <strong>Humidity:</strong>
          </p>
          {
          sensorId === '196941' ? (
            <p>{Math.round(data.sensor.humidity * 1.55)} %</p> 
          ) : (
            <p>{mongoDbData.humidity} %</p> 
          )
        }
          <div className="last-updated-container">
            <p style={{ fontSize: "14px" }}>Last Updated:</p>
            {
                sensorId === '196941' ? (
                  <p style={{ fontSize: "14px" }}>
                    {new Date(data.sensor.last_seen * 1000).toLocaleString()}
                  </p>
                ) : (
                  <p style={{ fontSize: "14px" }}>{mongoDbData.last_seen}</p>
                )
              }
          </div>
        </div>
        <div className="data-field">
          <p>
            <strong>Pressure:</strong>
          </p>
          <p>{data.sensor.pressure} mb</p>
          <div className="last-updated-container">
            <p style={{ fontSize: "14px" }}>Last Updated:</p>
            <p style={{ fontSize: "14px" }}>
              {new Date(data.sensor.last_seen * 1000).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="data-field">
          <p>
            <strong>PM2.5:</strong>
          </p>
          <p>{data.sensor["pm2.5"]} ug/m3</p>
          <div className="last-updated-container">
            <p style={{ fontSize: "14px" }}>Last Updated:</p>
            <p style={{ fontSize: "14px" }}>
              {new Date(data.sensor.last_seen * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {showChart && <LineChart sensorId={sensorId} />}
      <button
        className="button-17"
        style={{ backgroundColor: aqi !== undefined ? colorAQI(aqi) : "white" }}
        onClick={() => {
          setShowChart(!showChart);
          if (!showChart) {
            setTimeout(() => {
              window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: 'smooth'
              });
            }, 0); 
          }
        }}
      >
        {showChart ? "Hide Chart" : "Show More"}
      </button>
    </div>
    
  );
};

export default PurpleAirAPI;
