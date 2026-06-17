import {PaginationAndSorting} from "../../core/type/paginationAndSorting.types";

export enum BlogSortField {
    CreatedAt = 'createdAt',
}

export type BlogQueryInput = PaginationAndSorting<BlogSortField> &
    Partial<{
        searchNameTerm: string;
    }>;
