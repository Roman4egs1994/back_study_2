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
exports.blogRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
exports.blogRepository = {
    sendAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogsCollection.find().toArray();
        });
    },
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.blogsCollection.insertOne(blog);
            return Object.assign(Object.assign({}, blog), { _id: insertResult.insertedId });
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return blog;
        });
    },
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield mongo_db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: dto });
            if (!updateResult.matchedCount) {
                throw new Error('Blog not found');
            }
            return yield mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
};
