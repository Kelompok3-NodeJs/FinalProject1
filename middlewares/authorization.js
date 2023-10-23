const pool = require('../config/config')

function authorization (req,res,next){
    const reflectionId = req.params.id
    const authenticatedUser = req.user.id
    const sql = `SELECT * FROM reflections WHERE id = $1`
    const values = [reflectionId]
    pool.query(sql, values)
        .then(data => {
            if (data.rows.length === 0) {
                return res.status(404).json({ message: 'Reflection not found' });
            }
            if (data.rows[0].user_id !== authenticatedUser) {
                return res.status(401).json({ message: `User with id "${authenticatedUser}" Unauthorized to access reflection with id "${reflectionId}"` });
            }
            next()
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}

module.exports = {
    authorization
}