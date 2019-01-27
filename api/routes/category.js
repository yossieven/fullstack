const CONFIG = require('../../config/config');
const express = require('express');
const router = express.Router();
const productSchema = require('../../models/category_validation');
const knex = require('../../db/knex');

let Response = {
    success: false,
    data: []
}
//const models = require("../../models");

router.get('/', (req, res, next) => {
    console.log("getting categories...");
    knex.select().from('category').then((categories) => {
        Response.success = true;
        Response.data = categories;
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
    console.log("getting category " + req.params.id);

    knex.select().from('category').then((category) => {
        // res.send(products);
        console.log(category);
        Response.success = true;
        Response.data = category;
        // res.render('home', {
        //     products: products
        // })
    }).catch((error) => {
        console.log(error);
        next(error);
    });
});


router.post('/', (req, res, next) => {
    console.log(req.file);
    const category = {
        name: req.body.name,
    };
    console.log("category", category);
    productSchema.validate(category, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('category').returning('id').insert(category).then((id) => {
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
        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log("updating category ", req.params.id);
    const category = {
        name: req.body.name
    };
    productSchema.validate(category, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('category')
                .where({
                    'id': req.params.id
                })
                .update(category)
                .then((updatedRow) => {
                    // res.send(products);
                    console.log("updated Row ", updatedRow);
                    send(Response);
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("category not found");
                    }
                    res.send.status(200);
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
    console.log("deleting category ", req.params.id);

    const deleted = knex('category')
        .where({
            'id': req.params.id
        })
        .del()
        .then((result) => {
            // res.send(products);
            console.log("deleted Row", result);
            if (result == 0) {
                res.status(404);
                throw new Error("category not found");
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