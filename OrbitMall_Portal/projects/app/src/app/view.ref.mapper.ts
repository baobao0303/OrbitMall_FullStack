import { Injectable, Type } from '@angular/core';
import { ViewRefMapperRegistry, ViewRenderRegistry } from '@view/base';
import { ViewConstant } from './view.constant';

@Injectable({ providedIn: 'root' })
export class ViewRefMapper implements ViewRefMapperRegistry {
  protected viewTypesMap: Map<string, Type<ViewRenderRegistry>>;
  protected viewRefHeaderMap: Map<string, string>;

  constructor() {
    /** Dynamic add, not right now */
    this.viewTypesMap = new Map<string, Type<ViewRenderRegistry>>([]);

    this.viewRefHeaderMap = new Map<string, string>([]);
  }

  /**
   * Get view type
   * @param viewName
   * @returns {Type<ViewRenderRegistry> | null}
   * @example this.vrm.getViewType('calendar') -> CalendarComponent
   */
  public getViewType(viewName: string): Type<ViewRenderRegistry> | null {
    const vt = this.viewTypesMap.get(viewName);
    return vt ?? null;
  }

  /**
   * Get View Type Map
   * @returns {Map<string, Type<ViewRenderRegistry>>}
   * @example this.vrm.getViewTypesMap() -> Map(2) { 'calendar' => CalendarComponent, 'calendar_header' => CalendarHeaderComponent }
   */
  public getViewTypesMap(): Map<string, Type<ViewRenderRegistry>> {
    return this.viewTypesMap;
  }

  /**
   * Set View Typ
   * @param viewName
   * @param viewType
   * @example this.vrm.setViewType('calendar', CalendarComponent)
   */
  public setViewType(viewName: string, viewType: Type<ViewRenderRegistry>) {
    const vt = this.getViewType(viewName);
    if (!vt) {
      this.viewTypesMap.set(viewName, viewType);
    }
  }

  /**
   * Defines to get the VID Header
   * @param vid
   * @returns {string | undefined}
   * @example this.vrm.getVIDHeader('calendar') -> 'calendar_header'
   */
  public getVIDHeader(vid: string): string | undefined {
    return this.viewRefHeaderMap.get(vid);
  }

  /**
   * Get View Name
   * @param type
   * @returns {string | null}
   * @example this.vrm.getViewName(CalendarComponent) -> 'calendar'
   */
  public getViewName(type: Type<ViewRenderRegistry>): string | undefined {
    for (const [key, value] of this.viewTypesMap.entries()) {
      if (value === type) return key;
    }
    return undefined;
  }
}
