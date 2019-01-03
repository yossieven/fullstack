const CONFIG = require('./config/config');
const http = require('http');
const app = require('./app');
const knex = require('./db/knex');

knex.migrate.latest()
    .then(function () {
        return knex.seed.run();
    })
    .then(function () {
        console.log('finished with migration');
    });

const server = http.createServer(app);


server.listen(CONFIG.port);

// , () => {
//     console.log(`server started on port ${app.get('port')}`);
// })