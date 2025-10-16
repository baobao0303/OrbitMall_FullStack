import { propertyMapper } from '@core/base';
import { ViewBO } from './view.bo';

export class GetAllViewsResponse {
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

  @propertyMapper('parentViewId', String)
  public parentViewId: string | null = null;

  @propertyMapper('viewChildren', ViewBO)
  public viewChildren: ViewBO[] = [];
}
