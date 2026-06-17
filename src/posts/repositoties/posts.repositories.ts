import { postsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {PostUpdateT} from "../types/posts.type";
import {PostBDType} from "../types/posts.type";
import {PostQueryInput} from "../routing/inputsPost";
import {skipPagination} from "../../core/utils/skipPagination";
import {SortDirection} from "../../core/type/paginationAndSorting.types";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found";







export const postRepository = {

    getAndFindArrayPostsRepo: async (queryDto: PostQueryInput, blogId?: string): Promise<{items: PostBDType[], totalCount: number}> => {

        const {pageNumber, pageSize, sortBy, sortDirection} = queryDto
        const skip = skipPagination(pageNumber, pageSize)

        const filter = blogId ? { blogId } : {}

        const items  = await postsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === SortDirection.DESC ? -1 : 1})
            .skip(skip)
            .limit(pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments(filter)

        return {items, totalCount}
    },

    searchPost: async (postId: string): Promise<PostBDType> => {
        const post = await postsCollection.findOne({ _id: new ObjectId(postId) })
        if(!post) {
           throw new RepositoryNotFoundError('Post not found')
        }
        return post
    },

    createPost: async (post: Omit<PostBDType, '_id'>): Promise<PostBDType> => {
        const insertResult = await postsCollection.insertOne(post as PostBDType)
        return {...post, _id: insertResult.insertedId}
    },

    update: async (id: string, updateData: PostUpdateT): Promise<void> => {
        await postsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    },

    updateBlogName: async (blogId: string, blogName: string) => {
        await postsCollection.updateMany({ blogId }, { $set: { blogName } })
    },

    delete: async (postId: string): Promise<void> => {
        await postsCollection.deleteOne({ _id: new ObjectId(postId) })
    }
}
