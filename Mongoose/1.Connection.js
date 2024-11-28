//You need to install mongoose package before running this code
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import the dotenv module to read the .env file
dotenv.config();

async function connectWithRetry(uri, options) {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await mongoose.connect(uri, options);
            console.log('Connected to MongoDB');
            return;
        } catch (err) {
            retries++;
            console.error(`Failed to connect to MongoDB (attempt ${retries}):`, err);
            if (retries < maxRetries) {
                console.log('Retrying connection...');
                await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds before retrying
            } else {
                console.error('Max retries reached. Could not connect to MongoDB.');
                throw err;
            }
        }
    }
}

const uri = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

connectWithRetry(uri, options)
    .then(() => {
        // Connection successful, proceed with your operations
    })
    .catch(err => {
        console.error('Connection failed:', err);
    });

