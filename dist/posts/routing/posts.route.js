"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPosts = void 0;
const express_1 = __importDefault(require("express"));
const posts_callback_1 = require("./callbacks/posts-callback");
const posts_validations_1 = require("../validations/posts.validations");
const validation_response_1 = require("../../core/middlewares/validations/validation.response");
const isValidationId_1 = require("../../core/middlewares/validations/isValidationId");
const super_admin_guard_middleware_1 = require("../../auth/middlewares/super-admin.guard-middleware");
exports.routerPosts = express_1.default.Router();
exports.routerPosts.get('/', posts_callback_1.getPosts);
exports.routerPosts.post('/', super_admin_guard_middleware_1.superAdminGuardMiddleware, posts_validations_1.postsValidations, (0, validation_response_1.validateResponse)(), posts_callback_1.createPost);
exports.routerPosts.get('/:id', isValidationId_1.idValidationParamId, (0, validation_response_1.validateResponse)(), posts_callback_1.getPostById);
exports.routerPosts.put('/:id', isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, posts_validations_1.postsValidations, (0, validation_response_1.validateResponse)(), posts_callback_1.updatePost);
exports.routerPosts.delete('/:id', isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, (0, validation_response_1.validateResponse)(), posts_callback_1.deletePost);
