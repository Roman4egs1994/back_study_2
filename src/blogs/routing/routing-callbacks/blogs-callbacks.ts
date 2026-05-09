import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blogs.repositories";
import {db_blogs} from "../../../db/db";
import {BlogT} from "../../../core/type/db.type";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";

export const getBlogs = (req:Request , res:Response) => {
 return res.status(200).send(blogRepository.sendAllBlogs())
}

export const createBlog = (req:Request , res:Response) => {
    const {name, description, websiteUrl} = req.body

    const id = db_blogs.length > 0 ? Number(db_blogs[db_blogs.length - 1].id) + 1 : 1
    const addBlog: BlogT = {
     id: id.toString(),
     name,
     description,
     websiteUrl
    }

    blogRepository.createBlog(addBlog)

    return res.status(HttpStatuses.CREATED).send(addBlog)

}


export const getByIdBlog = (req:Request,res:Response) => {
    const {id} = req.params

    const blog = blogRepository.getById(id as string)

    if (!blog) {
        return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
    }
    return res.status(HttpStatuses.OK).send(blog)
}

export const updateBlog = (req:Request,res:Response) => {
    const {name,description, websiteUrl} = req.body

    const blog = blogRepository.getById(req.params.id as string)
    if(!blog) {
        return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
    }
    const updatedBlog = blogRepository.update(blog, {id: blog.id, name, description, websiteUrl})

    return res.status(HttpStatuses.OK).send(updatedBlog)

}

export const deleteBlog = (req:Request,res:Response) => {
     const blog = blogRepository.getById(req.params.id as string)
     if(!blog) {
        return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
     }
     blogRepository.delete(req.params.id as string)
     return res.status(HttpStatuses.OK).send('Blog deleted')
}