import { ErrorRequestHandler } from "express"

export const error_handler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.status || "error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    })
}
