const Joi = require('joi');


const schema = Joi.object().keys({
    name: Joi.string().regex(/[\w+א-ת+]/).required()
});

module.exports = schema;