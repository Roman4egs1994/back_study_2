import express from "express";
import {HttpStatuses} from "../core/middlewares/type/HttpStatuses";
import {Request, Response} from "express";
import {db_blogs, db_posts} from "../db/db";


export const testingRoute = express.Router();


testingRoute.get('/', (req:Request, res: Response) => {
    res.status(HttpStatuses.OK).send('Testing endpoint is working')
})

testingRoute.delete('/all-data', (req:Request, res: Response) => {
    db_blogs.length = 0
    db_posts.length = 0
    res.status(HttpStatuses.NO_CONTENT).send('All data deleted')
})