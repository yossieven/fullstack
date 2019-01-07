const Joi = require('joi');


const schema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum(),
    email: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    city: Joi.string().regex(/\w+/),
    street: Joi.string().alphanum(),
    role: Joi.integer().min(0).max(2)
});

module.exports = schema;