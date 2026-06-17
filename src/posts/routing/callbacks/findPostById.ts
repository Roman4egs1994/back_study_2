import {Request, Response} from "express";
import {postRepository} from "../../repositoties/posts.repositories";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";


export const findPostById = async (req:Request , res:Response) => {

    try {
        const {id} = req.params
        const post = await postsService.findByIdPostOrFail(id as string)
        return res.status(HttpStatuses.OK).send(post)

    } catch (e: unknown) {
      handlerErrors(e, res)
    }
}