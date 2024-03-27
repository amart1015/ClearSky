import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from 'chart.js/auto';
import "./LineChart.css";

const LineChartComponent = ({ sensorId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "AQI",
        data: [], 
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        tension: 0.1,
        borderWidth: 2, 
      }
    ],
  });

  useEffect(() => {
    fetchPurpleAirHistoryData(sensorId); 
  }, [sensorId]); 

  const fetchPurpleAirHistoryData = async (sensorId) => {
    try {
      const response = await axios.get(`/api/purpleairhistory?sensorId=${sensorId}`);
      const { data } = response;
    
      if (data && Array.isArray(data.data)) {
        const dataArray = data.data;
  
        
        dataArray.sort((a, b) => a[0] - b[0]);
  
        const labels = dataArray.map(entry => {
          const date = new Date(entry[0] * 1000);
          const day = date.getDate();
          const suffix = getSuffix(day);
          const month = date.toLocaleString('default', { month: 'long' });
          return `${month} ${day}${suffix}`;
        });
        const aqiValues = dataArray.map(entry => aqiFromPM(entry[1]));

        setChartData({
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              label: "AQI",
              data: aqiValues,
            }
          ],
        });
      } else {
        console.error("Invalid data format received from API:", data);
      }
    } catch (error) {
      console.error("Error fetching PurpleAir data:", error);
    }
  };
  
  
  
  const getSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };  

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

  function calcAQI(Cp, Ih, Il, BPh, BPl) {
    var a = Ih - Il;
    var b = BPh - BPl;
    var c = Cp - BPl;
    return Math.round((a / b) * c + Il);
  }

  return (
    <div>
      <h3>Historical AQI Data</h3>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineChartComponent;
