import {blogsCollection, postsCollection} from "../../db/mongo.db";


export const testRepositories = {
    deleteAllData: async () => {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})
    }
}