import { Request } from "express"
import { add_agent_schema, delete_agent_schema } from "./validation"
import { add_agent_controller, get_agents_controller, delete_agent_controller } from "./controller"

export const add_agent_service = (req: Request) => {
    const { value, error } = add_agent_schema.validate(req.body)
    if (error) throw new Error(error.details[0].message)
    return add_agent_controller(value)
}

export const get_agents_service = (req: Request) => {
    const { limit = 10, offset = 0 } = req.query
    return get_agents_controller(+limit, +offset)
}

export const delete_agent_service = (req: Request) => {
    const { value, error } = delete_agent_schema.validate(req.params.agent_id)
    if (error) throw new Error(error.details[0].message)
    return delete_agent_controller(value)
}
