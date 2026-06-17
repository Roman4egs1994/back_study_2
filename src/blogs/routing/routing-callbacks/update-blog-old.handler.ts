import {Request, Response} from "express";
import {HttpStatuses} from "../../../core/middlewares/type/HttpStatuses";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {blogsService} from "../../application/services/blogs.service";
import {mapToBlogs} from "../../utils/mapToBlogs";

// OLD поведение PUT /blogs/:id/old:
//   - возвращает 200 + тело обновлённого блога
//   - ошибки валидации: { errors: [{ status, detail, source: { pointer }, code }] }
//
// NEW поведение PUT /blogs/:id:
//   - возвращает 204 без тела (REST-стандарт для обновлений без возврата данных)
//   - ошибки валидации: { errorsMessages: [{ message, field }] } (стандарт IT Incubator)

export const updateBlogOld = async (req: Request, res: Response) => {
    try {
        const {name, description, websiteUrl} = req.body
        const {id} = req.params
        const blog = await blogsService.updateBlogService(id as string, {name, description, websiteUrl})
        return res.status(HttpStatuses.OK).send(mapToBlogs(blog))
    } catch (error) {
        handlerErrors(error, res)
    }
}
