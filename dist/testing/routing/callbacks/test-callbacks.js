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
exports.deleteAllDataCallback = void 0;
const test_repositories_1 = require("../../repositories/test.repositories");
const HttpStatuses_1 = require("../../../core/middlewares/type/HttpStatuses");
const deleteAllDataCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield test_repositories_1.testRepositories.deleteAllData();
        res.status(HttpStatuses_1.HttpStatuses.NO_CONTENT).send();
    }
    catch (e) {
        res.status(HttpStatuses_1.HttpStatuses.INTERNAL_SERVER_ERROR).send();
    }
});
exports.deleteAllDataCallback = deleteAllDataCallback;
