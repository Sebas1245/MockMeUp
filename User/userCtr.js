const User = require('../models/User'),
    Interview = require('../models/Interview'),
    ctr = {};

ctr.bookInterview = () => async (req, res, next) => {
    const userId = req.user._id
    console.log(userId);
    res.status(200).json({ message: 'success' })
}

module.exports = ctr;