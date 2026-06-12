import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blogs.repositories";


import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {postRepository} from "../../../posts/repositoties/posts.repositories";
import {BlogDBT} from "../../types/blog.type";

export const getBlogs =  async (req:Request , res:Response) => {
    const allBlogs = await blogRepository.sendAllBlogs()

    return res.status(200).send(allBlogs)
}

export const createBlog = async (req:Request , res:Response) => {
    const {name, description, websiteUrl} = req.body


    const addBlog: Omit<BlogDBT, "_id"> = {
     name,
     description,
     websiteUrl,
     isMembership: false,
     createdAt: new Date().toISOString(),
    }

    const  blog = await blogRepository.createBlog(addBlog)
    console.log(blog)
    return res.status(HttpStatuses.CREATED).send(blog)

}


export const getByIdBlog = async (req:Request,res:Response) => {

    try {
        const {id} = req.params

        const blog = await blogRepository.getById(id as string)

        if (!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
        }
        return res.status(HttpStatuses.OK).send(blog)
    } catch (error) {
        console.error('Error getting blog by ID:', error)
        return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error')
    }
}

export const updateBlog = async (req:Request,res:Response) => {
    const {name,description, websiteUrl} = req.body
     try {
         const blog = await blogRepository.getById(req.params.id as string)
         if(!blog) {
             return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
         }

         const updatedBlog = await blogRepository.update(req.params.id as string, { name, description, websiteUrl})
         await postRepository.updateBlogName(req.params.id as string, name) //Обновление у всех постов  blogName

         console.log(updatedBlog)
         return res.status(HttpStatuses.NO_CONTENT).send(updatedBlog)

     } catch (error) {
        console.error('Error updating blog:', error)
        return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error')
    }

}

export const deleteBlog = async (req:Request,res:Response) => {
     try {
         const blog = await blogRepository.getById(req.params.id as string)
         if(!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
         }
         await blogRepository.delete(req.params.id as string)
         return res.status(HttpStatuses.NO_CONTENT).send()
     } catch (error) {
        console.error('Error deleting blog:', error)
        return res.status(HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error')
     }
}