import { GetAllViewsRequest, GetAllViewsResponse, GetByRoleIdViewRequest, GetByRoleIdViewResponse, GetByVidViewRequest, GetByVidViewResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';
export interface IViewReadableRepository extends IReadableRepository {
    getAll(request: GetAllViewsRequest): Observable<GetAllViewsResponse[]>;
    getViewByVid(request: GetByVidViewRequest): Observable<GetByVidViewResponse>;
    getViewByRoleId(request: GetByRoleIdViewRequest): Observable<GetByRoleIdViewResponse[]>;
}
