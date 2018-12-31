const express = require('express');
const router = express.Router();
const cors = require('cors')


router.use(cors());

router.get('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('home');
});

router.post('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.status(200).json({
        message: "handling post for students"
    });
});

router.get('/:id', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    res.status(200).json({
        message: `handling get for student ${id}`
    });
});

router.delete('/id', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.status(200).json({
        message: `handling delete for student ${id}`
    });
});

module.exports = router;