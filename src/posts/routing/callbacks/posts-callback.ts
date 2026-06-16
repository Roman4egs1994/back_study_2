
import {Request, Response} from "express";
import {postRepository} from "../../repositoties/posts.repositories";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {blogRepository} from "../../../blogs/repositories/blogs.repositories";

import {createErrorResponse} from "../../../core/middlewares/validations/createErrorResponse";
import {PostBDType,  PostUpdateT} from "../../types/posts.type";


// export const getPosts = async (req:Request , res:Response) => {
//
//     const posts = await postRepository.getAllPosts()
//     return res.status(200).send(posts)
// }

export const createPost = async (req:Request , res:Response) => {

    try {
        const {title, shortDescription, content, blogId} = req.body
        const blog =  await blogRepository.findByIdBlogOrFail(blogId)

        if (!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
        }

        const newPost: Omit<PostBDType, '_id'> = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
            // isMembership: false
        }

        const post = await postRepository.createPost(newPost)

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

        const blog = await blogRepository.findByIdBlogOrFail(blogId as string)
        if (!blog) {
            return res.status(HttpStatuses.NOT_FOUND).send(
                createErrorResponse({ field: 'blogId', detail: 'Blog not found', status: HttpStatuses.NOT_FOUND })
            )
        }

        const {id} = req.params
        const post = await postRepository.searchPost(id as string)
        if (!post) {
            return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
        }

        const updatedPost = await postRepository.update(id as string, {title, shortDescription, content, blogId})

        return res.status(HttpStatuses.NO_CONTENT).send(updatedPost)
    } catch (e) {

    }

}

export const deletePost = async (req:Request,res: Response) => {
    const {id} = req.params

    const post = await postRepository.searchPost(id as string)
    if (!post) {
        return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
    }

    await postRepository.delete(id as string)
    return res.status(HttpStatuses.NO_CONTENT).send()
}
