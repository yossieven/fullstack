const express = require('express');
const router = express.Router();
const Joi = require('joi');
const knex = require('../../db/knex');
// const cartItemChema = require('../../models/cartItem_validation');
const path = require('path')


let Response = {
    success: false,
    data: []
}

router.get('/', (req, res, next) => {
    console.log("getting cart items...");
    knex('cart_item')
        .join('product', {
            'product.id': 'cart_item.product_id'
        })
        .select('product.id', 'product.name', 'cart_item.id', 'cart_item.amount', 'cart_item.total', 'cart_item.cart_id')
        .then((cartItems) => {
            Response.success = true;
            Response.data = cartItems;
            res.send(Response);
        }).catch((error) => {
            console.log(error);
            next(error);
        });
});

router.get('/:id', (req, res, next) => {
    console.log("getting cart_item " + req.params.id);
    knex('cart_item')
        .join('products', {
            'product.id': 'cart_item.product_id'
        })
        .select('product.id', 'product.name', 'cart_item.id', 'cart_item.amount', 'cart_item.total', 'cart_item.cart_id')
        .where('id', req.params.id)
        .then((cartItems) => {
            // res.send(products);
            console.log(cartItems);
            Response.success = true;
            Response.data = cartItems;
            res.send(Response);
        }).catch((error) => {
            console.log(error);
            next(error);
        });
});

router.get('/bycart/:id', (req, res, next) => {
    console.log("getting cart_item by cart " + req.params.id);
    knex('cart_item')
        .join('product', {
            'product.id': 'cart_item.product_id'
        })
        .select('product.id', 'product.name', 'cart_item.id', 'cart_item.amount', 'cart_item.total', 'product.image')
        .where('cart_id', req.params.id)
        .then((cartItems) => {
            // res.send(products);
            console.log(cartItems);
            Response.success = true;
            Response.data = cartItems;
            res.send(Response);
        }).catch((error) => {
            console.log(error);
            next(error);
        });
});

router.post('/', (req, res, next) => {
    const cartItem = {
        product_id: req.body.product_id,
        amount: req.body.amount,
        total: req.body.total,
        cart_id: req.body.cart_id
    };
    console.log("cart_item", cartItem);

    knex('cart_item').returning('id').insert(cartItem).then((id) => {
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


})

router.put('/:id', (req, res, next) => {
    console.log("updating cart_item ", req.params.id);
    const cartItem = {
        product_id: req.body.product_id,
        amount: req.body.amount,
        total: req.body.total,
        cart_id: req.body.cart_id
    };
    cartItemChema.validate(cartItem, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('cart_item')
                .where({
                    'id': req.params.id
                })
                .update(cart_item)
                .then((updatedRow) => {
                    // res.send(products);
                    console.log("updated Row ", updatedRow);
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("cart_item not found");
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
    console.log("deleting cart_item ", req.params.id);

    const deleted = knex('cart_item')
        .where({
            'id': req.params.id
        })
        .del()
        .then((result) => {
            // res.send(products);
            console.log("deleted Row", result);
            if (result == 0) {
                res.status(404);
                throw new Error("cart_item not found");
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