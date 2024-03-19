const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { sensorId } = req.query; 

        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const currentTimeStamp = Math.floor(currentDate.getTime() / 1000);
        const sevenDaysAgoTimeStamp = currentTimeStamp - (7 * 24 * 60 * 60);

        
        const response = await axios.get(`https://api.purpleair.com/v1/sensors/${sensorId}/history`, {
            headers: {
                'X-API-Key': process.env.PURPLEAIR_API_KEY
            },
            params: {
                start_timestamp: sevenDaysAgoTimeStamp,
                end_timestamp: currentTimeStamp,
                average: 1440,
                fields: 'pm2.5_atm'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error in serverless function:", error);
        res.status(500).send('Server error: ' + error.message);
    }
};
