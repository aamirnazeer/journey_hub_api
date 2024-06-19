import Joi from "joi"

export const signin_schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export const signup_schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})
