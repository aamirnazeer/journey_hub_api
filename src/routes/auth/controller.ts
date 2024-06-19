import prisma from "../../utils/prisma_client"
import { sign_up_type } from "./types"

export const sign_up_controller = async (data: sign_up_type) => {
    return prisma.user.create({
        data: { username: data.username, password: data.password },
    })
}

export const previous_user_controller = async (data: string) => {
    return prisma.user.findFirst({
        where: {
            username: {
                equals: data,
            },
        },
    })
}

export const add_refresh_token_controller = async (data: string) => {
    const next_day_data = new Date()
    next_day_data.setDate(next_day_data.getDate() + 1)

    await prisma.refresh_tokens.create({
        data: { token: data, expires_on: next_day_data },
    })
}

export const sign_out_controller = async (data: string) => {
    await prisma.refresh_tokens.delete({ where: { token: data } })
}
