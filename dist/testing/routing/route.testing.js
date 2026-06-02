"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoute = void 0;
const express_1 = __importDefault(require("express"));
const HttpStatuses_1 = require("../../core/middlewares/type/HttpStatuses");
const test_callbacks_1 = require("./callbacks/test-callbacks");
exports.testingRoute = express_1.default.Router();
exports.testingRoute.get('/', (req, res) => {
    res.status(HttpStatuses_1.HttpStatuses.OK).send('Testing endpoint is working');
});
exports.testingRoute.delete('/all-data', test_callbacks_1.deleteAllDataCallback);
