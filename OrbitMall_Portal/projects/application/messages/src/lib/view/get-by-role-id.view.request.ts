import { propertyMapper } from '@core/base';

export class GetByRoleIdViewRequest {
  @propertyMapper('RoleId')
  public id: string = '';

  constructor(id: string) {
    this.id = id;
  }
}
