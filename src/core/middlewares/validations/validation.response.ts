import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import type {Request, Response} from  "express";
import {NextFunction} from "express";
import {HttpStatuses} from "../type/HttpStatuses";
import {ValidationErrorListOutput, ValidationErrorType} from "../../type/errors.types";


export const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorListOutput => {
    return {
        errorsMessages: errors.map((error) => ({
            message: error.detail,
            field: error.source ?? '',
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


// OLD format: { errors: [{ status, detail, source: { pointer }, code }] }
// NEW format: { errorsMessages: [{ message, field }] }
// Изменено чтобы соответствовать стандарту API курса (IT Incubator)
export const validateResponseMiddlewareOld = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).formatWith(formaValidationError).array({
            onlyFirstError: true
        });

        if (errors.length > 0) {
            res.status(HttpStatuses.BAD_REQUEST).json({
                errors: errors.map((error) => ({
                    status: error.status,
                    detail: error.detail,
                    source: { pointer: error.source ?? '' },
                    code: error.code ?? null,
                })),
            });
            return;
        }

        next();
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


