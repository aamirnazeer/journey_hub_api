import { Router } from "express"
import { agent_router } from "./agents/handler"
import { auth_router } from "./auth/handler"
import { authenticate_token } from "../middlewares/authenticate_token"

const router = Router()

router.use("/agents", authenticate_token, agent_router)
router.use("/auth", auth_router)

export { router }
