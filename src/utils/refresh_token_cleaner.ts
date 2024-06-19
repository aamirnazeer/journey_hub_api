import prisma from "./prisma_client"

export const refresh_token_cleaner = async () => {
    const now = new Date()
    await prisma.refresh_tokens.deleteMany({
        where: { expires_on: { lt: now } },
    })
}
