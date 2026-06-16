import express from "express";
import {createBlog} from "./routing-callbacks/create-blog.handler";
import {getBlogs} from "./routing-callbacks/get-all-blogs.handler";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";
import {validateResponseMiddleware} from "../../core/middlewares/validations/validation.response";
import {blogsValidations} from "../validations/blogs.validations";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {getByIdBlog} from "./routing-callbacks/get-by-id-blog.handler";
import {updateBlog} from "./routing-callbacks/update-blog.handler";
import {deleteBlog} from "./routing-callbacks/delete-blog.handler";
import {paginationAndSortingValidation} from "../../core/middlewares/validations/paginationAndSortingValidation";
import {BlogSortField} from "./inputs";


export const routerBlogs = express.Router();


routerBlogs.get("/",paginationAndSortingValidation(BlogSortField),validateResponseMiddleware(), getBlogs)

routerBlogs.post("/", superAdminGuardMiddleware, ...blogsValidations, validateResponseMiddleware(), createBlog)

routerBlogs.get("/:id",idValidationParamId,validateResponseMiddleware(), getByIdBlog)

routerBlogs.put("/:id",idValidationParamId, superAdminGuardMiddleware, ...blogsValidations,validateResponseMiddleware(), updateBlog)

routerBlogs.delete("/:id",idValidationParamId, superAdminGuardMiddleware, validateResponseMiddleware(), deleteBlog)




