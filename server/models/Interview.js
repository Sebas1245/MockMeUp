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
    feedback: {
        type: String
    },
    _interviewee: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'No interviewee set for interview.']
        }, 
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        }
        
    },
    _interviewer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'No interviewer set for interview.']
        }, 
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        }
    }
})

module.exports = mongoose.model('Interview', interviewSchema);