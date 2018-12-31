const express = require('express');
const router = express.Router();
const models = require("../../models");

router.get('/', (req, res, next) => {
    let students = [];
    const query = models.query('SELECT * FROM STUDENTS', function (error, results, fields) {
        if (error) {
            next(error);
            throw error;
        }
        students = JSON.parse(JSON.stringify(results));
        // results.forEach(element => {
        //     console.log("element", element);
        //     students.push(element);
        // });

        console.log(students);
        res.render('home', {
            students: students
        });
    });

});

router.post('/', (req, res, next) => {
    const student = {
        student_name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        avatar: req.body.avatar
    };

    const query = models.query('INSERT INTO STUDENTS SET ?', student, function (error, results, fields) {
        if (error) {
            next(error);
            throw error;
        }
        console.log("id", results.insertId);
    });

    console.log(query.sql);
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