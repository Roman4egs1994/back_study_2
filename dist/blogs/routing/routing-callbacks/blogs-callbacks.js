"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getByIdBlog = exports.createBlog = exports.getBlogs = void 0;
const blogs_repositories_1 = require("../../repositories/blogs.repositories");
const HttpStatuses_1 = require("../../../core/middlewares/type/HttpStatuses");
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogs_repositories_1.blogRepository.sendAllBlogs();
    return res.status(200).send(allBlogs);
});
exports.getBlogs = getBlogs;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const addBlog = {
        name,
        description,
        websiteUrl,
        isMembership: false,
        createdAt: new Date().toISOString(),
    };
    const blog = yield blogs_repositories_1.blogRepository.createBlog(addBlog);
    console.log(blog);
    return res.status(HttpStatuses_1.HttpStatuses.CREATED).send(blog);
});
exports.createBlog = createBlog;
const getByIdBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield blogs_repositories_1.blogRepository.getById(id);
        if (!blog) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
        }
        return res.status(HttpStatuses_1.HttpStatuses.OK).send(blog);
    }
    catch (error) {
        console.error('Error getting blog by ID:', error);
        return res.status(HttpStatuses_1.HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error');
    }
});
exports.getByIdBlog = getByIdBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    try {
        const blog = yield blogs_repositories_1.blogRepository.getById(req.params.id);
        if (!blog) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
        }
        const updatedBlog = yield blogs_repositories_1.blogRepository.update(req.params.id, { name, description, websiteUrl });
        console.log(updatedBlog);
        return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send(updatedBlog);
    }
    catch (error) {
        console.error('Error updating blog:', error);
        return res.status(HttpStatuses_1.HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error');
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogs_repositories_1.blogRepository.getById(req.params.id);
        if (!blog) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
        }
        yield blogs_repositories_1.blogRepository.delete(req.params.id);
        return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send('Blog deleted');
    }
    catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(HttpStatuses_1.HttpStatuses.INTERNAL_SERVER_ERROR).send('Server error');
    }
});
exports.deleteBlog = deleteBlog;
