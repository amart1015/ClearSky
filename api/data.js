const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('cluster0');
        const collection = database.collection('raspberryPI');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (e) {
        console.error("Error in serverless function:", e);
        res.status(500).send('Server error: ' + e.message);
    } finally {
        await client.close();
    }
};
