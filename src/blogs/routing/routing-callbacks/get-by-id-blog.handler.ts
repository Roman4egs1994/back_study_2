import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {mapToBlogs} from "../../utils/mapToBlogs";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {blogsService} from "../../application/services/blogs.service";

export const getByIdBlog = async (req:Request,res:Response) => {
    try {
        const {id} = req.params
        const blog = await blogsService.findByIdBlogOrFail(id as string)
        if (!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
        }
        return res.status(HttpStatuses.OK).send(mapToBlogs(blog))
    } catch (error: unknown) {
        handlerErrors(error,res)
    }
}