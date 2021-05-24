require('dotenv').config()
const express = require('express'),
    app = express(),
    dbConfig = require('./config/dbSetup'),
    PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize db 
dbConfig();

// Auth routes
app.use('/api', require('./Auth'))
// User routes
app.use('/api/users', require('./User'))

app.get('/', (req, res) => {
    res.json({ msg: 'Hello from index route!' });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));