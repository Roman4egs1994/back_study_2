"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponseMiddleware = exports.validateResponseMiddlewareOld = exports.createErrorMessages = void 0;
const express_validator_1 = require("express-validator");
const HttpStatuses_1 = require("../type/HttpStatuses");
const createErrorMessages = (errors) => {
    return {
        errorsMessages: errors.map((error) => {
            var _a;
            return ({
                message: error.detail,
                field: (_a = error.source) !== null && _a !== void 0 ? _a : '',
            });
        }),
    };
};
exports.createErrorMessages = createErrorMessages;
const formaValidationError = (error) => {
    const expressError = error;
    return {
        status: HttpStatuses_1.HttpStatuses.BAD_REQUEST,
        source: expressError.path,
        detail: expressError.msg,
    };
};
// OLD format: { errors: [{ status, detail, source: { pointer }, code }] }
// NEW format: { errorsMessages: [{ message, field }] }
// Изменено чтобы соответствовать стандарту API курса (IT Incubator)
const validateResponseMiddlewareOld = () => {
    return (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).formatWith(formaValidationError).array({
            onlyFirstError: true
        });
        if (errors.length > 0) {
            res.status(HttpStatuses_1.HttpStatuses.BAD_REQUEST).json({
                errors: errors.map((error) => {
                    var _a, _b;
                    return ({
                        status: error.status,
                        detail: error.detail,
                        source: { pointer: (_a = error.source) !== null && _a !== void 0 ? _a : '' },
                        code: (_b = error.code) !== null && _b !== void 0 ? _b : null,
                    });
                }),
            });
            return;
        }
        next();
    };
};
exports.validateResponseMiddlewareOld = validateResponseMiddlewareOld;
const validateResponseMiddleware = (statusCode = HttpStatuses_1.HttpStatuses.BAD_REQUEST) => {
    return (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).formatWith(formaValidationError).array({
            onlyFirstError: true
        });
        if (errors.length > 0) {
            res.status(HttpStatuses_1.HttpStatuses.BAD_REQUEST).json((0, exports.createErrorMessages)(errors));
            return;
        }
        next();
    };
};
exports.validateResponseMiddleware = validateResponseMiddleware;
