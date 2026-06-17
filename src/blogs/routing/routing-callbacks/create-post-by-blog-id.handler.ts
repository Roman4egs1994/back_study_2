import {handlerErrors} from "../../../core/errors/handlerErrors";
import {Request, Response} from "express";
import {postsService} from "../../../posts/application/services/posts.service";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";


export const createPostByBlogId = async (req:Request, res:Response) => {
    try {
        const {id} = req.params
        const {title, content, shortDescription} = req.body
        const post = await postsService.createPostService(id as string, {title, content, shortDescription})
        return res.status(HttpStatuses.CREATED).send(post)
    } catch (e: unknown) {
        handlerErrors(e, res)
    }
}