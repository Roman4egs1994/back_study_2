import {db_blogs, db_posts} from "../../db/db";
import {PostT, PostUpdateT} from "../../core/type/db.type";



export const postRepository = {


    getAllPosts: () => {
        return db_posts
    },

    searchBlog: (blogId: string) => {
        return db_blogs.find(b => b.id === blogId)
    },
    searchPost: (postId: string) => {
        return db_posts.find(p => p.id === postId)
    },
    createPost: (post: PostT) => {
        db_posts.push(post)
    },
    update: (post: PostT, updateData: PostUpdateT) => {
        post.shortDescription = updateData.shortDescription;
        post.content = updateData.content;
        post.blogId = updateData.blogId;
        return post;
    },
    delete: (postId: string) => {
        db_posts.splice(db_posts.findIndex(p => p.id === postId), 1);
    }
}