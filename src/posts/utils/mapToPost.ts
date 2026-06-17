import {PostBDType, PostModelT, PostQueryResponse} from "../types/posts.type";
import {PostQueryInput} from "../routing/inputsPost";

export const mapToPost = (post: PostBDType): PostModelT => {
    const {_id, title, shortDescription, blogId, content, blogName, createdAt} = post

    return {
        id: _id.toString(),
        title,
        shortDescription,
        blogId,
        content,
        blogName,
        createdAt,
    }
}

export const mapToPostsQueryResponse = (
    items: PostBDType[],
    totalCount: number,
    queryDto: PostQueryInput,
): PostQueryResponse => ({
    pagesCount: Math.ceil(totalCount / queryDto.pageSize),
    page: queryDto.pageNumber,
    pageSize: queryDto.pageSize,
    totalCount,
    items: items.map(mapToPost),
})
