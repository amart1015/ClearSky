import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import "./LineChart.css";


const LineChartComponent = () => {
  // Set initial fake data for the line chart
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "AQI",
        data: [50, 100, 150, 200, 250, 300], // Fake AQI values
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        tension: 0.1,
        borderWidth: 2, 
      }
    ],
  });

  // You can use useEffect to update this data when your API call is made
  useEffect(() => {
    // Here you would make your API call and update the state with the new data
    // For the sake of this example, we're using the static data defined above
  }, []);

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