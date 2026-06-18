import express from "express";
import {validateResponseMiddleware} from "../../core/middlewares/validations/validation.response";
import {authValidations} from "../validations/auth.validations";
import {loginHandler} from "./callbacks/login.handler";

export const authRoute = express.Router();

authRoute.post("/login", ...authValidations, validateResponseMiddleware(), loginHandler)
