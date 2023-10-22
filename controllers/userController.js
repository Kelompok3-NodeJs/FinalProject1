const {comparePassword, hashPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const pool =  require('../config/config')

class userController {
    // user registration fixed
    static register(req,res)  {
        const {email, password} = req.body
        const hashedPassword = hashPassword(password) // hash the password
        const sql = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`
        const search_query = `SELECT * FROM users WHERE email = '${email}'`
        
        const values = [email, hashedPassword]
        pool.query(search_query, (error, results) => {
            if (error) {
                return res.status(500).json(error)
            }
            if (results.rows.length > 0) {
                return res.status(400).json({
                    message :"Email already used"})
            } else {
                pool.query(sql, values)
                    .then(data => {
                        res.status(201).json({
                            id : data.rows[0].id,
                            email : data.rows[0].email
                        })
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
        })
    }
    // user login fixed
    static login(req,res) {
        const {email, password} = req.body
        const search_query = `SELECT * FROM users WHERE email = '${email}'`
        pool.query(search_query, (error, results) => {
            if (error) {
                return res.status(500).json(error)
            }
            if (results.rows.length === 0) {
                return res.status(400).json({
                    message :"Email not found"})
            } else {
                const user = results.rows[0]
                const passwordMatch = comparePassword(password, user.password)
                if (passwordMatch) {
                    const access_token = generateToken({
                        id : user.id,
                        email : user.email
                    })
                    return res.status(200).json({
                        access_token : access_token
                    })
                } else {
                    return res.status(401).json({
                        message :"Email or password invalid!"})
                }
            }
        })
    }
}   

module.exports = userController