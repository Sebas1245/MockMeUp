const User = require('../models/User'),
    CustomError = require('../middleware/customError'),
    bcrypt = require('bcrypt');
ctr = {};

ctr.register = () => async (req, res, next) => {
    const { email, fName, lName, password, confirmPassword, programmingLanguages } = req.body;
    if (password != confirmPassword) return Promise.reject(new CustomError(400, "Passwords do not match"));
    console.log(email, fName, lName, password, confirmPassword, programmingLanguages)
    let user = new User({ fName, lName, email, password, programmingLanguages });
    await user.save();
    res.status(201).json({
        message: 'User created successfully!',
        user
    })

}
ctr.login = () => async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
    let user = await User.findOne({ email }).select('+password +tokens').exec();
    if (!user) return Promise.reject(new CustomError(401, "Email or password incorrect, please try again."));

    const matches = await user.comparePassword(password);
    if (!matches) return Promise.reject(new CustomError(401, "Email or password incorrect, please try again."));

    let token = await user.generateToken();
    user = user.toJSON();
    delete user.password;
    delete user.tokens;

    res.status(201).json({
        success: true,
        message: "Login successful",
        user,
        token
    })

}

module.exports = ctr;