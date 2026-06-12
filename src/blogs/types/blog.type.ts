import {ObjectId} from "mongodb";

export type BlogModelT = {
    id: string
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string
    isMembership: false
}

export type BlogDBT = {
    _id: ObjectId
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string
    isMembership: false
}