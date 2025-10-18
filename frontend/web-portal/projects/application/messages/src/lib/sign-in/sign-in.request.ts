import { propertyMapper } from '@core/base';

export class SignInRequest {
  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('password', String)
  public password: string = '';
}
