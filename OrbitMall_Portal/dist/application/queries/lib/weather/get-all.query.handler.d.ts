import { RequestHandler } from '@application/base';
import { GetAllWeatherRequest, GetAllWeatherResponse } from '@application/messages';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class GetAllQueryHandler implements RequestHandler<GetAllWeatherRequest, GetAllWeatherResponse[]> {
    private repository;
    handle(request: GetAllWeatherRequest): Observable<GetAllWeatherResponse[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetAllQueryHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GetAllQueryHandler>;
}
