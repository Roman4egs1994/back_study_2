



export type BlogT = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export type BlogArrayT = Array<BlogT>

export type PostT = {
    id: string,
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
    blogName: string
}

export type PostUpdateT = {
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
}

export type PostArrayT = Array<PostT>