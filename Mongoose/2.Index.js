import connect from './Connection.js';
import * as dotenv from 'dotenv';// Import the dotenv module
dotenv.config();

connect()
    .then(() => {
        console.log('Successfully connected to the database');
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on port ' + process.env.PORT);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });

