import { InjectionToken, Type } from '@angular/core';
import { ViewRenderRegistry } from './view.render.registry';
export interface ViewRefMapperRegistry {
    getViewTypesMap(): Map<string, Type<ViewRenderRegistry>>;
    setViewType(viewName: string, viewType: Type<ViewRenderRegistry>): void;
    getViewType(viewName: string): Type<ViewRenderRegistry> | null;
    getViewName(type: Type<ViewRenderRegistry>): string | undefined;
}
export declare const VIEW_REF_MAPPER_REGISTRY: InjectionToken<ViewRefMapperRegistry>;
