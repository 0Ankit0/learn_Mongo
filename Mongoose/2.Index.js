import connect from './Connection.js';

connect()
    .then(() => {
        console.log('Successfully connected to the database');
        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });

