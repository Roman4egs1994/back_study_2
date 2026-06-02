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
exports.postRepository = {
    getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield mongo_db_1.postsCollection.find().toArray();
    }),
    searchPost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
    }),
    createPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const insertResult = yield mongo_db_1.postsCollection.insertOne(post);
        return Object.assign(Object.assign({}, post), { _id: insertResult.insertedId });
    }),
    update: (post, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        return post;
    }),
    delete: (postId) => {
        // db_posts.splice(db_posts.findIndex(p => p.id === postId), 1);
        mongo_db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(postId) });
    }
};
