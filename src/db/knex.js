// knex configuration file
const knex = require('knex');

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/db/database.sqlite'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './src/db/migrations'
        },
    },  
}