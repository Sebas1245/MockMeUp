const User = require('../models/User'),
    Interview = require('../models/Interview'),
    CustomError = require('../middleware/customError'),
    ctr = {};

ctr.bookInterview = () => async (req, res, next) => {
    const user = req.user._id
    const { interviewDate, interviewType } = req.body
    console.log(userId);
    res.status(200).json({ message: 'success' })
}

ctr.setAvailableDates = () => async (req, res, next) => {
    const user = req.user;
    const { availableDays, availableHourStart, availableHourEnd } = req.body;
    let updatedUser = await User.findByIdAndUpdate(user._id, { availableDays, availableHourStart, availableHourEnd }).exec();

    if (!updatedUser)
        throw new CustomError(404, 'User not found')
    return res.status(200).json({ updatedUser })

}
module.exports = ctr;