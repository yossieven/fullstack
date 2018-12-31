const CONFIG = require('./config/config');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);


server.listen(CONFIG.port);

// , () => {
//     console.log(`server started on port ${app.get('port')}`);
// })