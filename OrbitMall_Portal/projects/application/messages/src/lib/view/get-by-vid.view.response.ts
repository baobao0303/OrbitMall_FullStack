import { propertyMapper } from '@core/base';

export class GetByVidViewResponse {
  @propertyMapper('title', String)
  public title: string = '';
}
