type ErrorItem = {
    field: string
    message: string
}

export const createErrorResponse = (...errors: ErrorItem[]) => ({
    errorsMessages: errors
})
