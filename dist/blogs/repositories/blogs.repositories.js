"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = void 0;
const db_1 = require("../../db/db");
exports.blogRepository = {
    sendAllBlogs: () => {
        return db_1.db_blogs;
    },
    createBlog: (blog) => {
        db_1.db_blogs.push(blog);
    },
    getById: (id) => {
        return db_1.db_blogs.find(blog => blog.id === id);
    },
    update: (blog, dto) => {
        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;
        return blog;
    },
    delete: (id) => {
        db_1.db_blogs.splice(db_1.db_blogs.findIndex(blog => blog.id === id), 1);
    }
};
