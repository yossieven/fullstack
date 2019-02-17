const express = require('express');
const router = express.Router();
const Joi = require('joi');
const knex = require('../../db/knex');
const userChema = require('../../models/user_validation');
const bcrypt = require('bcrypt');



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
        'id': req.body.id
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

router.post('/login', (req, res, next) => {
    console.log("getting user " + req.body.id);
    console.log("with password " + req.body.password);

    knex('user').where({
        'id': req.body.id
    }).then((users) => {
        // res.send(products);
        console.log(users);
        Response.success = true;
        bcrypt.compare(req.body.password, users[0].password, function (err, result) {
            if (result == true) {
                console.log("password matches!");
                res.status(200);
                Response.data = users;
                res.send(Response);
            } else {
                console.log("password doesn't match!");
                Response.success = false;
                res.send(Response);
            }
        });

    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.post('/', (req, res, next) => {
    const user = {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        street: req.body.street,
        role: req.body.role
    };
    console.log("user", user);
    userChema.validate(user, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            // encrypt password
            bcrypt.hash(user.password, 10, function (err, hash) {
                console.log("encrypted password : ", hash);
                user.password = hash;

                knex('user').returning('id').insert(user).then((id) => {
                    res.status(200);
                    Response.success = true;
                    Response.data = {
                        id: id
                    };
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

module.exports = router;