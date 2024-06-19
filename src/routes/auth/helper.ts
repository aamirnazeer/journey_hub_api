import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const password_hasher = async (data: string) => {
    return bcrypt.hash(data, 10)
}

export const password_matcher = async (db_password: string, password: string) => {
    return await bcrypt.compare(password, db_password)
}

export const generate_access_token = (user: any) => {
    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET not defined")
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    })
}

export const generate_refresh_token = async (user: any) => {
    if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET not defined")

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    })
}
