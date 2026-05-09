import { body } from "express-validator";
const titleValidation =  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('Title must be between 1 and 30 characters');

const shortDescriptionValidation = body('shortDescription')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('Title must be between 1 and 10 characters');

const contentValidation = body('content')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('Title must be between 1 and 1000 characters');

const blogIdValidation = body('blogId')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()






export const postsValidations = [titleValidation,shortDescriptionValidation,contentValidation,blogIdValidation]