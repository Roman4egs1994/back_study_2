import {blogsCollection, postsCollection, usersCollection} from "../../db/mongo.db";


export const testRepositories = {
    deleteAllData: async () => {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
    }
}