import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {authService} from "../../application/auth.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const success = await authService.login(req.body)
        if (!success) {
            return res.sendStatus(HttpStatuses.UNAUTHORIZED)
        }
        return res.sendStatus(HttpStatuses.NO_CONTENT)
    } catch (e: unknown) {
        handlerErrors(e, res)
    }
}
