const dotenv = require('dotenv').config()
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      user: process.env.USERDB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DB_PORT
    },
    searchPath: ['knex', 'public'],
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  }
}