const {comparePassword, hashPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const pool =  require('../config/config')

class userController {
    static register(req, res) {
        const {email, password} = req.body
        const hashedPassword = hashPassword(password)
        const search_query = `SELECT * FROM users WHERE email = '${email}'`
        const Insert = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`
        pool.query(search_query, (error, results) => {
            if (error) {
                throw error
            }
            if (results.rows.length > 0) {
                return res.status(400).json('User already exists')
            }
        })
        pool.query(Insert, (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).json(results.rows)
        })

    }

    static login(req, res) {
        const {email, password} = req.body
        const Select = `SELECT * FROM users WHERE email = '${email}'`
        pool.query(Select, (error, results) => {
            if (error) {
                throw error
            }
            if (comparePassword(password, results.rows[0].password)) {
                res.status(200).json(results.rows)
            } else {
                res.status(401).json('Email or password is invalid!')
            }
            let payload = {
                id: results.rows[0].id,
                email: results.rows[0].email
            }
            
            const token = generateToken(payload)
            return res.status(200).json({
                access_token:token
            })
        })
        .catch(error => {
            res.status(401).json(error)
            console.log(error)
            throw error
        })
    }
}

module.exports = userController