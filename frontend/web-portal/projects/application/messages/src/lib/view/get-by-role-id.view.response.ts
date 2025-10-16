import { propertyMapper } from '@core/base';
import { ViewAllowBO } from './view-allow.bo';
export class GetByRoleIdViewResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('title', String)
  public title: string = '';

  @propertyMapper('icon', String)
  public icon: string = '';

  @propertyMapper('vId', String)
  public vId: string = '';

  @propertyMapper('label', String)
  public label: string = '';

  @propertyMapper('action', ViewAllowBO)
  public action: ViewAllowBO[] = [];
}
