"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getByIdBlog = exports.createBlog = exports.getBlogs = void 0;
const blogs_repositories_1 = require("../../repositories/blogs.repositories");
const db_1 = require("../../../db/db");
const HttpStatuses_1 = require("../../../core/middlewares/type/HttpStatuses");
const getBlogs = (req, res) => {
    return res.status(200).send(blogs_repositories_1.blogRepository.sendAllBlogs());
};
exports.getBlogs = getBlogs;
const createBlog = (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const id = db_1.db_blogs.length > 0 ? Number(db_1.db_blogs[db_1.db_blogs.length - 1].id) + 1 : 1;
    const addBlog = {
        id: id.toString(),
        name,
        description,
        websiteUrl
    };
    blogs_repositories_1.blogRepository.createBlog(addBlog);
    return res.status(HttpStatuses_1.HttpStatuses.CREATED).send(addBlog);
};
exports.createBlog = createBlog;
const getByIdBlog = (req, res) => {
    const { id } = req.params;
    const blog = blogs_repositories_1.blogRepository.getById(id);
    if (!blog) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
    }
    return res.status(HttpStatuses_1.HttpStatuses.OK).send(blog);
};
exports.getByIdBlog = getByIdBlog;
const updateBlog = (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const blog = blogs_repositories_1.blogRepository.getById(req.params.id);
    if (!blog) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
    }
    const updatedBlog = blogs_repositories_1.blogRepository.update(blog, { id: blog.id, name, description, websiteUrl });
    return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send(updatedBlog);
};
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => {
    const blog = blogs_repositories_1.blogRepository.getById(req.params.id);
    if (!blog) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
    }
    blogs_repositories_1.blogRepository.delete(req.params.id);
    return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send('Blog deleted');
};
exports.deleteBlog = deleteBlog;
