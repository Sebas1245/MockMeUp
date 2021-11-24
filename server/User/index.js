const express = require('express'),
    router = express.Router({ mergeParams: true }),
    asyncHandler = require('express-async-handler'),
    { isInterviewee, isInterviewer, checkLogin } = require('../middleware/roleMiddleware'),
    userCtr = require('./userCtr');

router.get('/', (req, res) => res.status(200).json({ msg: 'Hello from user index' }))

router.post('/book_interview', asyncHandler(isInterviewee), asyncHandler(userCtr.bookInterview()))

router.put('/set_available_times', asyncHandler(isInterviewer), asyncHandler(userCtr.setAvailableDates()));

router.get('/interviews', asyncHandler(checkLogin), asyncHandler(userCtr.getInterviewsByUserId()));


module.exports = router;