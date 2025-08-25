import { GetAllWeatherResponse } from '@application/messages';
import { Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import * as i0 from "@angular/core";
export declare class WeatherReadableRepository extends ReadableRepository {
    getAll(): Observable<GetAllWeatherResponse[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeatherReadableRepository, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WeatherReadableRepository>;
}
