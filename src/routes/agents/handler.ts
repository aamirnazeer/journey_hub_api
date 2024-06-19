import { Router } from "express"
import { add_agent_service, get_agents_service, delete_agent_service } from "./service"
import { custom_error } from "../../utils/custom_error"

const router = Router()

router.post("/add-agents", async (req, res, next) => {
    try {
        await add_agent_service(req)
        res.status(201).json({ message: "successfully added agent" })
    } catch (err) {
        const error = custom_error(err, 400)
        next(error)
    }
})

router.get("/get-agents", async (req, res, next) => {
    try {
        const { result, limit, offset, count } = await get_agents_service(req)
        res.json({ data: result, limit, offset, count })
    } catch (err) {
        const error = custom_error(err, 400)
        next(error)
    }
})

router.delete("/delete-agent/:agent_id", async (req, res, next) => {
    try {
        await delete_agent_service(req)
        res.json({ message: "successfully deleted" })
    } catch (err) {
        const error = custom_error(err, 400)
        next(error)
    }
})

export { router as agent_router }
