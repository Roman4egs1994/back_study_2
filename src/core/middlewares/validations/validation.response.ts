import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import type {Request, Response} from  "express";
import {NextFunction} from "express";
import {HttpStatuses} from "../type/HttpStatuses";
import {ValidationErrorListOutput, ValidationErrorType} from "../../type/errors.types";


export const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorListOutput => {
    return {
        errors: errors.map((error) => ({
            status: error.status,
            detail: error.detail, //error message
            source: { pointer: error.source ?? '' }, //error field
            code: error.code ?? null, //domain error code
        })),
    };
};

const formaValidationError = (error: ValidationError): ValidationErrorType => {
    const expressError = error as unknown as FieldValidationError;

    return {
        status: HttpStatuses.BAD_REQUEST,
        source: expressError.path,
        detail: expressError.msg,
    };
};


export const validateResponseMiddleware = (statusCode = HttpStatuses.BAD_REQUEST) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).formatWith(formaValidationError).array({
            onlyFirstError: true
        });

        if (errors.length > 0) {
            res.status(HttpStatuses.BAD_REQUEST).json(createErrorMessages(errors));
            return;
        }

        next();
    };
};


