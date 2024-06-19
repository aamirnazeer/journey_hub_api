import Router from "express"
import { custom_error } from "../../utils/custom_error"
import { sign_in_service, sing_up_service, sing_out_service } from "./service"
import { auth_route_middleware } from "./middleware"

const router = Router()

router.post("/sign-in", auth_route_middleware, async (req, res, next) => {
    try {
        await sign_in_service(req, res)
        res.json({ message: "login success" })
    } catch (err) {
        const error = custom_error(err, 400)
        next(error)
    }
})

router.post("/sign-up", async (req, res, next) => {
    try {
        await sing_up_service(req, res)
        res.json({ message: "successfully created" })
    } catch (err) {
        const error = custom_error(err, 400)
        next(error)
    }
})

router.post("/sign-out", async (req, res, next) => {
    try {
        await sing_out_service(req, res)
        res.json({ message: "successfully logged out" })
    } catch (err) {
        const error = custom_error(err, 400)
        next(error)
    }
})

export { router as auth_router }
