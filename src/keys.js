module.exports = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: process.env.PORT || 3307,
        portSQL: process.env.PORT_SQL,
        database: process.env.DB_NAME || 'Ae'
    }
}
