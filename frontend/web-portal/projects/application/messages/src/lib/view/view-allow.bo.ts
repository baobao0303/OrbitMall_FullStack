import { propertyMapper } from '@core/base';

export class ViewAllowBO {
  @propertyMapper('allowReadMutually', String)
  public allowReadMutually: boolean = false;

  @propertyMapper('allowReadPrivately', Boolean)
  public allowReadPrivately: boolean = false;

  @propertyMapper('allowUpdated', Boolean)
  public allowUpdated: boolean = false;

  @propertyMapper('allowDeleted', Boolean)
  public allowDeleted: boolean = false;

  @propertyMapper('allowCreated', Boolean)
  public allowCreated: boolean = false;
}
