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
const mapToPost_1 = require("../utils/mapToPost");
exports.postRepository = {
    getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield mongo_db_1.postsCollection.find().toArray();
        return posts.map(mapToPost_1.mapToPost);
    }),
    searchPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
        return post ? (0, mapToPost_1.mapToPost)(post) : null;
    }),
    createPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const insertResult = yield mongo_db_1.postsCollection.insertOne(post);
        return (0, mapToPost_1.mapToPost)(Object.assign(Object.assign({}, post), { _id: insertResult.insertedId }));
    }),
    update: (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updateData });
        const updated = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return updated ? (0, mapToPost_1.mapToPost)(updated) : null;
    }),
    updateBlogName: (blogId, blogName) => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_db_1.postsCollection.updateMany({ blogId }, { $set: { blogName } });
    }),
    delete: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(postId) });
    })
};
