const express = require('express')
const router = express.Router()
const pool = require('../config/config')
const userController = require('../controllers/userController')
const reflectionController = require('../controllers/reflectionController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

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
router.get('/api/v1/reflections', reflectionController.getAll)
router.post('/api/v1/reflections', reflectionController.create)
router.use('/api/v1/reflections/:id', authorization)
router.put('/api/v1/reflections/:id', reflectionController.editReflection);
router.delete('/api/v1/reflections/:id', reflectionController.deleteReflection);
module.exports = router