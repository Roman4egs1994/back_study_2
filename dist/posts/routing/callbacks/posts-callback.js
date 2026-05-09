"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = exports.getPosts = void 0;
const posts_repositories_1 = require("../../repositoties/posts.repositories");
const db_1 = require("../../../db/db");
const HttpStatuses_1 = require("../../../core/middlewares/type/HttpStatuses");
const getPosts = (req, res) => {
    return res.status(200).send(posts_repositories_1.postRepository.getAllPosts());
};
exports.getPosts = getPosts;
const createPost = (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = posts_repositories_1.postRepository.searchBlog(blogId);
    if (!blog) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Blog not found');
    }
    const newPostId = db_1.db_posts.length > 0 ? Number(db_1.db_posts[db_1.db_posts.length - 1].id) + 1 : 1;
    const newPost = {
        id: newPostId.toString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName: blog.name
    };
    posts_repositories_1.postRepository.createPost(newPost);
    return res.status(HttpStatuses_1.HttpStatuses.CREATED).send(newPost);
};
exports.createPost = createPost;
const getPostById = (req, res) => {
    const { id } = req.params;
    const post = posts_repositories_1.postRepository.searchPost(id);
    if (!post) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Post not found');
    }
    return res.status(HttpStatuses_1.HttpStatuses.OK).send(post);
};
exports.getPostById = getPostById;
const updatePost = (req, res) => {
    const { id } = req.params;
    const post = posts_repositories_1.postRepository.searchPost(id);
    if (!post) {
        return res.status(HttpStatuses_1.HttpStatuses.NOT_FOUND).send('Post not found');
    }
    const { title, shortDescription, content, blogId } = req.body;
    const updatedPost = posts_repositories_1.postRepository.update(post, { title, shortDescription, content, blogId });
    return res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send();
};
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
