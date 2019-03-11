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
            console.log("fetched items", cartItems);
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
        .join('product', {
            'product.id': 'cart_item.product_id'
        })
        .select('product.id', 'product.name', 'cart_item.id', 'cart_item.amount', 'cart_item.total', 'cart_item.cart_id')
        .where('cart_item.id', req.params.id)
        .then((cartItems) => {
            // res.send(products);
            console.log(cartItems);
            Response.success = true;
            Response.data = [];
            console.log("cart items after select", cartItems[0]);
            Response.data.push(cartItems[0]);
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
        .select('cart_item.product_id', 'product.name', 'cart_item.id', 'cart_item.amount', 'cart_item.total', 'product.image')
        .where('cart_id', req.params.id)
        .then((cartItems) => {
            // res.send(products);
            console.log(cartItems);
            Response.success = true;
            console.log("fetched items", cartItems);
            Response.data = cartItems;
            res.send(Response);
        }).catch((error) => {
            console.log(error);
            next(error);
        });
});

router.post('/', (req, res, next) => {
    let cartItem = {
        id: 0,
        product_id: req.body.product_id,
        amount: req.body.amount,
        total: req.body.total,
        cart_id: req.body.cart_id
    };
    console.log("cart_item", cartItem);

    knex('cart_item').returning('id').insert(cartItem).then((id) => {

        res.status(200);
        Response.success = true;
        cartItem.id = id[0];
        Response.data = [];
        Response.data.push(cartItem);
        res.send(Response);
    }).catch((error) => {
        console.log("error", error);
        next(error);
    });


})

router.post('/:id', (req, res, next) => {
    console.log("updating cart_item ", req.params.id);
    const cartItem = {
        id: req.params.id,
        product_id: req.body.product_id,
        amount: req.body.amount,
        total: req.body.total,
        cart_id: req.body.cart_id
    };
    knex('cart_item')
        .join('product', {
            'product.id': 'cart_item.product_id'
        })
        .select('product.id', 'product.name', 'cart_item.id', 'cart_item.amount', 'cart_item.total', 'cart_item.cart_id')
        .where('cart_item.id', req.params.id)
        .then((detailedCartItems) => {
            knex('cart_item')
                .where({
                    'id': cartItem.id
                })
                .update(cartItem)
                .then((updatedRow) => {
                    // res.send(products);
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("cart_item not found");
                    }
                    res.status(200);
                    Response.success = true;
                    //Response.data = [];
                    detailedCartItems[0].amount = cartItem.amount;
                    detailedCartItems[0].product_id = cartItem.product_id;
                    detailedCartItems[0].cart_id = cartItem.cart_id;
                    detailedCartItems[0].total = cartItem.total;
                    Response.data = detailedCartItems;
                    res.send(Response);
                }).catch((error) => {
                    console.log("error", error);
                    next(error);
                });

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