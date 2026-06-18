import { body } from "express-validator";

const emailValidation = body('email')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail() // автоматически приводит к нижнему регистру

const passwordValidation = body('password')
    .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters')

const loginValidation = body('login')
    .isLength({ min: 3, max: 10 }).withMessage('Login must be between 3 and 10 characters')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Login must contain only letters, numbers, _ or -')


export const userValidations = [emailValidation,passwordValidation,loginValidation]

