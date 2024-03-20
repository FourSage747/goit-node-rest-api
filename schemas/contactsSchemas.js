const Joi = require("joi")

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
})

const updateContactSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.boolean().optional()
});
// const updateContactSchema = Joi.object({
//     name: Joi.string().optional(),
//     email: Joi.string().email().optional(),
//     phone: Joi.string().optional(),
//     favorite: Joi.boolean().optional()
// }).or('name', 'email', 'phone');

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

module.exports = {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema
}