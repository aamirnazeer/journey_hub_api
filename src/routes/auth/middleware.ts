import { Request, Response, NextFunction } from "express"
import { custom_error } from "../../utils/custom_error"

export const auth_route_middleware = (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.cookies
    if (!access_token) {
        next()
    } else {
        throw custom_error("user already logged in", 400)
    }
}
