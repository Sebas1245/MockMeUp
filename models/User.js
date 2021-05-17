const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: [true, "First name is missing"]
    },
    lName: {
        type: String,
        required: [true, "Last name is missing"]
    },
    email: {
        type: String,
        required: [true, "Email is missing"],

    },
    password: {
        select: false,
        type: String,
        required: [true, "Password is missing"]
    },
    role: {
        type: String,
        default: "user",
        select: false
    },
    programmingLanguages: {
        type: [{
            type: String
        }]
    },
    resume: {
        type: String,
    },
    tokens: {
        type: [{
            type: String,
        }],
        select: false,
    },
})

userSchema.pre('save', function (next) {
    const user = this
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10).then(function (hash) {
            user.password = hash
            next()
        }).catch(function (error) {
            return next(error)
        })
    } else {
        next()
    }

})
// Validate if email is unique - unique option only creates an index
userSchema.path('email').validate(async function (value) {
    const emailCount = await mongoose.models.User.countDocuments({ email: value, _id: { $ne: this._id } });
    return !emailCount;
}, 'There already is an account with this email!');

userSchema.methods.comparePassword = async function (password) {
    const matches = await bcrypt.compare(password, this.password);
    console.log(matches ? "Pasword matched" : "Password did not match")
    return matches;
}

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1 day' });
    user.tokens.push(token);
    await user.save();
    return token;
}

module.exports = mongoose.model('User', userSchema);