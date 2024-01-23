const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('https://api.purpleair.com/v1/sensors/196941?fields=humidity%2Ctemperature%2Cpressure%2Cpm2.5%2Clast_seen', {
            headers: {
                'X-API-Key': process.env.PURPLEAIR_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error in serverless function:", error);
        res.status(500).send('Server error: ' + error.message);
    }
};
