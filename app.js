const bodyParser = require('body-parser');
const path = require("path");
const hbs = require("express-handlebars");
const express = require('express');

const app = express();


app.set("views", path.join(__dirname, 'views'));
app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const studentRoutes = require('./api/routes/students');
app.use('/api/student', studentRoutes);

module.exports = app;