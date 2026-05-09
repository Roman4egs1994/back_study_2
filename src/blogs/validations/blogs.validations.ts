import { body } from "express-validator";



const nameValidation = body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Name must be between 3 and 15 characters');

const descriptionValidation = body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Description must be between 2 and 500 characters');

const websiteUrl = body('websiteUrl')
    .notEmpty()
    .withMessage('Website URL is required')
    .isString()
    .withMessage('Website URL must be a string')
    .trim()
    .isURL()
    .withMessage('Website URL must be a valid URL')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('URL must be a valid HTTPS address')
    .isLength({ max: 100 })
    .withMessage('Maximum length is 100 characters');


export const blogsValidations = [nameValidation, descriptionValidation, websiteUrl]