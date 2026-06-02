import {testRepositories} from "../../repositories/test.repositories";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {Request, Response} from "express";


export const deleteAllDataCallback = async (req:Request, res:Response) => {

   try {

       await testRepositories.deleteAllData()
       res.status(HttpStatuses.NO_CONTENT).send('All data deleted')
   } catch (e) {

   }




}