import express from "express";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {userService} from "../../application/services/user.service";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {UserModelT} from "../../types/user.type";
import {Request,Response} from "express";


export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const userDto = req.body
        const user = await userService.createUserService(userDto)
        return res.status(HttpStatuses.CREATED).send(user)
    } catch (e: unknown) {
        handlerErrors(e,res)
    }
}