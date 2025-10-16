import { HttpStatusCode } from '@angular/common/http';
import { propertyMapper } from '@core/base';

export class VRTOErrorResponse {
  @propertyMapper('title', String)
  public title: string = '';

  @propertyMapper('status', Number)
  public status: number = HttpStatusCode.Unauthorized;

  @propertyMapper('detail', String)
  public detail: string = '';

  constructor(title: string = '', status: number = HttpStatusCode.Unauthorized, detail: string = '') {
    this.title = title;
    this.status = status;
    this.detail = detail;
  }
}
