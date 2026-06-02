"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
exports.SETTINGS = {
    PORT: process.env.PORT || 5001,
    MONGO_URL: process.env.MONGODB_URI || '', //docker container (для сдачи atlas url db )
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: '',
    DB_PASSWORD: '',
    DB_HOST: '',
    DB_PORT: '',
};
console.log("Current Mongo URI:", process.env.MONGODB_URI);
