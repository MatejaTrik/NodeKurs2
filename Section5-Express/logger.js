function log(req, res, next) {
    console.log("loggind...")
    next()
}

module.exports = log;