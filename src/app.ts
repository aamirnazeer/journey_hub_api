import express, { json } from "express"
import { router } from "./routes"
import { error_handler } from "./middlewares/error_handler"
import { custom_error } from "./utils/custom_error"
import cookie_parse from "cookie-parser"

const app = express()

app.use(json())
app.use(cookie_parse())

app.use("/api", router)

app.all("*", (req, res, next) => {
    const error = custom_error(`${req.originalUrl} route not found`, 404)
    next(error)
})

app.use(error_handler)

export { app }
