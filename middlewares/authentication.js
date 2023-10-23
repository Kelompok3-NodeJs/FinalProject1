const {verifyToken} = require('../helpers/jwt')

function authentication(req, res, next) {
    const token = req.get('authorization')
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: no token provided'
        })
    } 
    try {
        const userDecoded = verifyToken(token)
        req.user = userDecoded
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: 'Unauthorized: invalid token'
        })
    }
}

module.exports = {
    authentication
}