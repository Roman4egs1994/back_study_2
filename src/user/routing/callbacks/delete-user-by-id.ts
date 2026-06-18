import {UserModelT} from "../../types/user.type";
import {Request,Response} from "express";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {userService} from "../../application/services/user.service";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";




export const deleteUserById = async (req: Request, res: Response<UserModelT>) => {
    try {
        await userService.delUserService(req.params.id as string)
        return res.status(HttpStatuses.NO_CONTENT).send()
    }catch (e: unknown) {
        handlerErrors(e,res)
    }
}