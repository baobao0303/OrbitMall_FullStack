import { propertyMapper } from '@core/base';

export class GetByVidViewRequest {
  @propertyMapper('vid', String)
  public vid: string = '';

  constructor(vid: string) {
    this.vid = vid;
  }
}
