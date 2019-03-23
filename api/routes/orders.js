const express = require('express');
const router = express.Router();
const Joi = require('joi');
const knex = require('../../db/knex');
const orderSchema = require('../../models/order_validation');
const bcrypt = require('bcrypt');



let Response = {
    success: false,
    data: []
}

router.get('/', (req, res, next) => {
    console.log("getting orders...");
    knex.select().from('order').then((orders) => {
        Response.success = true;
        Response.data = orders;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    console.log("getting order " + req.params.id);

    knex('order').where({
        'id': req.body.id
    }).then((orders) => {
        // res.send(products);
        console.log(orders);
        Response.success = true;
        Response.data = carts;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/user/:id', (req, res, next) => {
    console.log("getting order by user " + req.params.id);

    knex('order').where({
        'user_id': req.params.id
    }).then((orders) => {
        // res.send(products);
        console.log(orders);
        Response.success = true;
        Response.data = orders;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/cart/:id', (req, res, next) => {
    console.log("getting order by cart " + req.params.id);

    knex('order').where({
        'cart_id': req.params.id
    }).then((orders) => {
        // res.send(products);
        console.log(orders.length);
        if (orders.length == 0) {
            Response.success = false;
        } else {
            Response.success = true;
        }

        Response.data = orders;
        res.send(Response);
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.post('/', (req, res, next) => {
    console.log("req.body", req.body);
    const order = {
        user_id: req.body.user_id,
        total: req.body.total,
        cart_id: req.body.cart_id,
        city: req.body.city,
        street: req.body.street,
        shipping_date: req.body.shipping_date,
        last_four: req.body.last_four
    };
    console.log("order", order);
    orderSchema.validate(order, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('order').returning('id').insert(order).then((id) => {
                res.status(200);
                Response.success = true;
                order.id = id;
                Response.data.push(order);
                res.send(Response);
            }).catch((error) => {
                console.log("error", error);
                next(error);
            });
        }
    })

});



router.delete('/:id', (req, res, next) => {
    console.log("deleting order ", req.params.id);

    const deleted = knex('order')
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
            Response.data = [];
            res.send(Response);
        }).catch((error) => {
            console.log("error", error);
            next(error);
        });
});

module.exports = router;