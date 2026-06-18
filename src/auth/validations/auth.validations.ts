import { body } from "express-validator";

const loginOrEmailValidation = body('loginOrEmail')
    .notEmpty().withMessage('loginOrEmail is required')
    .isString().withMessage('loginOrEmail must be a string')

const passwordValidation = body('password')
    .notEmpty().withMessage('password is required')
    .isString().withMessage('password must be a string')

export const authValidations = [loginOrEmailValidation, passwordValidation]
