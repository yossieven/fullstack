const CONFIG = require('../../config/config');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const knex = require('../../db/knex');
const productSchema = require('../../models/product_validation');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, CONFIG.uploads);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('wrong file type for image'), false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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

    knex('product').where({
            'id': req.params.id
        })
        .select().then((products) => {
            // res.send(products);
            console.log(products);
            Response.success = true;
            Response.data = products;
            res.status(200);
            res.send(Response);
            // res.render('home', {
            //     products: products
            // })
        }).catch((error) => {
            console.log(error);
            next(error);
        });
});

router.get('/category/:id', (req, res, next) => {
    console.log("getting product by category " + req.params.id);

    knex('product').where({
            'category': req.params.id
        })
        .select().then((products) => {
            // res.send(products);
            console.log(products);
            Response.success = true;
            Response.data = products;
            // res.render('home', {
            //     products: products
            // })
            res.status(200);
            res.send(Response);
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
});

router.post('/', upload.single('image'), cors(), (req, res, next) => {
    console.log("the file", req.file);
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.file.filename
    };
    console.log("product", product);
    productSchema.validate(product, (err, value) => {
        if (err) {
            res.status(400);
            next(err);
        } else {
            knex('product').returning('id').insert(product).then((id) => {
                res.status(200);
                Response.success = true;
                product.id = id;
                Response.data = product;
                res.send(Response);
            }).catch((error) => {
                console.log("error", error);
                next(error);
            });
        }
    });
})

router.post('/:id', upload.single('image'), cors(), (req, res, next) => {
    console.log("updating product ", req.params.id);
    let imageFileName = "";
    if (req.file != undefined) {
        imageFileName = req.file.filename
        console.log("image path", req.file.filename);
    }

    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: imageFileName
    };
    console.log("received product to update", JSON.stringify(product));
    productSchema.validate(product, (err, value) => {
        if (err) {
            console.log("an error in updating", err);
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
                    if (updatedRow == 0) {
                        res.status(404);
                        throw new Error("Product not found");
                    }
                    res.status(200);
                    Response.success = true;
                    product.id = req.body.id;
                    Response.data = product;
                    res.send(Response);
                }).catch((error) => {
                    console.log("error", error);
                    next(error);
                });

        }

    });
})

router.delete('/:id', cors(), (req, res, next) => {
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