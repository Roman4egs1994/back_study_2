import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {blogsService} from "../../application/services/blogs.service";
import {mapToBlogs} from "../../utils/mapToBlogs";



export const updateBlog = async (req:Request,res:Response) => {

    try {

          const {name, description, websiteUrl} = req.body
          const {id} = req.params
          const blog = await blogsService.updateBlogService(id as string, { name, description, websiteUrl })

          return res.status(HttpStatuses.OK).send(mapToBlogs(blog))

    } catch (error) {
        handlerErrors(error,res)
    }

}