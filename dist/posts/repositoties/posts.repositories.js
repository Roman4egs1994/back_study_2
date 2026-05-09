"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../../db/db");
exports.postRepository = {
    getAllPosts: () => {
        return db_1.db_posts;
    },
    searchBlog: (blogId) => {
        return db_1.db_blogs.find(b => b.id === blogId);
    },
    searchPost: (postId) => {
        return db_1.db_posts.find(p => p.id === postId);
    },
    createPost: (post) => {
        db_1.db_posts.push(post);
    },
    update: (post, updateData) => {
        post.shortDescription = updateData.shortDescription;
        post.content = updateData.content;
        post.blogId = updateData.blogId;
        return post;
    },
    delete: (postId) => {
        db_1.db_posts.splice(db_1.db_posts.findIndex(p => p.id === postId), 1);
    }
};
