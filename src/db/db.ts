import {BlogArrayT, PostArrayT} from "../core/type/db.type";


export const db_blogs : BlogArrayT = [
    {
        id: '1',
        name: "Blog 1",
        description: "Description 1",
        websiteUrl: "https://blog1.com"
    }
]


export const db_posts : PostArrayT = [
    {
        id: '1',
        title: 'Post 1',
        shortDescription: 'Short description 1',
        blogId: '1',
        blogName: 'Blog 1',
        content: 'Content 1'
    }
]