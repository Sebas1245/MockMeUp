require('dotenv').config();

const express = require('express'),
    app = express(),
    dbConfig = require('./config/dbSetup'),
    sendAsJSON = require('./middleware/sendAsJson'),
    eHandler = require('./middleware/errorHandler'),
    PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

// initialize db 
dbConfig();

// Auth routes
app.use('/api', require('./Auth'))
// User routes
app.use('/api/users', require('./User'))
// Problem routes 
app.use('/api/problems', require('./Problem'))

app.get('/', (req, res) => {
    res.json({ msg: 'Hello from MockMeUp index route!' });
})
app.use(eHandler());
app.use(sendAsJSON());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

