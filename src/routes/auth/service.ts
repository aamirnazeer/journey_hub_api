import { Request, Response } from "express"
import { signin_schema, signup_schema } from "./validation"
import {
    add_refresh_token_controller,
    previous_user_controller,
    sign_out_controller,
    sign_up_controller,
} from "./controller"
import { generate_access_token, generate_refresh_token, password_hasher, password_matcher } from "./helper"

export const sign_in_service = async (req: Request, res: Response) => {
    const { value, error } = signin_schema.validate(req.body)
    if (error) throw new Error(error.details[0].message)
    const previous_user = await previous_user_controller(value.username)
    if (previous_user === null) throw new Error("wrong credentials")
    const password_match = await password_matcher(previous_user.password, value.password)
    if (!password_match) throw new Error("wrong credentials")
    const filtered_user = {
        username: previous_user.username,
        generated_by: "auth-route",
    }
    const access_token = generate_access_token(filtered_user)
    const refresh_token = await generate_refresh_token(filtered_user)
    await add_refresh_token_controller(refresh_token)
    res.cookie("access_token", access_token, { httpOnly: true })
    res.cookie("refresh_token", refresh_token, { httpOnly: true })
}

export const sing_up_service = async (req: Request, res: Response) => {
    const { value, error } = signup_schema.validate(req.body)
    if (error) throw new Error(error.details[0].message)
    const previous_user = await previous_user_controller(value.username)
    if (previous_user !== null) throw new Error("username not available")
    value.password = await password_hasher(value.password)
    const created_user = await sign_up_controller(value)
    const filtered_user = {
        username: created_user.username,
        generated_by: "auth-route",
    }
    const access_token = generate_access_token(filtered_user)
    const refresh_token = await generate_refresh_token(filtered_user)
    await add_refresh_token_controller(refresh_token)
    res.cookie("access_token", access_token, { httpOnly: true })
    res.cookie("refresh_token", refresh_token, { httpOnly: true })
}

export const sing_out_service = async (req: Request, res: Response) => {
    const { refresh_token } = req.cookies
    if (!refresh_token) throw new Error("logged out already")
    await sign_out_controller(refresh_token)
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
}
