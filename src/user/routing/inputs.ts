import {PaginationAndSorting} from "../../core/type/paginationAndSorting.types"

export enum UserSortField{
 CreatedAt = "createdAt"
}

export type UserQueryInputT = PaginationAndSorting<UserSortField> &
    Partial<{
        searchLoginTerm: string;
        searchEmailTerm: string;
    }>