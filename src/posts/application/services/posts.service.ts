import {postRepository} from "../../repositoties/posts.repositories";
import {PostQueryInput} from "../../routing/inputsPost";
import {PostQueryResponse} from "../../types/posts.type";
import {mapToPostsQueryResponse} from "../../utils/mapToPost";


export const postsService = {

    getAndFindArrayPostsService: async (queryDto: PostQueryInput): Promise<PostQueryResponse> => {
        const {items, totalCount} = await postRepository.getAndFindArrayPostsRepo(queryDto)
        return mapToPostsQueryResponse(items, totalCount, queryDto)
    },

}
