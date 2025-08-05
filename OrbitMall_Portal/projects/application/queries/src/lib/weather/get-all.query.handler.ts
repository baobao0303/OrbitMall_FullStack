import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import {
  GetAllWeatherRequest,
  GetAllWeatherResponse,
} from '@application/messages';
import { WeatherReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllQueryHandler
  implements RequestHandler<GetAllWeatherRequest, GetAllWeatherResponse[]>
{
  private repository = inject(WeatherReadableRepository);
  handle(request: GetAllWeatherRequest): Observable<GetAllWeatherResponse[]> {
    return this.repository.getAll();
    // this.repository.getAll().subscribe({
    //   next(value) {
    //     console.log(value);
    //   },
    // });
    // return undefined;
  }
}
