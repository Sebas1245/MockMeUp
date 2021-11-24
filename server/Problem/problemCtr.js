const Problem = require('../models/Problem'),
    ctr = {};

ctr.getProblems = () => async (req, res, next) =>{
    const user = req.user;
    let problems = await Problem.find({});
   
    return res.status(200).json({problems: problems ?? []});
}

module.exports = ctr;