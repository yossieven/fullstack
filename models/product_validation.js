const BaseJoi = require('joi');
const ImageExtension = require('joi-image-extension');

const Joi = BaseJoi.extend(ImageExtension);

const schema = Joi.object().keys({
    name: Joi.string().regex(/[\w+א-ת+]/).required(),
    category: Joi.number().integer().min(1).max(99).required(),
    price: Joi.number().precision(2),
    image: Joi.string().regex(/\w+\.(PNG|png|jpg|JPG|jpeg|JPEG)$/).allow('').allow(null)
});

module.exports = schema;