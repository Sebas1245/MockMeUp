const Sequelize = require('sequelize'),
    db = require('../config/db_config');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    resume: {
        type: Sequelize.BLOB
    },

})

module.exports = User;