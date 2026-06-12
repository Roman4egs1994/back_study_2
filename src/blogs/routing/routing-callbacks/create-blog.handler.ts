import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {blogsService} from "../../application/services/blogs.service";
import {mapToBlogs} from "../../utils/mapToBlogs";
import {handlerErrors} from "../../../core/errors/handlerErrors";

export const createBlog = async (req:Request , res:Response) => {

    try {
        const {name, description, websiteUrl} = req.body

        const blog = await blogsService.createBlogService({name, description, websiteUrl})
        const blogMap = mapToBlogs(blog)
        return res.status(HttpStatuses.CREATED).send(blogMap)
        
    }  catch (e:unknown) {
        handlerErrors(e,res)
    }
}