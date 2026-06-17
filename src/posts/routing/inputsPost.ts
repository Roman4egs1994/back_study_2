import {PaginationAndSorting} from "../../core/type/paginationAndSorting.types";

export enum PostSortField {
    CreatedAt = 'createdAt',
}

export type PostQueryInput = PaginationAndSorting<PostSortField>
