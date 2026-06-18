import {usersCollection} from "../../db/mongo.db";
import {UserDBT} from "../../user/types/user.type";

export const authQueryRepository = {
    async findByLoginOrEmail(loginOrEmail: string): Promise<UserDBT | null> {
        return usersCollection.findOne({
            $or: [{ login: loginOrEmail }, { email: loginOrEmail }]
        })
    }
}
