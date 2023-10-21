const {verifyToken} = require('../helpers/jwt')

function authentication(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).json({message: 'No token provided'})
    }
    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = {
    authentication
}