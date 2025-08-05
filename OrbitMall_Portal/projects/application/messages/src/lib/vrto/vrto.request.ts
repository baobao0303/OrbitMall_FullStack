import { propertyMapper } from '@core/base';

export class VRTORequest {
  @propertyMapper('vrto', String)
  public vrto: string = '';
}
