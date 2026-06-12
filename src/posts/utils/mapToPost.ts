import {PostBDType, PostModelT} from "../types/posts.type";


export const mapToPost = (post: PostBDType): PostModelT => {
    const {_id, title, shortDescription, blogId, content, blogName, createdAt, isMembership} = post

    return {
        id: _id.toString(),
        title,
        shortDescription,
        blogId,
        content,
        blogName,
        createdAt,
        isMembership
    }
}