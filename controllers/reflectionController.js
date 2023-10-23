const pool =  require('../config/config')

class reflectionController{
static  getAll(req, res){
        try {
            // Get the user ID from the access token in the request header
            const userId = req.user.id;
            const search_query = `SELECT * FROM reflections WHERE user_id = '${userId}'`
            // Find all reflections for the user with the given ID
             pool.query(search_query, (error, results) => {
                if (error) {
                    return res.status(401).json({message: 'Unauthorized'})
                }
                if (results.rows.length === 0) {
                    return res.status(400).json({
                        message :"No reflections found"})
                } else {
                    return res.status(200).json(results.rows)
                }
            })

        } catch (err) {
            return res.status(500).json(err)
        }
    }

static create(req, res){
    try {
        //create a reflection
        
        const { success, low_point, take_away} = req.body
        const userId = req.user.id;
        const sql = `INSERT INTO reflections (success, low_point, take_away, user_id) VALUES ($1, $2, $3, $4) RETURNING *`
        const VALUES = [success, low_point, take_away, userId]
        pool.query(sql, VALUES)
            .then(data => {
                res.status(201).json({
                    id : data.rows[0].id,
                    success : data.rows[0].success,
                    low_point : data.rows[0].low_point,
                    take_away : data.rows[0].take_away,
                    UserId : data.rows[0].user_id
                })
            })
            .catch(err => {
                res.status(500).json(err)
                
            })
    } catch (error) {
        res.status(500).json(error)
       
    }
}

static editReflection(req, res) {
    try {
        const userId = req.user.id;
        const reflectionId = req.params.id;
        const { success, low_point, take_away } = req.body;

        const sql = `
            UPDATE reflections
            SET success = $1, low_point = $2, take_away = $3
            WHERE id = $4 AND user_id = $5
            RETURNING *
        `;

        const values = [success, low_point, take_away, reflectionId, userId];

        pool.query(sql, values)
            .then(data => {
                console.log(data);
                if (data.rows.length === 0) {
                    return res.status(404).json({ message: 'Reflection not found' });
                }
                res.status(200).json(data.rows[0]);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

static deleteReflection(req, res) {
    try {
      const userId = req.user.id;
      const reflectionId = req.params.id;

      // Hapus "reflection" dari database
      const sql = `
        DELETE FROM reflections
        WHERE id = $1 AND user_id = $2
      `;

      const values = [reflectionId, userId];

      pool.query(sql, values)
        .then(() => {
          res.status(200).json({ message: 'Success delete' });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

}

module.exports = reflectionController