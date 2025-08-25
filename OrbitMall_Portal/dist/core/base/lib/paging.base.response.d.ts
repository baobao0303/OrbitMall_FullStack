/**
 * Defines Paging BO Base
 */
export declare class PagingBaseResponse {
    activePage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    constructor(init?: Partial<PagingBaseResponse>);
}
