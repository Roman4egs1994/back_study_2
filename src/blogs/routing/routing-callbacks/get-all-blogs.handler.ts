import {Request, Response} from "express";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {blogsService} from "../../application/services/blogs.service";
import {BlogQueryInput, BlogSortField} from "../inputs";
import {SortDirection} from "../../../core/type/paginationAndSorting.types";


export const getBlogs = async (req: Request, res: Response) => {
    try {
        const queryDto: BlogQueryInput = {
            pageNumber: Number(req.query.pageNumber) || 1,
            pageSize: Number(req.query.pageSize) || 10,
            sortBy: (req.query.sortBy as BlogSortField) || BlogSortField.CreatedAt,
            sortDirection: (req.query.sortDirection as SortDirection) || SortDirection.DESC,
            searchNameTerm: req.query.searchNameTerm as string | undefined,
        }

        const result = await blogsService.findArrayBlogsService(queryDto)
        return res.status(200).send(result)
    } catch (e) {
        handlerErrors(e, res)
    }
}
