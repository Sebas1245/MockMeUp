const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'No date set for interview.']
    },
    type: {
        type: String,
        required: [true, 'Type of intreview has not been defined']
    },
    _interviewee: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'No interviewee set for interview.']
    },
    _interviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'No interviewer set for interview.']
    }
})

module.exports = mongoose.model('Interview', interviewSchema);