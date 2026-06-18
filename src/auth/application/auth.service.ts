import {LoginDtoT} from "../types/auth.type";
import {authQueryRepository} from "../repositories/auth.query.repository";
import {verifyPassword} from "../../user/utils/hashingPass";

export const authService = {
    async login(dto: LoginDtoT): Promise<boolean> {
        const user = await authQueryRepository.findByLoginOrEmail(dto.loginOrEmail)
        if (!user) return false

        return verifyPassword(dto.password, user.password, user.salt)
    }
}
