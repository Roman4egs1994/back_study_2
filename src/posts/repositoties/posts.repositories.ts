import { postsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {PostModelT, PostUpdateT} from "../types/posts.type";
import {mapToPost} from "../utils/mapToPost";
import {PostBDType} from "../types/posts.type";
import {PostQueryInput} from "../routing/inputsPost";
import {skipPagination} from "../../core/utils/skipPagination";
import {SortDirection} from "../../core/type/paginationAndSorting.types";







export const postRepository = {

    getAndFindArrayPostsRepo: async (queryDto: PostQueryInput): Promise<{items: PostBDType[], totalCount: number}> => {

        const {pageNumber, pageSize, sortBy, sortDirection} = queryDto
        const skip = skipPagination(pageNumber, pageSize)

        const items  = await postsCollection
            .find()
            .sort({[sortBy]: sortDirection === SortDirection.DESC ? -1 : 1})
            .skip(skip)
            .limit(pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments()

        return {items, totalCount}
    },

    searchPost: async (postId: string): Promise<PostModelT | null> => {
        const post = await postsCollection.findOne({ _id: new ObjectId(postId) })
        return post ? mapToPost(post) : null
    },

    createPost: async (post: Omit<PostBDType, '_id'>): Promise<PostModelT> => {
        const insertResult = await postsCollection.insertOne(post as PostBDType)
        return mapToPost({...post, _id: insertResult.insertedId})
    },

    update: async (id: string, updateData: PostUpdateT): Promise<PostModelT | null> => {
        await postsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
        const updated = await postsCollection.findOne({ _id: new ObjectId(id) })
        return updated ? mapToPost(updated) : null
    },

    updateBlogName: async (blogId: string, blogName: string) => {
        await postsCollection.updateMany({ blogId }, { $set: { blogName } })
    },

    delete: async (postId: string): Promise<void> => {
        await postsCollection.deleteOne({ _id: new ObjectId(postId) })
    }
}
