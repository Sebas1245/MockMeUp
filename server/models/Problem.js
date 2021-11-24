const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    level: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy'
    },
    description:{
      type: String
    },
    url: {
      type: String
    }
});

module.exports = mongoose.model('Problem', problemSchema);