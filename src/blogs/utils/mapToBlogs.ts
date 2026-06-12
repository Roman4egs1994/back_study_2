import {BlogDBT, BlogModelT} from "../types/blog.type";


export const mapToBlogs = (blog: BlogDBT): BlogModelT => {

    const {_id, name, description, websiteUrl, createdAt, isMembership} = blog

    return {
        id: _id,
        name,
        description,
        websiteUrl,
        createdAt,
        isMembership
    }
}