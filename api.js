<<<<<<< HEAD
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('home');
});

router.get('/students', (req, res) => {
    res.send();
});

=======
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

>>>>>>> 9b5ba775d6f68dfd2d7b0c4df0481563c7684b6a
module.exports = router;