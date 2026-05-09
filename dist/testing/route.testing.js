"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoute = void 0;
const express_1 = __importDefault(require("express"));
const HttpStatuses_1 = require("../core/middlewares/type/HttpStatuses");
const db_1 = require("../db/db");
exports.testingRoute = express_1.default.Router();
exports.testingRoute.get('/', (req, res) => {
    res.status(HttpStatuses_1.HttpStatuses.OK).send('Testing endpoint is working');
});
exports.testingRoute.delete('/all-data', (req, res) => {
    db_1.db_blogs.length = 0;
    db_1.db_posts.length = 0;
    res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send();
});
