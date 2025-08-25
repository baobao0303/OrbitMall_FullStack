import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
export interface IWriteableRepository {
    add<T>(endPoint: string, body: T): Observable<T>;
    update<T>(endPoint: string, body: T): Observable<T>;
    delete<T>(endPoint: string): void;
}
export declare const WRITEABLE_REPOSITORY: InjectionToken<IWriteableRepository>;
