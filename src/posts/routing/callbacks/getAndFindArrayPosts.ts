import {Request, Response} from "express";
import {postRepository} from "../../repositoties/posts.repositories";
import {postsService} from "../../application/services/posts.service";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {PaginationAndSorting, SortDirection} from "../../../core/type/paginationAndSorting.types";
import {PostQueryInput, PostSortField} from "../inputsPost";


export const getAndFindArrayPostsHandler = async (req:Request , res:Response) => {

    try {
       const queryDto: PostQueryInput = {
           pageNumber: Number(req.query.pageNumber) || 1,
           pageSize: Number(req.query.pageSize) || 10,
           sortBy: (req.query.sortBy as PostSortField) || PostSortField.CreatedAt,
           sortDirection: (req.query.sortDirection as SortDirection) || SortDirection.DESC,
       }

        const posts = await postsService.getAndFindArrayPostsService(queryDto)
        return res.status(200).send(posts)
    } catch (e:unknown) {
        handlerErrors(e, res)
    }

}
