import { Injectable } from '@angular/core';
import { ViewCommandMapperRegistry } from '@view/base';

@Injectable({ providedIn: 'root' })
export class ViewCommandMapper implements ViewCommandMapperRegistry {
  protected keyCommandMapper: Map<string, string>;

  constructor() {
    /**
     * TODO: It should be in database mapper or definied in config file.
     */
    this.keyCommandMapper = new Map<string, string>([]);
  }

  /**
   * Get key view by viewName
   * @param viewName
   * @returns
   */
  public getKeyViewCommand(name: string): string {
    const key = this.keyCommandMapper.get(name);
    if (key) {
      return key;
    }
    throw new Error(`[ERROR] -> ${name} does not exists the shortcut .... `);
  }

  /**
   * Set key name
   * @param name
   * @param shortCut
   */
  public setKeyViewCommand(name: string, shortCut: string): void {
    const key = this.keyCommandMapper.get(name);
    if (key == undefined) {
      this.keyCommandMapper.set(name, shortCut);
    }
    throw new Error(`[ERROR] -> ${name} does exists the shortcut .... `);
  }
}
