import express from "express";
import {HttpStatuses} from "../../core/middlewares/type/HttpStatuses";
import {Request, Response} from "express";

import {deleteAllDataCallback} from "./callbacks/test-callbacks";



export const testingRoute = express.Router();


testingRoute.get('/', (req:Request, res: Response) => {
    res.status(HttpStatuses.OK).send('Testing endpoint is working')
})

testingRoute.delete('/all-data', deleteAllDataCallback )