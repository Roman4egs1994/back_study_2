import {HttpStatuses} from "../middlewares/type/HttpStatuses";

type ValidationErrorOutput = {
    message: string;
    field: string;
};

export type ValidationErrorListOutput = { errorsMessages: ValidationErrorOutput[] };


export type ValidationErrorType = {
    status: HttpStatuses;
    detail: string;
    source?: string;
    code?: string;
};