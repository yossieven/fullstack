const express = require('express');
const router = express.Router();
const cors = require('cors')


router.use(cors());

router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('home');
});

router.get('/students', (req, res) => {
    res.send();
});

module.exports = router;