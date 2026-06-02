// import {db_posts} from "../../db/db";
import {PostT, PostUpdateT} from "../../core/type/db.type";
import { postsCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";



export const postRepository = {


    getAllPosts: async (): Promise<PostT[]> => {
        return await postsCollection.find().toArray()
    },

    searchPost: async (postId: string): Promise<PostT | null> => {
        return await postsCollection.findOne({ _id: new ObjectId(postId) })
    },
    createPost: async (post: PostT) => {
        const insertResult = await postsCollection.insertOne(post)
        return {...post, _id: insertResult.insertedId}
    },
    update: async (post: PostT, updateData: PostUpdateT) => {

        return post;
    },
    delete: (postId: string) => {
        // db_posts.splice(db_posts.findIndex(p => p.id === postId), 1);
         postsCollection.deleteOne({ _id: new ObjectId(postId) })
    }
}