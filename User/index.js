const express = require('express'),
    router = express.Router({ mergeParams: true }),
    asyncHandler = require('express-async-handler'),
    { isInterviewee, isInterviewer } = require('../middleware/roleMiddleware'),
    userCtr = require('./userCtr');

router.get('/', (req, res) => res.status(200).json({ msg: 'Hello from user index' }))

router.post('/book_interview', asyncHandler(isInterviewee), asyncHandler(userCtr.bookInterview()))

router.post('/set_available_times', asyncHandler(userCtr.bookInterview));


module.exports = router;