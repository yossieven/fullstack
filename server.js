const CONFIG = require('./config/config');
const http = require('http');
const app = require('./app');
const knex = require('./db/knex');

if (CONFIG.app === 'development') {
    knex.migrate.latest().then(function () {
            return knex.seed.run();
        })
        .then(function () {
            console.log('finished with migration');
        })
        .catch((err) => {
            console.log("there was an error #" + err.errno + " with seeding : " + err.sqlMessage);
        })
}

const server = http.createServer(app);


server.listen(CONFIG.port);

// , () => {
//     console.log(`server started on port ${app.get('port')}`);
// })