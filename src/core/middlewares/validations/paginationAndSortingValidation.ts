import { query } from 'express-validator';
import { SortDirection } from '../../type/paginationAndSorting.types';
import { PaginationAndSorting } from '../../type/paginationAndSorting.types';



const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = SortDirection.DESC;
const DEFAULT_SORT_BY = 'createdAt';

export const paginationAndSortingDefault: PaginationAndSorting<string> = {
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    sortDirection: DEFAULT_SORT_DIRECTION,
};

export function paginationAndSortingValidation<T extends string>(
    sortFieldsEnum: Record<string, T>,
) {
    const allowedSortFields = Object.values(sortFieldsEnum);

    return [
        query('pageNumber')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),

        query('pageSize')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be between 1 and 100')
            .toInt(),

        query('sortBy')
            .optional()
            .isString()
            .withMessage('sortBy must be a string'),

        query('sortDirection')
            .optional()
            .isIn(Object.values(SortDirection))
            .withMessage(
                `Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`,
            ),
    ];
}
