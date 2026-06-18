import {UserDBT, UserModelT, UserQueryResponseT} from "../types/user.type";
import {UserQueryInputT} from "../routing/inputs";


export const mapToUsers = (user: UserDBT): UserModelT => {
    const {_id, login, email, createdAt} = user
    return {id:_id.toString(), login, email, createdAt}
}



export const mapUserQueryWithItemsRes = (
    items: UserDBT[],
    totalCount: number,
    queryDto: UserQueryInputT
): UserQueryResponseT => ({
    pageNumber: Math.ceil(totalCount / queryDto.pageSize),
    pageSize: queryDto.pageSize,
    totalCount,
    items: items.map(mapToUsers)
})



