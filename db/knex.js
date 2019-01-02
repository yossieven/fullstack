const CONFIG = require('./config/config');
const environment = CONFIG.app;
const knexConfig = require('../knexfile')[environment];
console.log(knexConfig);
module.exports = require('knex')(knexConfig);