const express = require('express');
const router = express.Router();
const Joi = require('joi');
const knex = require('../../db/knex');
const bcrypt = require('bcrypt');



let Response = {
    success: false,
    data: []
}

router.get('/', (req, res, next) => {
    console.log("getting carts...");
    knex.select().from('cart').then((carts) => {
        Response.success = true;
        Response.data = carts;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    console.log("getting cart " + req.params.id);

    knex('cart').where({
        'id': req.body.id
    }).then((carts) => {
        // res.send(products);
        console.log(carts);
        Response.success = true;
        Response.data = carts;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});


router.post('/', (req, res, next) => {
    const cart = {
        user_id: req.body.user_id
    };
    console.log("cart", cart);
    knex('cart').returning('id').insert(cart).then((id) => {
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



router.delete('/:id', (req, res, next) => {
    console.log("deleting cart ", req.params.id);

    const deleted = knex('cart')
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