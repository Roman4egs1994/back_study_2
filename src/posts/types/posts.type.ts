import {ObjectId} from "mongodb";

export type PostModelT = {
    id: string
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
    blogName: string //нужно обновить если у блога имя обновляли
    createdAt: string
    // isMembership: false
}

export type PostBDType = {
    _id: ObjectId
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
    blogName: string
    createdAt: string
    // isMembership: false
}

export type PostUpdateT = {
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
}