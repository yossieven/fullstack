const CONFIG = require('./config/config');
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'project1'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {
        client: CONFIG.db_dialect,
        connection: {
            host: CONFIG.db_host,
            user: CONFIG.db_user,
            password: CONFIG.db_password,
            database: CONFIG.db_name
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
}