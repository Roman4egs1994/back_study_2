"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatuses = void 0;
var HttpStatuses;
(function (HttpStatuses) {
    // Success responses
    HttpStatuses[HttpStatuses["OK"] = 200] = "OK";
    HttpStatuses[HttpStatuses["CREATED"] = 201] = "CREATED";
    HttpStatuses[HttpStatuses["NO_CONTENT"] = 204] = "NO_CONTENT";
    // Client errors
    HttpStatuses[HttpStatuses["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatuses[HttpStatuses["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatuses[HttpStatuses["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatuses[HttpStatuses["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatuses[HttpStatuses["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HttpStatuses[HttpStatuses["CONFLICT"] = 409] = "CONFLICT";
    HttpStatuses[HttpStatuses["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    // Server errors
    HttpStatuses[HttpStatuses["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatuses[HttpStatuses["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HttpStatuses[HttpStatuses["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HttpStatuses[HttpStatuses["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(HttpStatuses || (exports.HttpStatuses = HttpStatuses = {}));
