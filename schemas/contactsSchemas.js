import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Field "name" is required',
        'any.required': 'Field "name" is required',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Field "name" is required',
        'any.required': 'Field "name" is required',
    }),
    phone: Joi.string().required().messages({
        'string.empty': 'Field "name" is required',
        'any.required': 'Field "name" is required',
    }),
favorite: Joi.boolean()
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean()
}).min(1).messages({
    "object.min": 'Body must have at least one field'
});



// 7ihEmmHdepqgZmi6