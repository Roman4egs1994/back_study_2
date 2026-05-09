"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const blogs_route_1 = require("./blogs/routing/blogs.route");
const posts_route_1 = require("./posts/routing/posts.route");
const route_testing_1 = require("./testing/route.testing");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/blogs', blogs_route_1.routerBlogs);
    app.use('/posts', posts_route_1.routerPosts);
    app.use("/testing", route_testing_1.testingRoute);
    app.get('/hello-world', (req, res) => {
        res.send(' Test Express app!');
    });
    return app;
};
exports.setupApp = setupApp;
