import { agent } from "./types"
import prisma from "../../utils/prisma_client"

export const add_agent_controller = async (data: agent) => {
    return prisma.agent.create({ data: { name: data.name } })
}

export const get_agents_controller = async (limit: number, offset: number) => {
    const result = await prisma.agent.findMany({ take: limit, skip: offset })
    const count = await prisma.agent.count()
    return { result, limit, offset, count }
}

export const delete_agent_controller = async (agent_id: string) => {
    await prisma.agent.delete({ where: { id: agent_id } })
}
