import {postRepository} from "../../repositoties/posts.repositories";
import {PostQueryInput} from "../../routing/inputsPost";
import {PostBDType, PostModelT, PostQueryResponse, PostUpdateT} from "../../types/posts.type";
import {mapToPost, mapToPostsQueryResponse} from "../../utils/mapToPost";
import {blogsService} from "../../../blogs/application/services/blogs.service";


export const postsService = {

    getAndFindArrayPostsService: async (queryDto: PostQueryInput): Promise<PostQueryResponse> => {
        const {items, totalCount} = await postRepository.getAndFindArrayPostsRepo(queryDto)
        return mapToPostsQueryResponse(items, totalCount, queryDto)
    },

    createPostService: async (dto: Omit<PostBDType, '_id'>) : Promise<PostModelT> => {
        const newPost = await postRepository.createPost(dto)
        return mapToPost(newPost)
    },
    findByIdPostOrFail: async (id: string): Promise<PostModelT> => {
        const post = await postRepository.searchPost(id)
        return mapToPost(post)
    },

    updatePostService: async (id: string, dto: PostUpdateT): Promise<PostModelT> => {
        await blogsService.findByIdBlogOrFail(dto.blogId)
        await postRepository.searchPost(id)
        const updated = await postRepository.update(id, dto)
        return mapToPost(updated)
    },

    deletePostService: async (id: string): Promise<void> => {
        await postRepository.searchPost(id)
        await postRepository.delete(id)
    }

}
