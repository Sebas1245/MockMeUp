const jwt = require('jsonwebtoken'),
    CustomError = require('./customError'),
    User = require('../models/User'),
    mw = {};

mw.isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return Promise.reject(new CustomError(401, 'Login required'));
    }
    const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
    if (user && !user.tokens.includes(token.split(' ')[1])) {
        return Promise.reject(new MyError(405,
            'Session has expired, login again.'));
    }

    if (user && user.role == "admin") {
        next();
    } else if (user) {
        return Promise.reject(new MyError(403,
            'You don\'t have permission to do that.'));
    } else {
        return Promise.reject(new MyError(404, 'User not found.'));
    }
}

mw.checkLogin = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return next();
    }
    token = token.split(' ')[1];
    if (!token || token.length == 0) {
        return next()
    }

    const data = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data._id).select('+role +tokens +bActive').exec();

    if (user && !user.tokens.includes(token)) {
        return Promise.reject(new MyError(405,
            'Session has expired, login again.'));
    }

    if (user) {
        delete user.tokens;
        delete user.bActive;
        req.user = user;
    }
    return next();
};

mw.isLoggedIn = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return next();
    }
    const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
    if (user && !user.tokens.includes(token.split(' ')[1])) {
        return Promise.reject(new MyError(405,
            'Session has expired, login again.'));
    }

    if (user) {
        req.user = user;
        next();
    } else {
        return Promise.reject(new MyError(401, 'Log in required.'));
    }
}

mw.isInterviewee = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return Promise.reject(new CustomError(401, 'Login required'));
    }
    const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
    if (user && !user.tokens.includes(token.split(' ')[1])) {
        return Promise.reject(new MyError(405,
            'Session has expired, login again.'));
    }

    if (user && user.role == "interviewee") {
        next();
    } else if (user) {
        return Promise.reject(new MyError(403,
            'You don\'t have permission to do that.'));
    } else {
        return Promise.reject(new MyError(404, 'User not found.'));
    }
}
mw.isInterviewee = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return Promise.reject(new CustomError(401, 'Login required'));
    }
    const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
    if (user && !user.tokens.includes(token.split(' ')[1])) {
        return Promise.reject(new MyError(405,
            'Session has expired, login again.'));
    }

    if (user && user.role == "interviewee") {
        next();
    } else if (user) {
        return Promise.reject(new MyError(403,
            'You don\'t have permission to do that.'));
    } else {
        return Promise.reject(new MyError(404, 'User not found.'));
    }
}
mw.isInterviewer = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return Promise.reject(new CustomError(401, 'Login required'));
    }
    const data = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(data._id).select('+role +tokens +bActive').exec();
    if (user && !user.tokens.includes(token.split(' ')[1])) {
        return Promise.reject(new MyError(405,
            'Session has expired, login again.'));
    }

    if (user && user.role == "interviewer") {
        next();
    } else if (user) {
        return Promise.reject(new MyError(403,
            'You don\'t have permission to do that.'));
    } else {
        return Promise.reject(new MyError(404, 'User not found.'));
    }
}

module.exports = mw