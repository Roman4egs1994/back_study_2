import {HttpStatuses} from "../type/HttpStatuses";

type ErrorItem = {
    field: string
    detail: string
    status: HttpStatuses
    code?: string
    source?: string
}

export const createErrorResponse = (...errors: ErrorItem[]) => ({
    errorsMessages: errors
})
