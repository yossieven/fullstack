const express = require('express');
const router = express.Router();
const Joi = require('joi');
const knex = require('../../db/knex');
const userChema = require('../../models/user_validation');
const bcrypt = require('bcrypt');


// router.use('/:id', function (req, res, next) {
//     if (req.session.user_id && req.session.email) {
//         console.log("session is defined");
//         next(false);
//     } else {
//         console.log("session is not defined.");
//         next(true);
//         //res.redirect('http://localhost:4200/home');
//     }
// })

let Response = {
    success: false,
    data: []
}

router.get('/', (req, res, next) => {
    console.log("getting users...");
    knex.select().from('user').then((users) => {
        Response.success = true;
        Response.data = users;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    console.log("getting user " + req.params.id);

    knex('user').where({
        'id': req.params.id
    }).then((users) => {
        // res.send(products);
        console.log(users);
        Response.success = true;
        Response.data = users;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/:id/hasCart', (req, res, next) => {
    console.log("does user " + req.params.id + " has cart?");

    knex('cart').where({
        'user_id': req.params.id
    }).then((carts) => {
        console.log(carts[0]);
        if (carts.length > 0) {
            Response.success = true;
            Response.data = carts;
            res.send(Response);
        } else {
            Response.success = false;
            Response.data = [];
            res.send(Response);
        }
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});


router.post('/login', (req, res, next) => {
    console.log("getting user " + req.body.email);
    console.log("with password " + req.body.password);

    knex('user').where({
        'email': req.body.email
    }).then((users) => {
        // res.send(products);
        console.log(users);
        if (users.length > 0) {
            Response.success = true;
            bcrypt.compare(req.body.password, users[0].password, function (err, result) {
                if (result == true) {
                    console.log("password matches!");
                    req.session.user_id = users[0].id;
                    req.session.email = req.body.email;
                    req.session.save();
                    console.log('session on login', req.session);
                    res.status(200);
                    Response.data = users;
                    res.send(Response);
                } else {
                    console.log("password doesn't match!");
                    Response.success = false;
                    Response.data = [];
                    res.send(Response);
                }
            });
        } else {
            console.log("user doesn't match!");
            Response.success = false;
            Response.data = [];
            res.send(Response);
        }
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.post('/logout', (req, res, next) => {

    req.session.destroy((err) => {
        if (err) {
            res.negotiate(err);
        } else {
            console.log("logging out");
            // req.session.store.
            res.end('exit');
        }

    });
})

router.post('/', (req, res, next) => {
    const user = {
        id: req.body.id,
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        street: req.body.street,
        role: req.body.role
    };
    console.log("user", req.body);
    userChema.validate(user, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            // encrypt password
            bcrypt.hash(user.password, 10, function (err, hash) {
                console.log("encrypted password : ", hash);
                user.password = hash;

                knex('user').insert(user).then(() => {
                    // req.session.email = req.body.email;
                    // req.session.password = req.body.password;
                    res.status(200);
                    Response.success = true;
                    Response.data = [];
                    Response.data.push(user);
                    req.session.user_id = user.id;
                    req.session.email = user.email;
                    req.session.save();
                    console.log('session on create', req.session);
                    res.send(Response);
                }).catch((error) => {
                    console.log("error", error);
                    next(error);
                });
            });

        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log("updating user ", req.params.id);
    const user = {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        street: req.body.street,
        role: req.body.role
    };
    userChema.validate(user, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('user')
                .where({
                    'id': req.params.id
                })
                .update(user)
                .then((updatedRow) => {
                    // res.send(products);
                    console.log("updated Row ", updatedRow);
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("user not found");
                    }
                    res.status(200);
                    Response.success = true;
                    Response.data = {
                        id: req.params.id
                    };
                    res.send(Response);
                }).catch((error) => {
                    console.log("error", error);
                    next(error);
                });

        }

    });
})

router.delete('/:id', (req, res, next) => {
    console.log("deleting user ", req.params.id);

    const deleted = knex('user')
        .where({
            'id': req.params.id
        })
        .del()
        .then((result) => {
            // res.send(products);
            console.log("deleted Row", result);
            if (result == 0) {
                res.status(404);
                throw new Error("User not found");
            }
            res.status(200);
            Response.success = true;
            Response.data = {
                id: req.params.id
            };
            res.send(Response);
        }).catch((error) => {
            console.log("error", error);
            next(error);
        });
});

router.get('/session/isLogged', (req, res, next) => {
    console.log("getting session paramaters...", req.session);
    console.log("session paramaters", req.query.id);
    if (req.session.user_id != undefined && req.session.user_id == req.query.id) {
        console.log("user id", req.session.user_id);
        Response.success = true;
    } else {
        console.log(req.session);
        Response.success = false;
    }
    res.status(200);
    res.send(Response);
});


module.exports = router;