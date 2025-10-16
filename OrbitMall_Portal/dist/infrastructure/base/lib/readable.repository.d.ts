import { HttpClient } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';
import { ORBITMAIL_PORTALContext } from './orbitmail_portal.context';
export declare class ReadableRepository implements IReadableRepository {
    protected _context: ORBITMAIL_PORTALContext;
    protected httpClient: HttpClient;
    protected destroyRef: DestroyRef;
    protected readonly defaultOptions: {
        headers: {
            'Time-Zone': string;
        };
    };
    private mergeOptions;
    findAll<T>(endPoint: string, options?: {}): Observable<T>;
    findById<T>(endPoint: string, id: string, options?: {} | undefined): Observable<T>;
    findInAll<T>(endPoint: string, body: T, options?: {}): Observable<T>;
}
