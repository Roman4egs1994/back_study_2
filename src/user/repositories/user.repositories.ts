import {ObjectId} from "mongodb";
import { UserDtoT} from "../types/user.type";
import {usersCollection} from "../../db/mongo.db";


export const userRepository = {


    async createUser(userDto: UserDtoT, salt: string): Promise<ObjectId> {
        const result = await usersCollection.insertOne({
            _id: new ObjectId(),
            login: userDto.login,
            email: userDto.email,
            password: userDto.password,
            createdAt: new Date().toISOString(),
            salt
        })
        return result.insertedId
    },

    async checkEmailExists(email: string): Promise<boolean> {
        const user = await usersCollection.findOne({ email })
        return !!user
    },

    async checkLoginExists(login: string): Promise<boolean> {
        const user = await usersCollection.findOne({ login })
        return !!user
    },

    async deleteUser(id: string) {
        const user = await usersCollection.deleteOne({id})
        return user
    }
}