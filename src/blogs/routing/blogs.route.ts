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
import {getAllPostByBlogId} from "./routing-callbacks/get-all-post-by-blog.handler";
import {createPostByBlogId} from "./routing-callbacks/create-post-by-blog-id.handler";
import {postsValidationsWithoutBlogId} from "../../posts/validations/posts.validations";


export const routerBlogs = express.Router();


routerBlogs.get("/",paginationAndSortingValidation(BlogSortField),validateResponseMiddleware(), getBlogs)

routerBlogs.post("/", superAdminGuardMiddleware, ...blogsValidations, validateResponseMiddleware(), createBlog)

routerBlogs.get("/:id",idValidationParamId,validateResponseMiddleware(), getByIdBlog)

routerBlogs.put("/:id",idValidationParamId, superAdminGuardMiddleware, ...blogsValidations,validateResponseMiddleware(), updateBlog)

routerBlogs.delete("/:id",idValidationParamId, superAdminGuardMiddleware, validateResponseMiddleware(), deleteBlog)

routerBlogs.get("/:id/post", paginationAndSortingValidation(BlogSortField),validateResponseMiddleware(),getAllPostByBlogId )

routerBlogs.post("/:id/post", idValidationParamId, superAdminGuardMiddleware, ...postsValidationsWithoutBlogId, validateResponseMiddleware(), createPostByBlogId)




