module.exports = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: process.env.PORT || 3307, 
        database: process.env.DB_NAME || 'Ae'
    }
}
