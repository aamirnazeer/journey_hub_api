import Joi from "joi"

export const add_agent_schema = Joi.object({
    name: Joi.string().required(),
})

export const delete_agent_schema = Joi.string().min(36)
