const express = require('express'),
    router = express.Router({ mergeParams: true }),
    asyncHandler = require('express-async-handler'),
    { isLoggedIn } = require('../middleware/roleMiddleware'),
    problemCtr = require('./problemCtr');

router.get('/', asyncHandler(isLoggedIn), asyncHandler(problemCtr.getProblems()));



module.exports = router;