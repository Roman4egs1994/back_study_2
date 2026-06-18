import {UserQueryInputT} from "../../routing/inputs";
import {UserDtoT, UserModelT, UserQueryResponseT} from "../../types/user.type";
import {userRepository} from "../../repositories/user.repositories";
import {mapToUsers, mapUserQueryWithItemsRes} from "../../utils/mapings";
import {usersQueryRepository} from "../../repositories/user.query.repositories";
import {generateSalt, hashPassword} from "../../utils/hashingPass";
import {ObjectId} from "mongodb";



export const userService = {
    getAllUserService: async (queryDto: UserQueryInputT): Promise<UserQueryResponseT> => {
        const {items, totalCount} = await usersQueryRepository.getAllUsers(queryDto)
        return mapUserQueryWithItemsRes(items, totalCount, queryDto)
    },
    createUserService: async (userDto: UserDtoT): Promise<UserModelT> => {

        const email = userDto.email.toLowerCase()
        await userRepository.checkEmailExists(email)
        await userRepository.checkLoginExists(userDto.login)

        const salt = generateSalt()
        const passwordHash = hashPassword(userDto.password, salt)

        const id = await userRepository.createUser({login: userDto.login, email, password: passwordHash}, salt)
        const user = await usersQueryRepository.getFindUserWithNull(id)

        return mapToUsers(user)
    },

    delUserService: async (id: string): Promise<UserModelT> => {
        const user = await usersQueryRepository.getFindUserWithNull(new ObjectId(id))
        await userRepository.deleteUser(id)
        return mapToUsers(user)
    }
}