import {PostQueryInput, PostSortField} from "../routing/inputsPost";
import {SortDirection} from "../../core/type/paginationAndSorting.types";
export const mapQueryPostParam = (query: Record<string, unknown>): PostQueryInput => {

 return {
        pageNumber: Number(query.pageNumber) || 1,
        pageSize: Number(query.pageSize) || 10,
        sortBy: (query.sortBy as PostSortField) || PostSortField.CreatedAt,
        sortDirection: (query.sortDirection as SortDirection) || SortDirection.DESC,
    }
}