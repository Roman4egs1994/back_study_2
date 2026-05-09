
import {Request, Response} from "express";
import {postRepository} from "../../repositoties/posts.repositories";
import {db_posts} from "../../../db/db";
import {PostT} from "../../../core/type/db.type";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";



export const getPosts = (req:Request , res:Response) => {
    return res.status(200).send(postRepository.getAllPosts())
}


export const createPost = (req:Request , res:Response) => {

    const {title, shortDescription, content, blogId} = req.body

    const blog = postRepository.searchBlog(blogId)
    if (!blog) {
        return res.status(HttpStatuses.NOT_FOUND).send('Blog not found')
    }

    const newPostId = db_posts.length > 0 ? Number(db_posts[db_posts.length - 1].id) + 1 : 1

    const newPost: PostT = {
        id: newPostId.toString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName: blog.name
    }

    postRepository.createPost(newPost)

    return res.status(HttpStatuses.CREATED).send(newPost)

}

export const getPostById = (req:Request , res:Response) => {
    const {id} = req.params

    const post = postRepository.searchPost(id as string)

    if (!post) {
        return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
    }

    return res.status(HttpStatuses.OK).send(post)

}

export const updatePost = (req:Request , res:Response) => {
     const {id} = req.params

     const post = postRepository.searchPost(id as string)

     if (!post) {
        return res.status(HttpStatuses.NOT_FOUND).send('Post not found')
     }

     const {title, shortDescription, content, blogId} = req.body

     const updatedPost = postRepository.update(post, {title, shortDescription, content, blogId})

     return res.status(HttpStatuses.NO_CONTENT).send()


}

export const deletePost = (req:Request,res: Response) => {
    const {id} = req.params
    postRepository.delete(id as string)
    return res.status(HttpStatuses.NO_CONTENT).send()

}
