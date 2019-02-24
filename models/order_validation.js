const BaseJoi = require('joi');
const ImageExtension = require('joi-image-extension');

const Joi = BaseJoi.extend(ImageExtension);

const schema = Joi.object().keys({
    user_id: Joi.number().integer().min(1),
    total: Joi.number().precision(2),
    cart_id: Joi.number().integer().min(1).required(),
    city: Joi.string().regex(/[\w+א-ת+]/),
    street: Joi.string().regex(/[\w+א-ת+]/),
    shipping_date: Joi.date().required(),
    last_four: Joi.string().regex(/[0-9+]/).required()
});

module.exports = schema;