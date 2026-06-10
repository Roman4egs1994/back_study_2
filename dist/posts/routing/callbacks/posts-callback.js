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
exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = exports.getPosts = void 0;
const posts_repositories_1 = require("../../repositoties/posts.repositories");
const HttpStatuses_1 = require("../../../core/middlewares/type/HttpStatuses");
const blogs_repositories_1 = require("../../../blogs/repositories/blogs.repositories");
const createErrorResponse_1 = require("../../../core/middlewares/validations/createErrorResponse");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_repositories_1.postRepository.getAllPosts();
    return res.status(200).send(posts);
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, shortDescription, content, blogId } = req.body;
        const blog = yield blogs_repositories_1.blogRepository.getById(blogId);
        if (!blog) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
        }
        const newPost = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
            isMembership: false
        };
        const post = yield posts_repositories_1.postRepository.createPost(newPost);
        console.log(post);
        return res.status(HttpStatuses_1.HttpStatuses.CREATED).send(post);
    }
    catch (e) {
    }
});
exports.createPost = createPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield posts_repositories_1.postRepository.searchPost(id);
        if (!post) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Post not found');
        }
        return res.status(HttpStatuses_1.HttpStatuses.OK).send(post);
    }
    catch (e) {
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, shortDescription, content, blogId } = req.body;
        const blog = yield blogs_repositories_1.blogRepository.getById(blogId);
        if (!blog) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send((0, createErrorResponse_1.createErrorResponse)({ field: 'blogId', message: 'Blog not found' }));
        }
        const { id } = req.params;
        const post = yield posts_repositories_1.postRepository.searchPost(id);
        if (!post) {
            return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Post not found');
        }
        const updatedPost = yield posts_repositories_1.postRepository.update(post, { title, shortDescription, content, blogId });
        return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send(updatedPost);
    }
    catch (e) {
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => {
    const { id } = req.params;
    const post = posts_repositories_1.postRepository.searchPost(id);
    if (!post) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Post not found');
    }
    posts_repositories_1.postRepository.delete(id);
    return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send();
};
exports.deletePost = deletePost;
