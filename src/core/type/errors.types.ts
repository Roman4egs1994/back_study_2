import {HttpStatuses} from "../middlewares/type/HttpStatuses";

type ValidationErrorOutput = {
    status: HttpStatuses;
    detail: string;
    source: { pointer: string };
    code: string | null;
};

export type ValidationErrorListOutput = { errors: ValidationErrorOutput[] };


export type ValidationErrorType = {
    status: HttpStatuses;
    detail: string;
    source?: string;
    code?: string;
};