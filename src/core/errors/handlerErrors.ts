import {RepositoryNotFoundError} from "./repository-not-found";
import {HttpStatuses} from "../middlewares/type/HttpStatuses";
import {createErrorResponse} from "../middlewares/validations/createErrorResponse";
import {Response} from "express";
import {DomainError} from "./domain.error";


export const handlerErrors  = (error: unknown, res: Response) => {
    if(error instanceof RepositoryNotFoundError) {
        const httpStatus = HttpStatuses.NOT_FOUND

        res.status(httpStatus).send(
            createErrorResponse({ field: '', detail: 'Blog not found', status: httpStatus })
        )
      return
    }

    if (error instanceof DomainError) {
        const httpStatus = HttpStatuses.UNPROCESSABLE_ENTITY;

        res.status(httpStatus).send(
            createErrorResponse({
                field: '',
                status: httpStatus,
                source: error.source,
                detail: error.message,
                code: error.code,
            }),
        );

        return;
    }

    res.status(HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error')
    return
}