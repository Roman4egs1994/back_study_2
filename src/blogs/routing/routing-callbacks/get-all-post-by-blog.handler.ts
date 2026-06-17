import {handlerErrors} from "../../../core/errors/handlerErrors";
import {Request, Response} from "express";
import {postsService} from "../../../posts/application/services/posts.service";
import {mapQueryPostParam} from "../../../posts/utils/mapQueryPostParam";


export const getAllPostByBlogId = async (req:Request, res:Response) => {
    try {
        const {id} = req.params
        const queryDto = mapQueryPostParam(req.query)

        const posts = await postsService.getAndFindArrayPostsService(queryDto, id as string)
        return res.status(200).send(posts)
    } catch (e: unknown) {
        handlerErrors(e, res)
    }
}