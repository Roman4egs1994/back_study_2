import {postRepository} from "../../repositoties/posts.repositories";
import {PostQueryInput} from "../../routing/inputsPost";
import {PostBDType, PostModelT, PostQueryResponse} from "../../types/posts.type";
import {mapToPost, mapToPostsQueryResponse} from "../../utils/mapToPost";


export const postsService = {

    getAndFindArrayPostsService: async (queryDto: PostQueryInput): Promise<PostQueryResponse> => {
        const {items, totalCount} = await postRepository.getAndFindArrayPostsRepo(queryDto)
        return mapToPostsQueryResponse(items, totalCount, queryDto)
    },

    createPostService: async (dto: Omit<PostBDType, '_id'>) : Promise<PostModelT> => {
        const newPost = await postRepository.createPost(dto)
        return mapToPost(newPost)
    }

}
