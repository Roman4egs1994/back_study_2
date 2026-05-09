import {validationResult} from "express-validator";
import type {Request, Response} from  "express";
import {NextFunction} from "express";
import {HttpStatuses} from "../type/HttpStatuses";
import {formatErrors} from "./formatErrors";



export const validateResponse = (statusCode = HttpStatuses.BAD_REQUEST) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).formatWith(formatErrors).array({
            onlyFirstError: true
        });

        if (errors.length > 0) {
            return res.status(statusCode).json({ errors });
        }

        next();
    };
};
