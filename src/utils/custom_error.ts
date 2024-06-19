import { custom_error_type } from "../types"

function is_custom_error(error: any): error is custom_error_type {
    return typeof error.message === "string"
}

export const custom_error = (err: unknown, statusCode?: number, status?: string) => {
    let error: custom_error_type
    if (is_custom_error(err)) {
        error = new Error(err.message)
    } else if (typeof err === "string") {
        error = new Error(err)
        return error
    } else {
        error = new Error("something went wrong")
        return error
    }
    error.statusCode = statusCode
    error.status = status
    return error
}
