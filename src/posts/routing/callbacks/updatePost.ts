import {Request, Response} from "express";
import {PostUpdateT} from "../../types/posts.type";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";

export const updatePost = async (req:Request , res:Response) => {
    try {
        const {id} = req.params as {id: string}
        await postsService.updatePostService(id, req.body as PostUpdateT)
        return res.status(HttpStatuses.NO_CONTENT).send()
    } catch (e: unknown) {
        handlerErrors(e, res)
    }
}