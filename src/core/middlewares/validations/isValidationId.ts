import { param } from 'express-validator';

// export const idValidationParamId = param('id')
//     .exists().withMessage('ID is required')
//     .isString().withMessage('ID must be a string')
//     .isLength({ min: 1 }).withMessage('ID must not be empty')
//     .isNumeric().withMessage('ID must be a numeric string');


export const idValidationParamId = param('id')
    .exists()
    .withMessage('ID is required') // Проверка на наличие
    .isString()
    .withMessage('ID must be a string') // Проверка, что это строка
    .isMongoId()
    .withMessage('Incorrect format of ObjectId'); // Проверка на формат ObjectId