import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllWeatherResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { flatMap, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class WeatherReadableRepository extends ReadableRepository {
  public getAll(): Observable<GetAllWeatherResponse[]> {
    const endPoint = `http://192.168.1.34:40080/WeatherForecast`; //TODO: just for test
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      flatMap((item: any) => item),
      map((data) => {
        const responseMapper = new ResponseMapper(GetAllWeatherResponse);
        return responseMapper.map(data);
      })
    );
  }
}
