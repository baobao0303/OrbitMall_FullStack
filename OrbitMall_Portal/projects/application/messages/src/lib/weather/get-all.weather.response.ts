import { propertyMapper } from '@core/base';

export class GetAllWeatherResponse {
  @propertyMapper('date', String)
  date: string = '';

  @propertyMapper('summary', String)
  summary: string = '';

  @propertyMapper('summary', Number)
  temperatureC: number = 0;

  @propertyMapper('summary', Number)
  temperatureF: number = 0;
}
