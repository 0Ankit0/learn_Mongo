//You need to install mongoose package before running this code
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import the dotenv module to read the .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Your code here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });