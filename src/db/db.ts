import {BlogArrayT, PostArrayT} from "../core/type/db.type";


export const db_blogs : BlogArrayT = [
    {
        name: "Blog 1",
        description: "Description 1",
        websiteUrl: "https://blog1.com",
        isMembership: false,
        createdAt: "2021-03-01T00:00:00.000Z",
    }
]


export const db_posts : PostArrayT = [
    {
        title: 'Post 1',
        shortDescription: 'Short description 1',
        blogId: '1',
        blogName: 'Blog 1',
        content: 'Content 1',
        isMembership: false,
        createdAt: "2021-03-01T00:00:00.000Z",
    }
]