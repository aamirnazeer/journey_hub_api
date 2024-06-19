import { app } from "./app"
import { config } from "dotenv"
import prisma from "./utils/prisma_client"
import { refresh_token_cleaner_job } from "./scheduler"

config()

async function start() {
    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("no ACCESS_TOKEN_SECRET defined")
    try {
        await prisma.$connect()
        refresh_token_cleaner_job.start()
        console.log("connected to db")
    } catch (err) {
        console.log("something went wrong")
    }
    app.listen(4000, () => {
        console.log("Server started on port 4000")
    })
}

start()
