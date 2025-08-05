import { propertyMapper } from '@core/base';

export class IdBO {
  @propertyMapper('id', String)
  public id: string = '';
}
