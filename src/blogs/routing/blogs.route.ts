import express from "express";
import {deleteBlog, getBlogs, getByIdBlog, updateBlog} from "./routing-callbacks/blogs-callbacks";
import {createBlog} from "./routing-callbacks/blogs-callbacks";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";
import {validateResponse} from "../../core/middlewares/validations/validation.response";
import {blogsValidations} from "../validations/blogs.validations";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";




export const routerBlogs = express.Router();


routerBlogs.get("/",getBlogs)

routerBlogs.post("/", superAdminGuardMiddleware, blogsValidations, validateResponse(), createBlog)

routerBlogs.get("/:id",idValidationParamId,validateResponse(), getByIdBlog)

routerBlogs.put("/:id",idValidationParamId, superAdminGuardMiddleware, blogsValidations,validateResponse(), updateBlog)

routerBlogs.delete("/:id",idValidationParamId, superAdminGuardMiddleware, validateResponse(), deleteBlog)

