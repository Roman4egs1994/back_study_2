import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {blogsService} from "../../../blogs/application/services/blogs.service";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";


export const createPost = async (req:Request , res:Response) => {

    try {
        const blog = await blogsService.findByIdBlogOrFail(req.body.blogId)

        const newPost = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }

        const post = await postsService.createPostService(newPost)

        return res.status(HttpStatuses.CREATED).send(post)

    } catch (e: unknown) {
        return handlerErrors(e,res)
    }
}