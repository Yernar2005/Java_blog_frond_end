export interface Page<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
    number: number;            // текущая страница
    size: number;              // размер страницы
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}