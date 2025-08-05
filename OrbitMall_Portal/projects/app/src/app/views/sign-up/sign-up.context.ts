import { Injectable } from '@angular/core';
import { ViewContext } from '@view/base';

@Injectable({ providedIn: 'root' })
export class SignUpContext extends ViewContext {
  public setActiveItem(item: any): void {}

  public getActiveItem() {}

  public getViewData(filter?: any) {}
}
