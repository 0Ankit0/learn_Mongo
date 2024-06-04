//You need to install mongoose package before running this code
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
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