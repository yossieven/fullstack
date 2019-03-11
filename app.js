const bodyParser = require('body-parser');
const path = require("path");
const hbs = require("express-handlebars");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const CONFIG = require('./config/config');
// const models = require('./models');
var options = {
    host: CONFIG.db_host,
    port: CONFIG.db_port,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
};
const sessionStore = new MySQLStore(options);
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

const app = express();

//app.use(cors());
app.use("/assets/images", express.static('assets/images')); // make upload folder available
app.use(morgan('dev'));

app.use(session({
    secret: 'myShopOnline',
    secure: false,
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    name: 'shopSessionId',
    cookie: {
        secure: false
    }
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));





app.use((req, res, next) => {
    console.log("request method ", req.method);
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, responseType, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

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
const cartItemRoutes = require('./api/routes/cartItems');
const categoriesRoutes = require('./api/routes/categories');
const cartsRoutes = require('./api/routes/carts');
const ordersRoutes = require('./api/routes/orders');


app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cartItems', cartItemRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: "there is an error: " + err.message
        }
    });
    next();
})
module.exports = app;