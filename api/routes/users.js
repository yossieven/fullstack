const express = require('express');
const router = express.Router();
const Joi = require('joi');
const knex = require('../../db/knex');
const productSchema = require('../../models/product_validation');
const path = require('path')


let Response = {
    success: false,
    data: []
}
//const models = require("../../models");

router.get('/', (req, res, next) => {
    console.log("getting products...");
    knex.select().from('product').then((products) => {
        Response.success = true;
        Response.data = products;
        res.send(Response);
        // res.render('home', {
        //     products: products
        // })
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    console.log("getting product " + req.params.id);

    knex.select().from('product').then((products) => {
        // res.send(products);
        console.log(products);
        Response.success = true;
        Response.data = products;
        // res.render('home', {
        //     products: products
        // })
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image
    };
    console.log("product", product);
    productSchema.validate(product, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('product').returning('id').insert(product).then((id) => {
                send.status(200);
                Response.success = true;
                Response.data = {
                    id: id
                };
                send(Response);
            }).catch((error) => {
                console.log("error", error);
                next(error);
            });
        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log("updating product ", req.params.id);
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image
    };
    productSchema.validate(product, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('product')
                .where({
                    'id': req.params.id
                })
                .update(product)
                .then((updatedRow) => {
                    // res.send(products);
                    console.log("updated Row ", updatedRow);
                    send(Response);
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("Product not found");
                    }
                    send.status(200);
                    Response.success = true;
                    Response.data = {
                        id: req.params.id
                    };
                }).catch((error) => {
                    console.log("error", error);
                    next(error);
                });

        }

    });
})

router.delete('/:id', (req, res, next) => {
    console.log("deleting product ", req.params.id);

    const deleted = knex('product')
        .where({
            'id': req.params.id
        })
        .del()
        .then((result) => {
            // res.send(products);
            console.log("deleted Row", result);
            if (result == 0) {
                res.status(404);
                throw new Error("Product not found");
            }
            send.status(200);
            Response.success = true;
            Response.data = {
                id: req.params.id
            };
        }).catch((error) => {
            console.log("error", error);
            next(error);
        });
});

module.exports = router;