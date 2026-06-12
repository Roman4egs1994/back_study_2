import {Request, Response} from "express";
import {blogRepository} from "../../repositories/blogs.repositories";
import {mapToBlogs} from "../../utils/mapToBlogs";
import {handlerErrors} from "../../../core/errors/handlerErrors";


export const getBlogs =  async (req:Request , res:Response) => {

    try {
        const allBlogs = await blogRepository.sendAllBlogs()
        return res.status(200).send(allBlogs.map(mapToBlogs))
    } catch (e) {
        handlerErrors(e,res)
    }


}