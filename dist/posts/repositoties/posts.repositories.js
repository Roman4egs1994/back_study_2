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
exports.postRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
const skipPagination_1 = require("../../core/utils/skipPagination");
const paginationAndSorting_types_1 = require("../../core/type/paginationAndSorting.types");
const repository_not_found_1 = require("../../core/errors/repository-not-found");
exports.postRepository = {
    getAndFindArrayPostsRepo: (queryDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
        const skip = (0, skipPagination_1.skipPagination)(pageNumber, pageSize);
        const items = yield mongo_db_1.postsCollection
            .find()
            .sort({ [sortBy]: sortDirection === paginationAndSorting_types_1.SortDirection.DESC ? -1 : 1 })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = yield mongo_db_1.postsCollection.countDocuments();
        return { items, totalCount };
    }),
    searchPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
        if (!post) {
            throw new repository_not_found_1.RepositoryNotFoundError('Post not found');
        }
        return post;
    }),
    createPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const insertResult = yield mongo_db_1.postsCollection.insertOne(post);
        return Object.assign(Object.assign({}, post), { _id: insertResult.insertedId });
    }),
    update: (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = yield mongo_db_1.postsCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: updateData }, { returnDocument: 'after' });
        return updatedPost;
    }),
    updateBlogName: (blogId, blogName) => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_db_1.postsCollection.updateMany({ blogId }, { $set: { blogName } });
    }),
    delete: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(postId) });
    })
};
