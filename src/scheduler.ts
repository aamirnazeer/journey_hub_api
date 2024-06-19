import cron from "node-cron"
import { refresh_token_cleaner } from "./utils/refresh_token_cleaner"

export const refresh_token_cleaner_job = cron.schedule(
    "0 * * * *",
    async () => {
        await refresh_token_cleaner()
        console.log("refresh_token cleaning done")
    },
    {
        scheduled: true,
    },
)
