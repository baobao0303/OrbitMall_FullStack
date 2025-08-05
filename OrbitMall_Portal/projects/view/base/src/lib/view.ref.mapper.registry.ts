import { InjectionToken, Type } from '@angular/core';
import { ViewRenderRegistry } from './view.render.registry';
import { ViewData } from './view.type';

export interface ViewRefMapperRegistry {
  getViewTypesMap(): Map<string, Type<ViewRenderRegistry>>;
  // getActiveView(): string;
  // getActiveViewData(): ViewData;
  // setActiveView(activeView: string, data?: ViewData): void;
  // setActiveViewData(activeView: string, activeViewData?: ViewData): void;
  setViewType(viewName: string, viewType: Type<ViewRenderRegistry>): void;
  getViewType(viewName: string): Type<ViewRenderRegistry> | null;
  getViewName(type: Type<ViewRenderRegistry>): string | undefined;
}

export const VIEW_REF_MAPPER_REGISTRY = new InjectionToken<ViewRefMapperRegistry>('VIEW_REF_MAPPER_REGISTRY');
