import {Request, Response} from "express";
import {blogRepository} from "../../repositories/blogs.repositories";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {mapToBlogs} from "../../utils/mapToBlogs";
import {handlerErrors} from "../../../core/errors/handlerErrors";

export const getByIdBlog = async (req:Request,res:Response) => {

    try {
        const {id} = req.params

        const blog = await blogRepository.findByIdBlogOrFail(id as string)

        return res.status(HttpStatuses.OK).send(mapToBlogs(blog))
    } catch (error: unknown) {
        handlerErrors(error,res)
    }
}