export declare class PagingBaseRequest {
    page: number;
    pageSize: number;
    sort: string;
    filters: string;
    constructor(init?: Partial<PagingBaseRequest>);
}
