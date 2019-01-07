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
        res.render('home', {
            products: products
        })
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
            knex('product').insert(product).then(() => {
                knex.select().from('product').then((products) => {
                    // res.send(products);
                    console.log(products);
                    res.status(201);
                    res.render('home', {
                        products: products
                    })
                }).catch((error) => {
                    console.log("error", error);
                    next(error);
                });
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
                    knex.select().from('product').then((products) => {
                        // res.send(products);
                        console.log(products);
                        res.render('home', {
                            products: products
                        })
                    }).catch((error) => {
                        console.log("error", error);
                        next(error);
                    });
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("Product not found");
                    }
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
            knex.select().from('product').then((products) => {
                // res.send(products);
                console.log(products);
                res.render('home', {
                    products: products
                })
            }).catch((error) => {
                console.log("error", error);
                next(error);
            });
            if (result == 0) {
                res.status(404);
                throw new Error("Product not found");
            }
        }).catch((error) => {
            console.log("error", error);
            next(error);
        });
});

module.exports = router;