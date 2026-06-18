import {Request, Response} from "express";
import {handlerErrors} from "../../../core/errors/handlerErrors";
import {UserQueryInputT, UserSortField} from "../inputs";
import {SortDirection} from "../../../core/type/paginationAndSorting.types";
import {userService} from "../../application/services/user.service";




export const getAllUserHandler = async (req:Request, res:Response) => {
    try {
    const queryDto: UserQueryInputT = {
        pageNumber: Number(req.query.pageNumber) || 1,
        pageSize: Number(req.query.pageSize) || 10,
        sortBy: req.query.sortBy as UserSortField || UserSortField.CreatedAt,
        sortDirection: req.query.sortDirection as SortDirection,
    }

        const users = await userService.getAllUserService(queryDto)

        return res.status(200).send(users)
    } catch (e: unknown) {
       handlerErrors(e,res)
    }
}