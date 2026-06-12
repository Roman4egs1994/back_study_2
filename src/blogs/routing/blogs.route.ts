import express from "express";
import {createBlog} from "./routing-callbacks/create-blog.handler";
import {getBlogs} from "./routing-callbacks/get-all-blogs.handler";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";
import {validateResponse} from "../../core/middlewares/validations/validation.response";
import {blogsValidations} from "../validations/blogs.validations";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {getByIdBlog} from "./routing-callbacks/get-by-id-blog.handler";
import {updateBlog} from "./routing-callbacks/update-blog.handler";
import {deleteBlog} from "./routing-callbacks/delete-blog.handler";








export const routerBlogs = express.Router();


routerBlogs.get("/",getBlogs)

routerBlogs.post("/", superAdminGuardMiddleware, ...blogsValidations, validateResponse(), createBlog)

routerBlogs.get("/:id",idValidationParamId,validateResponse(), getByIdBlog)

routerBlogs.put("/:id",idValidationParamId, superAdminGuardMiddleware, ...blogsValidations,validateResponse(), updateBlog)

routerBlogs.delete("/:id",idValidationParamId, superAdminGuardMiddleware, validateResponse(), deleteBlog)




