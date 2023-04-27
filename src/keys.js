module.exports = {
    database: {
        host: process.env.DB_HOST || 'mysql-database' ,
        user: process.env.DB_USER  || 'root',
        password: process.env.DB_PASSWORD || 'itesm',
        database: process.env.DB_NAME || 'itesm502'
    },

    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '55065011883-nh99fvjhg2em5vfo3i278a8u2b2tsuv1.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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'
    }
}