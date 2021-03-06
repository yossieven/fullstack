const Joi = require('joi');


const schema = Joi.object().keys({
    id: Joi.string().regex(/^[0-9]+$/).required(),
    name: Joi.string().regex(/[\w+א-ת+]/).required(),
    last_name: Joi.string().regex(/[\w+א-ת+]/),
    email: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    city: Joi.string().regex(/[\w+א-ת+]/),
    street: Joi.string().regex(/[\w+א-ת+]/),
    role: Joi.number().integer().min(0).max(2)
});

module.exports = schema;