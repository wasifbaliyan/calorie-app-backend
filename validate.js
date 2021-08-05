const Joi = require('joi');

const schema = Joi.object({
    weight: Joi.number().required(),
    fat: Joi.number().required(),
    level: Joi.number().required(),
    name: Joi.string().required()
})

module.exports = schema;
