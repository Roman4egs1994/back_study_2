import {postRepository} from "../../repositoties/posts.repositories";
import {PostQueryInput} from "../../routing/inputsPost";
import {PostBDType, PostModelT, PostQueryResponse, PostUpdateT} from "../../types/posts.type";
import {mapToPost, mapToPostsQueryResponse} from "../../utils/mapToPost";
import {blogsService} from "../../../blogs/application/services/blogs.service";


export const postsService = {

    getAndFindArrayPostsService: async (queryDto: PostQueryInput, blogId?: string): Promise<PostQueryResponse> => {
        const {items, totalCount} = await postRepository.getAndFindArrayPostsRepo(queryDto, blogId)
        return mapToPostsQueryResponse(items, totalCount, queryDto)
    },

    createPostService: async (blogId: string, dto: Pick<PostBDType, 'title' | 'shortDescription' | 'content'>): Promise<PostModelT> => {
        const blog = await blogsService.findByIdBlogOrFail(blogId)
        const newPost = await postRepository.createPost({
            ...dto,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        })
        return mapToPost(newPost)
    },
    findByIdPostOrFail: async (id: string): Promise<PostModelT> => {
        const post = await postRepository.searchPost(id)
        return mapToPost(post)
    },

    updatePostService: async (id: string, dto: PostUpdateT): Promise<void> => {
        await blogsService.findByIdBlogOrFail(dto.blogId)
        await postRepository.searchPost(id)
        await postRepository.update(id, dto)
    },

    deletePostService: async (id: string): Promise<void> => {
        await postRepository.searchPost(id)
        await postRepository.delete(id)
    }

}
