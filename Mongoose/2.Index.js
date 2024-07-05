import connect from './Connection.js';
import * as dotenv from 'dotenv';// Import the dotenv module
import app from './3.1.extendedRoute.js';// Import the app from the extendedRoute.js file

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

