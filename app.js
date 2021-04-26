require('dotenv').config()
const express = require('express'),
    app = express(),
    db = require('./config/db_config')
PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.json({ msg: 'Hello from index route!' });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));