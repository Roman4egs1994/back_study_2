import express from "express";
import { createPost, getPostById, updatePost, deletePost} from "./callbacks/posts-callback";
import {postsValidations} from "../validations/posts.validations";
import {validateResponseMiddleware} from "../../core/middlewares/validations/validation.response";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {getAndFindArrayPostsHandler} from "./callbacks/getAndFindArrayPosts";
import {paginationAndSortingValidation} from "../../core/middlewares/validations/paginationAndSortingValidation";
import {PostSortField} from "./inputsPost";





export const routerPosts = express.Router();


routerPosts.get('/', paginationAndSortingValidation(PostSortField), validateResponseMiddleware(), getAndFindArrayPostsHandler)

routerPosts.post('/', superAdminGuardMiddleware, ...postsValidations, validateResponseMiddleware(), createPost )

routerPosts.get('/:id',idValidationParamId, validateResponseMiddleware(), getPostById)

routerPosts.put('/:id', idValidationParamId, superAdminGuardMiddleware, ...postsValidations, validateResponseMiddleware(),updatePost)

routerPosts.delete('/:id',idValidationParamId, superAdminGuardMiddleware, validateResponseMiddleware(), deletePost)

