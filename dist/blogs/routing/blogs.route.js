"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBlogs = void 0;
const express_1 = __importDefault(require("express"));
const blogs_callbacks_1 = require("./routing-callbacks/blogs-callbacks");
const blogs_callbacks_2 = require("./routing-callbacks/blogs-callbacks");
const isValidationId_1 = require("../../core/middlewares/validations/isValidationId");
const validation_response_1 = require("../../core/middlewares/validations/validation.response");
const blogs_validations_1 = require("../validations/blogs.validations");
const super_admin_guard_middleware_1 = require("../../auth/middlewares/super-admin.guard-middleware");
exports.routerBlogs = express_1.default.Router();
exports.routerBlogs.get("/", blogs_callbacks_1.getBlogs);
exports.routerBlogs.post("/", super_admin_guard_middleware_1.superAdminGuardMiddleware, blogs_validations_1.blogsValidations, (0, validation_response_1.validateResponse)(), blogs_callbacks_2.createBlog);
exports.routerBlogs.get("/:id", isValidationId_1.idValidationParamId, (0, validation_response_1.validateResponse)(), blogs_callbacks_1.getByIdBlog);
exports.routerBlogs.put("/:id", isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, blogs_validations_1.blogsValidations, (0, validation_response_1.validateResponse)(), blogs_callbacks_1.updateBlog);
exports.routerBlogs.delete("/:id", isValidationId_1.idValidationParamId, super_admin_guard_middleware_1.superAdminGuardMiddleware, (0, validation_response_1.validateResponse)(), blogs_callbacks_1.deleteBlog);
