import {ObjectId} from "mongodb";


export type UserDBT = {
    _id: ObjectId
    login: string
    email: string
    password: string
    salt: string
    createdAt: string
}

export type UserModelT ={
    id: string
    login: string
    email: string
    createdAt: string
}

export type UserDtoT = {
    login: string
    email: string
    password: string
}


export type UserQueryResponseT = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: UserModelT[]
}

export type FieldErrorT = {
    errorsMessages: { field: string; message: string }[]
}
