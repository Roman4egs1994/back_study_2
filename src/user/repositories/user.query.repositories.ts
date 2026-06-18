import {UserDBT, UserQueryResponseT} from "../types/user.type";
import {usersCollection} from "../../db/mongo.db";
import {skipPagination} from "../../core/utils/skipPagination";
import {UserQueryInputT} from "../routing/inputs";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found";

import {ObjectId} from "mongodb";


export const usersQueryRepository = {
    async  getAllUsers(queryDto: UserQueryInputT): Promise<{items: UserDBT[], totalCount: number}> {

        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchLoginTerm,
            searchEmailTerm
        } = queryDto

        const filter: any = {}

        const orConditions = []
        if (searchEmailTerm) {
            orConditions.push({ email: new RegExp(searchEmailTerm, 'i') }) //flag i - case-insensitive (регистр не важен)
        }
        if (searchLoginTerm) {
            orConditions.push({ login: new RegExp(searchLoginTerm, 'i') })
        }
        if (orConditions.length > 0) {
            filter.$or = orConditions
        }

        const skip  = skipPagination(pageNumber, pageSize)

        const items = await usersCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skip)
            .limit(pageSize)
            .toArray()

        const totalCount = await usersCollection.countDocuments(filter)

        return {items, totalCount}
    },

    getFindUserWithNull: async (id: ObjectId): Promise<UserDBT> => {
        const user = await usersCollection.findOne({ _id: id })
        if (!user) {
            throw new RepositoryNotFoundError('User not found')
        }
        return user
    }


}