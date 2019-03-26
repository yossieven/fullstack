const express = require('express');

var sessionChecker = (req, res, next) => {
    if (req.session.user_id && req.session.email) {
        next(false);
    } else {
        next(true);
        res.redirect('/home');
    }
};
module.exports = sessionChecker;