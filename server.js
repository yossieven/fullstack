const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const hbs = require("express-handlebars");

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

app.use('/api', require('./api'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log(`server started on port ${app.get('port')}`);
})