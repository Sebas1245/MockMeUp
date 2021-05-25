require('dotenv').config()
const express = require('express'),
    app = express(),
    dbConfig = require('./config/dbSetup'),
    sendAsJSON = require('./middleware/sendAsJson'),
    eHandler = require('./middleware/errorHandler'),
    PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

// initialize db 
dbConfig();

// Auth routes
app.use('/api', require('./Auth'))
// User routes
app.use('/api/users', require('./User'))

app.get('/', (req, res) => {
    res.json({ msg: 'Hello from index route!' });
})
app.use(eHandler());
app.use(sendAsJSON());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));