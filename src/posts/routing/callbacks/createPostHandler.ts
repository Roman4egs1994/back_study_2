import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";


export const createPost = async (req:Request , res:Response) => {

    try {
        const {blogId, title, shortDescription, content} = req.body
        const post = await postsService.createPostService(blogId, {title, shortDescription, content})
        return res.status(HttpStatuses.CREATED).send(post)
    } catch (e: unknown) {
        return handlerErrors(e, res)
    }
}