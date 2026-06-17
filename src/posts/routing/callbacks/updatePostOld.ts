import {Request, Response} from "express";
import {PostUpdateT} from "../../types/posts.type";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";

// OLD поведение PUT /posts/:id/old:
//   - возвращает 200 + тело обновлённого поста (берёт из findByIdPostOrFail после update)
//   - ошибки валидации: { errors: [{ status, detail, source: { pointer }, code }] }
//
// NEW поведение PUT /posts/:id:
//   - возвращает 204 без тела (REST-стандарт для обновлений без возврата данных)
//   - ошибки валидации: { errorsMessages: [{ message, field }] } (стандарт IT Incubator)

export const updatePostOld = async (req: Request, res: Response) => {
    try {
        const {id} = req.params as {id: string}
        await postsService.updatePostService(id, req.body as PostUpdateT)
        const updated = await postsService.findByIdPostOrFail(id)
        return res.status(HttpStatuses.OK).send(updated)
    } catch (e: unknown) {
        handlerErrors(e, res)
    }
}
