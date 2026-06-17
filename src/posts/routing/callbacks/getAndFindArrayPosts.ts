import {Request, Response} from "express";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {mapQueryPostParam} from "../../utils/mapQueryPostParam";



export const getAndFindArrayPostsHandler = async (req:Request , res:Response) => {

    try {
        const queryDto = mapQueryPostParam(req.query)
        const posts = await postsService.getAndFindArrayPostsService(queryDto)
        return res.status(200).send(posts)
    } catch (e:unknown) {
        handlerErrors(e, res)
    }
}
