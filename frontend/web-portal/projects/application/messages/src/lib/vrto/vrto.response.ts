import { propertyMapper } from '@core/base';

export class VRTOResponse {
  @propertyMapper('vato', String)
  public vato: string = '';

  @propertyMapper('vrto', String)
  public vrto: string = '';
}
