const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('home');
});

router.post('/', (req, res, next) => {
    const student = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };

    res.status(201).json({
        message: "handling post for students",
        student: student
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `handling get for student ${id}`
    });
});

router.delete('/id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `handling delete for student ${id}`
    });
});

module.exports = router;