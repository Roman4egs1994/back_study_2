import express from "express";
import {deletePost} from "./callbacks/deletePost";
import {postsValidations} from "../validations/posts.validations";
import {validateResponseMiddleware, validateResponseMiddlewareOld} from "../../core/middlewares/validations/validation.response";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {getAndFindArrayPostsHandler} from "./callbacks/getAndFindArrayPosts";
import {paginationAndSortingValidation} from "../../core/middlewares/validations/paginationAndSortingValidation";
import {PostSortField} from "./inputsPost";
import {createPost} from "./callbacks/createPostHandler";
import {findPostById} from "./callbacks/findPostById";
import {updatePost} from "./callbacks/updatePost";
import {updatePostOld} from "./callbacks/updatePostOld";







export const routerPosts = express.Router();


routerPosts.get('/', paginationAndSortingValidation(PostSortField), validateResponseMiddleware(), getAndFindArrayPostsHandler)

routerPosts.post('/', superAdminGuardMiddleware, ...postsValidations, validateResponseMiddleware(), createPost )

routerPosts.get('/:id',idValidationParamId, validateResponseMiddleware(), findPostById)

routerPosts.put('/:id', idValidationParamId, superAdminGuardMiddleware, ...postsValidations, validateResponseMiddleware(),updatePost)

routerPosts.delete('/:id',idValidationParamId, superAdminGuardMiddleware, validateResponseMiddleware(), deletePost)

// --- OLD роуты (для сравнения со старым поведением) ---
// PUT /posts/:id/old — возвращает 200 + тело обновлённого поста (было до изменений)
//   новый PUT /posts/:id — возвращает 204 без тела (REST-стандарт)
// Ошибки валидации здесь в старом формате: { errors: [{ status, detail, source, code }] }
//   новый формат: { errorsMessages: [{ message, field }] }
routerPosts.put('/:id/old', idValidationParamId, superAdminGuardMiddleware, ...postsValidations, validateResponseMiddlewareOld(), updatePostOld)

