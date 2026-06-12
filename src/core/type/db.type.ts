import {BlogDBT} from "../../blogs/types/blog.type";


export type BlogArrayT = Array<BlogDBT>

export type PostT = {
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
    blogName: string //нужно обновить если у блога имя обновляли
    createdAt: string
    isMembership: false
}

export type PostUpdateT = {
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
}

export type PostArrayT = Array<PostT>