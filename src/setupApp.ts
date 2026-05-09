import express, {Express} from "express";
import {routerBlogs} from "./blogs/routing/blogs.route";
import {routerPosts} from "./posts/routing/posts.route";
import {testingRoute} from "./testing/route.testing";


export const setupApp = (app: Express) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/blogs', routerBlogs);
    app.use('/posts', routerPosts);

    app.use("/testing",testingRoute)

    app.get('/hello-world', (req, res) => {
        res.send(' Test Express app!');
    })

    return app
}