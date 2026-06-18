import express from "express";
import {getAllUserHandler} from "./callbacks/get-all-user.handler";
import {paginationAndSortingValidation} from "../../core/middlewares/validations/paginationAndSortingValidation";
import {validateResponseMiddleware} from "../../core/middlewares/validations/validation.response";
import {UserSortField} from "./inputs";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {createUserHandler} from "./callbacks/create-user.handler";
import {userValidations} from "../validations/user.validations";
import {deleteUserById} from "./callbacks/delete-user-by-id";
import {idValidationParamId} from "../../core/middlewares/validations/isValidationId";


export const userRoute = express.Router();


userRoute.get("/",superAdminGuardMiddleware, paginationAndSortingValidation(UserSortField),validateResponseMiddleware(),getAllUserHandler)
userRoute.post("/",superAdminGuardMiddleware,...userValidations, validateResponseMiddleware(),createUserHandler)
userRoute.delete("/:id",superAdminGuardMiddleware, idValidationParamId,validateResponseMiddleware(),deleteUserById)


