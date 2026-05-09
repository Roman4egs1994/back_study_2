import express from "express";
import {getPosts, createPost, getPostById, updatePost, deletePost} from "./callbacks/posts-callback";
import {postsValidations} from "../validations/posts.validations";
import {validateResponse} from "../../core/middlewares/validations/validation.response";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";



export const routerPosts = express.Router();


routerPosts.get('/', getPosts)

routerPosts.post('/', superAdminGuardMiddleware, postsValidations, validateResponse(), createPost )

routerPosts.get('/:id',idValidationParamId, validateResponse(), getPostById)

routerPosts.put('/:id', idValidationParamId, superAdminGuardMiddleware, postsValidations, validateResponse(),updatePost)

routerPosts.delete('/:id',idValidationParamId, superAdminGuardMiddleware, validateResponse(), deletePost)

