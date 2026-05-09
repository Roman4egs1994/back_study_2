"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsValidations = void 0;
const express_validator_1 = require("express-validator");
const titleValidation = (0, express_validator_1.body)('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Title must be between 1 and 30 characters');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 10 characters');
const contentValidation = (0, express_validator_1.body)('content')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Title must be between 1 and 1000 characters');
const blogIdValidation = (0, express_validator_1.body)('blogId')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim();
exports.postsValidations = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation];
