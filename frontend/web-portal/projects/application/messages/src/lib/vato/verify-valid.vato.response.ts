import { propertyMapper } from '@core/base';

export class VerifyValidVATOResponse {
  @propertyMapper('isValid', Boolean)
  public isValid: boolean = false;
}
