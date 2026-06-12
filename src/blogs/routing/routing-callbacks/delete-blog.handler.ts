import {Request, Response} from "express";
import {blogRepository} from "../../repositories/blogs.repositories";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {handlerErrors} from "../../../core/errors/handlerErrors";


export const deleteBlog = async (req:Request,res:Response) => {
    try {
        await blogRepository.findByIdBlogOrFail(req.params.id as string)

        await blogRepository.delete(req.params.id as string)
        return res.status(HttpStatuses.NO_CONTENT).send()
    } catch (error) {
        handlerErrors(error,res)
    }
}