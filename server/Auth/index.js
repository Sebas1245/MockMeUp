const express = require('express'),
    router = express.Router({ mergeParams: true }),
    asyncHandler = require('express-async-handler'),
    authCtr = require('./authController');

router.get('/', (req, res) => console.log(`Auth API is working!`));

router.post('/register', asyncHandler(authCtr.register()));

router.post('/login', asyncHandler(authCtr.login()));

module.exports = router;