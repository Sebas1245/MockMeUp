let mongoose = require('mongoose');

function setup() {
    let uri = 'MONGODB_URI';
    if (process.env.NODE_ENV === 'test') uri += '_TEST'
    else if (process.env.NODE_ENV === 'dev') uri += '_DEV'
    mongoose.connect(process.env[uri], {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(result => console.log('Connection successful'))
        .catch(err => console.log('Error in connection to db :', err))

    mongoose.connection.on('error', error => console.log(`Connection to database failed: ${error}`));
    mongoose.connection.on('connected', () => console.log(`Connected to database`));
    mongoose.connection.on('disconnected', () => console.log(`Disconnected from database`));
}

module.exports = setup;