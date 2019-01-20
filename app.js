const bodyParser = require('body-parser');
const path = require("path");
const hbs = require("express-handlebars");
const express = require('express');
const morgan = require('morgan');
// const models = require('./models');


const app = express();
app.use("/assets/images", express.static('assets/images')); // make upload folder available
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

app.set("views", path.join(__dirname, 'views'));
app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



const productsRoutes = require('./api/routes/products');
const usersRoutes = require('./api/routes/users');
const cartItemRoutes = require('./api/routes/cartItems')
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cartItems', cartItemRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: "there was an error: " + err.message
        }
    });
    next();
})
module.exports = app;