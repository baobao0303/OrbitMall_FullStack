import { propertyMapper } from '@core/base';

export class SignInResponse {
  @propertyMapper('message', String)
  message: string = '';

  @propertyMapper('vato', String)
  vato: string = '';

  @propertyMapper('vrto', String)
  vrto: string = '';

  @propertyMapper('fullName', String)
  fullName: string = '';
}
