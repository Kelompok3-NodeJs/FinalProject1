const express = require('express')
const router = express.Router()
const pool = require('../config/config')
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authentication')

router.get('/', (req, res) => {
    pool.query('SELECT * FROM reflections', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

router.post ('/api/v1/users/register', userController.register)
router.post('/api/v1/users/login', userController.login)
router.use(authentication)

module.exports = router