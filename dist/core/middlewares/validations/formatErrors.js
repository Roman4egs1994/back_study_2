"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrors = void 0;
const formatErrors = (error) => {
    if (error.type === 'field') {
        return {
            field: error.path,
            message: error.msg
        };
    }
    else if (error.type === 'unknown_fields') {
        return {
            field: error.fields.map(f => f.path).join(', '),
            message: error.msg
        };
    }
    else {
        return {
            field: 'alternative',
            message: error.msg
        };
    }
};
exports.formatErrors = formatErrors;
