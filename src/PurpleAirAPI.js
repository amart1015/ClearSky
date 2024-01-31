import React, { useState, useEffect } from 'react';
import './PurpleAirAPI.css';
import axios from 'axios';

const PurpleAirAPI = () => {
    const [data, setData] = useState(null);
    const [mongoDbData, setMongoDbData] = useState(null);

    // const data = {
    //     aqi: 50, // Replace with a static AQI value
    //     city: {
    //         name: "City Name", // Replace with a static city name
    //         location: "City Location", // Replace with a static location
    //     },
    //     sensor: {
    //         temperature: 84,
    //         humidity: 39,
    //         pressure: 1014.43,
    //         "pm2.5": 9,
    //         last_seen: 1700427745,
    //     }
    // };

    useEffect(() => {
        const fetchPurpleAirData = async () => {
            try {
                const response = await axios.get('/api/purpleair');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching PurpleAir data:", error);
            }
        };



        const fetchMongoDbData = async () => {
            try {
                const response = await axios.get('/api/data');
                setMongoDbData(response.data[0]);
            } catch (error) {
                console.error('Error fetching MongoDB data:', error);
            }
        };

        fetchPurpleAirData();
        fetchMongoDbData();
    }, []);


    if (!data || !mongoDbData) {
        document.body.style.backgroundColor = null;
        return (
        <div className="loading-container">
            Loading Air Quality Information...
            <div className="spinner"></div>
          </div>
        );
    }else{
        document.body.style.backgroundColor = colorAQI(aqiFromPM(data.sensor["pm2.5"]));
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
        var a = (Ih - Il);
        var b = (BPh - BPl);
        var c = (Cp - BPl);
        return Math.round((a/b) * c + Il);
    }

    function getAirQualityCategory(aqi) {
        if (aqi >= 0 && aqi <= 50) {
          return 'Good';
        } else if (aqi >= 51 && aqi <= 100) {
          return 'Moderate';
        } else if (aqi >= 101 && aqi <= 150) {
          return 'Unhealthy for Sensitive Groups';
        } else if (aqi >= 151 && aqi <= 200) {
          return 'Unhealthy';
        } else if (aqi >= 201 && aqi <= 300) {
          return 'Very Unhealthy';
        } else if (aqi >= 301 && aqi <= 500) {
          return 'Hazardous';
        } else {
          return 'Invalid AQI'; // For AQI values below 0 or above 500
        }
      }

    function getFfromC(c){
        return (c * 9/5) + 32
    }
    
    return (
    <div>
        <h2>Air Quality Information</h2>
        <p><strong>AQI:</strong> {aqi} [<i>{getAirQualityCategory(aqi)}</i>]</p>
        <div className="data-container">
            <div className="data-field">
                <p><strong>Temperature:</strong></p>
                <p>{getFfromC(mongoDbData.temperature)} °F</p>
            </div>
            <div className="data-field">
                <p><strong>Humidity:</strong></p>
                <p>{mongoDbData.humidity} %</p>
            </div>
            <div className="data-field">
                <p><strong>Pressure:</strong></p>
                <p>{data.sensor.pressure} mb</p>
            </div>
            <div className="data-field">
                <p><strong>PM2.5:</strong></p>
                <p>{data.sensor["pm2.5"]} ug/m3</p>
            </div>
        </div>
        <p><strong>Last Updated from PurpleAir API:</strong></p>
        <p>{new Date(data.sensor.last_seen * 1000).toLocaleString()}</p>
        <p><strong>Last Updated from Temp/Humidity Sensor:</strong></p>
        <p>{mongoDbData.last_seen}</p>
    </div>
);
}

export default PurpleAirAPI;
