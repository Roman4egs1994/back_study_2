"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponse = void 0;
const express_validator_1 = require("express-validator");
const HttpStatuses_1 = require("../type/HttpStatuses");
const formatErrors_1 = require("./formatErrors");
const validateResponse = (statusCode = HttpStatuses_1.HttpStatuses.BAD_REQUEST) => {
    return (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).formatWith(formatErrors_1.formatErrors).array({
            onlyFirstError: true
        });
        if (errors.length > 0) {
            return res.status(statusCode).json({ errors });
        }
        next();
    };
};
exports.validateResponse = validateResponse;
