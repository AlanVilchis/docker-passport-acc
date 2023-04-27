const pool = require('../database');


module.exports = {
    
    async logAction(endpoint, status, user_id) {
        const newLog = {
            endpoint,
            status,
            user_id
        }

        await pool.query('INSERT INTO Log set ?', [newLog])
    },

}