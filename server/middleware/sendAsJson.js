let sendAsJson = () => async (err, req, res, next) => {
    console.log('err :', err);

    if (err.statusCode !== 500) {
        return res.status(err.statusCode).json({ code: err.statusCode, name: err.name, message: err.message })
    } else {
        return res.status(500).send("SERVER ERROR");
    }

}
module.exports = sendAsJson;