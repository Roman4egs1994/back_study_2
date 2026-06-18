import {ObjectId} from "mongodb";


export type UserDBT = {
    _id: ObjectId
    login: string
    email: string
    password: string
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
    items: UserModelT[]
    totalCount: number
    pageNumber: number
    pageSize: number
}
