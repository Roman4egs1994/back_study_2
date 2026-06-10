
import {Request, Response} from "express";
import {postRepository} from "../../repositoties/posts.repositories";
import {PostT} from "../../../core/type/db.type";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {blogRepository} from "../../../blogs/repositories/blogs.repositories";
import {PostUpdateT} from "../../../core/type/db.type";

import {formatErrors} from "../../../core/middlewares/validations/formatErrors";


export const getPosts = async (req:Request , res:Response) => {

    const posts = await postRepository.getAllPosts()
    return res.status(200).send(posts)
}

export const createPost = async (req:Request , res:Response) => {

    try {
        const {title, shortDescription, content, blogId} = req.body
        const blog =  await blogRepository.getById(blogId)

        if (!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
        }

        const newPost: PostT = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const post = await postRepository.createPost(newPost)
        console.log(post)
        return res.status(HttpStatuses.CREATED).send(post)

    } catch (e) {

    }
}

export const getPostById = async (req:Request , res:Response) => {

   try {
       const {id} = req.params
       const post = await postRepository.searchPost(id as string)
       if (!post) {
           return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
       }
       return res.status(HttpStatuses.OK).send(post)

   } catch (e) {

   }



}

export const updatePost = async (req:Request , res:Response) => {
    try {
        const {title, shortDescription, content, blogId} = req.body as PostUpdateT

        const blog = await blogRepository.getById(blogId as string)
        if (!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send(formatErrors([
                {
                    field: 'blogId',
                    message: 'Blog not found'
                }
            ]))
        }

        const {id} = req.params
        const post = await postRepository.searchPost(id as string)
        if (!post) {
            return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
        }

        const updatedPost = await postRepository.update(post, {title, shortDescription, content, blogId})

        return res.status(HttpStatuses.NO_CONTENT).send(updatedPost)
    } catch (e) {

    }

}

export const deletePost = (req:Request,res: Response) => {
    const {id} = req.params
    
    const post = postRepository.searchPost(id as string)
    if (!post) {
        return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
    }
    
    postRepository.delete(id as string)
    return res.status(HttpStatuses.NO_CONTENT).send()

}
