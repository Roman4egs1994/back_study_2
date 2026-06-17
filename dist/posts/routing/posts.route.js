"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPosts = void 0;
const express_1 = __importDefault(require("express"));
const deletePost_1 = require("./callbacks/deletePost");
const posts_validations_1 = require("../validations/posts.validations");
const validation_response_1 = require("../../core/middlewares/validations/validation.response");
const isValidationId_1 = require("../../core/middlewares/validations/isValidationId");
const super_admin_guard_middleware_1 = require("../../auth/middlewares/super-admin.guard-middleware");
const getAndFindArrayPosts_1 = require("./callbacks/getAndFindArrayPosts");
const paginationAndSortingValidation_1 = require("../../core/middlewares/validations/paginationAndSortingValidation");
const inputsPost_1 = require("./inputsPost");
const createPostHandler_1 = require("./callbacks/createPostHandler");
const findPostById_1 = require("./callbacks/findPostById");
const updatePost_1 = require("./callbacks/updatePost");
const updatePostOld_1 = require("./callbacks/updatePostOld");
exports.routerPosts = express_1.default.Router();
exports.routerPosts.get('/', (0, paginationAndSortingValidation_1.paginationAndSortingValidation)(inputsPost_1.PostSortField), (0, validation_response_1.validateResponseMiddleware)(), getAndFindArrayPosts_1.getAndFindArrayPostsHandler);
exports.routerPosts.post('/', super_admin_guard_middleware_1.superAdminGuardMiddleware, ...posts_validations_1.postsValidations, (0, validation_response_1.validateResponseMiddleware)(), createPostHandler_1.createPost);
exports.routerPosts.get('/:id', isValidationId_1.idValidationParamId, (0, validation_response_1.validateResponseMiddleware)(), findPostById_1.findPostById);
exports.routerPosts.put('/:id', isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, ...posts_validations_1.postsValidations, (0, validation_response_1.validateResponseMiddleware)(), updatePost_1.updatePost);
exports.routerPosts.delete('/:id', isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, (0, validation_response_1.validateResponseMiddleware)(), deletePost_1.deletePost);
// --- OLD роуты (для сравнения со старым поведением) ---
// PUT /posts/:id/old — возвращает 200 + тело обновлённого поста (было до изменений)
//   новый PUT /posts/:id — возвращает 204 без тела (REST-стандарт)
// Ошибки валидации здесь в старом формате: { errors: [{ status, detail, source, code }] }
//   новый формат: { errorsMessages: [{ message, field }] }
exports.routerPosts.put('/:id/old', isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, ...posts_validations_1.postsValidations, (0, validation_response_1.validateResponseMiddlewareOld)(), updatePostOld_1.updatePostOld);
