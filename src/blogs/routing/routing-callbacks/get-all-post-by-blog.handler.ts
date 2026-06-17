import {handlerErrors} from "../../../core/errors/handlerErrors";
import {Request, Response} from "express";
import {postsService} from "../../../posts/application/services/posts.service";
import {mapQueryPostParam} from "../../../posts/utils/mapQueryPostParam";
import {blogsService} from "../../application/services/blogs.service";


export const getAllPostByBlogId = async (req:Request, res:Response) => {
    try {
        const {id} = req.params as {id: string}
        await blogsService.findByIdBlogOrFail(id)
        const queryDto = mapQueryPostParam(req.query)
        const posts = await postsService.getAndFindArrayPostsService(queryDto, id)
        return res.status(200).send(posts)
    } catch (e: unknown) {
        handlerErrors(e, res)
    }
}