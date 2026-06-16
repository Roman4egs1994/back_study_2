import {BlogDBT, BlogModelT, BlogQueryResponse} from "../types/blog.type";
import {BlogQueryInput} from "../routing/inputs";

export const mapToBlogs = (blog: BlogDBT): BlogModelT => {
    const {_id, name, description, websiteUrl, createdAt, isMembership} = blog

    return {
        id: _id.toString(),
        name,
        description,
        websiteUrl,
        createdAt,
        isMembership
    }
}

export const mapToBlogsQueryResponse = (
    items: BlogDBT[],
    totalCount: number,
    queryDto: BlogQueryInput,
): BlogQueryResponse => ({
    pagesCount: Math.ceil(totalCount / queryDto.pageSize),
    page: queryDto.pageNumber,
    pageSize: queryDto.pageSize,
    totalCount,
    items: items.map(mapToBlogs),
})
