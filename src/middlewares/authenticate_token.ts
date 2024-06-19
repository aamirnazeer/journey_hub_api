import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { custom_error } from "../utils/custom_error"
import prisma from "../utils/prisma_client"
import { generate_access_token } from "../routes/auth/helper"

declare global {
    namespace Express {
        export interface Request {
            current_user?: any
        }
    }
}

export const authenticate_token = (req: Request, res: Response, next: NextFunction) => {
    const { access_token, refresh_token } = req.cookies
    if (!access_token && !refresh_token) throw custom_error("cookies missing", 403)

    if (!process.env.ACCESS_TOKEN_SECRET) throw custom_error("ACCESS_TOKEN_SECRET missing", 403)

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, async (err: any, user: any) => {
        if (err) {
            if (err.message === "jwt expired") {
                const a = await prisma.refresh_tokens.findFirst({
                    where: { token: refresh_token },
                })
                if (!a) {
                    res.clearCookie("access_token")
                    res.clearCookie("refresh_token")
                    const error = custom_error("refresh token tampered", 403)
                    next(error)
                    return
                }
                if (!process.env.REFRESH_TOKEN_SECRET) throw custom_error("ACCESS_TOKEN_SECRET missing", 403)

                jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err: any, user: any) => {
                    if (user) {
                        const new_access_token = generate_access_token({
                            username: user.username,
                            generated_by: "auth-middleware",
                        })
                        res.cookie("access_token", new_access_token, {
                            httpOnly: true,
                        })
                        next()
                    }
                    if (err) {
                        res.clearCookie("access_token")
                        res.clearCookie("refresh_token")
                        const error = custom_error("refreshtoken invalid", 403)
                        next(error)
                    }
                })
            } else {
                res.clearCookie("access_token")
                res.clearCookie("refresh_token")
                const error = custom_error("access token tampered", 403)
                next(error)
            }
        } else {
            req.current_user = user
            next()
        }
    })
}
