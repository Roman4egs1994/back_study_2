import { postsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {PostModelT, PostUpdateT} from "../types/posts.type";
import {mapToPost} from "../utils/mapToPost";
import {PostBDType} from "../types/posts.type";



export const postRepository = {

    getAllPosts: async (): Promise<PostModelT[]> => {
        const posts = await postsCollection.find().toArray()
        return posts.map(mapToPost)
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

    delete: (postId: string) => {
        postsCollection.deleteOne({ _id: new ObjectId(postId) })
    }
}
