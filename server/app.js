require('dotenv').config()
const express = require('express'),
    app = express(),
    dbConfig = require('./config/dbSetup'),
    sendAsJSON = require('./middleware/sendAsJson'),
    eHandler = require('./middleware/errorHandler'),
    PORT = process.env.PORT || 4000,
    path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

// initialize db 
dbConfig();

// Serves build
app.use(express.static(path.resolve('./client/build')));

// Auth routes
app.use('/api', require('./Auth'))
// User routes
app.use('/api/users', require('./User'))

app.get('/', (req, res) => {
    res.json({ msg: 'Hello from MockMeUp index route!' });
})
app.use(eHandler());
app.use(sendAsJSON());
// Redirects everything else to index
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'));
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));