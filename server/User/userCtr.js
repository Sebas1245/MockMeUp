const User = require('../models/User'),
    Interview = require('../models/Interview'),
    CustomError = require('../middleware/customError'),
    ctr = {};

ctr.bookInterview = () => async (req, res, next) => {
    const user = req.user
    const { interviewDate, interviewType } = req.body
    const convertedDate = new Date(interviewDate);
    const interviewWeekDay = convertedDate.getDay();
    const interviewStartHour = convertedDate.getHours();
    // check if an interviewer is available for the chosen date and time 
    // first we filter out those who are already booked on that date
    let interviewersScheduledAtDate = await Interview.find({ date: convertedDate }, { _id: 0, _interviewer: 1 });
    console.log('Line 15', interviewersScheduledAtDate);
    if (interviewersScheduledAtDate.length !== 0) {
        interviewersScheduledAtDate = [...new Set(interviewersScheduledAtDate)]
        interviewersScheduledAtDate = interviewersScheduledAtDate.map(interviewer => interviewer._interviewer);
    }
    console.log('Line 20', interviewersScheduledAtDate)
    let possibleInterviewers = await User.find({
        _id: { $nin: interviewersScheduledAtDate },
        role: "interviewer",
        availableDays: interviewWeekDay,
        availableHourStart: { $lte: interviewStartHour },
        availableHourEnd: { $gt: interviewStartHour }
    });
    console.log(possibleInterviewers);
    // if not handle as error, possibly change this later
    if (possibleInterviewers.length === 0)
        return Promise.reject(new CustomError(404, "No possible interviewers found"));
    // if yes then schedule the interview
    const interviewer = Math.floor(Math.random() * possibleInterviewers.length) // choose a random interviewer out of all possible options
    console.log(interviewer, possibleInterviewers[interviewer]._id)
    const newInterview = new Interview({
        date: convertedDate,
        type: interviewType,
        _interviewee: user._id,
        _interviewer: possibleInterviewers[interviewer]._id
    })
    await newInterview.save();
    res.status(200).json({ message: 'success', newInterview })
}

ctr.setAvailableDates = () => async (req, res, next) => {
    const user = req.user;
    const { availableDays, availableHourStart, availableHourEnd } = req.body;
    console.log(availableDays, availableHourStart, availableHourEnd);
    let updatedUser = await User.findByIdAndUpdate(user._id, { availableDays, availableHourStart, availableHourEnd }).exec();

    if (!updatedUser)
        throw new CustomError(404, 'User not found')

    return res.status(200).json({ updatedUser })

}

module.exports = ctr;