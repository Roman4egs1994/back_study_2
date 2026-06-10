



export type BlogT = {
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string
    isMembership: false
}

export type BlogArrayT = Array<BlogT>

export type PostT = {
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
    blogName: string //нужно обновить если у блога имя обновляли
    createdAt: string
    isMembership: false
}

export type PostUpdateT = {
    title: string,
    shortDescription: string,
    blogId: string,
    content: string
}

export type PostArrayT = Array<PostT>