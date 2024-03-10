import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),

}).messages({
    "any.required": "All fields are required"
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string(),
}).min(1).messages({
    "object.min": 'Body must have at least one field'
});



// 7ihEmmHdepqgZmi6