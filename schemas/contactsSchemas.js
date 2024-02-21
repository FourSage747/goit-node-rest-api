const Joi = require("joi")

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const updateContactSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
});
// const updateContactSchema = Joi.object({
//     name: Joi.string().optional(),
//     email: Joi.string().email().optional(),
//     phone: Joi.string().optional(),
// }).or('name', 'email', 'phone');

module.exports = {
    createContactSchema,
    updateContactSchema
}