import { InjectionToken, Type } from '@angular/core';
import { ViewData, ViewDataType, ViewMode } from './view.type';
/**
 * Defines interface ViewAction
 * To use in Widget / Component (write own Button, Input, Dropdow, ...)
 */
export interface ViewAction {
    setTabIndex(value: number): void;
    setFocused(focused: boolean): void;
    setDisabled(disabled: boolean): void;
}
export declare const VIEW_ACTION: InjectionToken<ViewAction>;
/**
 * Defines interface ViewRenderRegistry
 * To set the view name (vid) and view type (component)
 */
export interface ViewRenderRegistry {
    viewName(): string;
    viewType(): Type<ViewRenderRegistry>;
}
/**
 * Defines interface ViewRenderActionRegistry
 * To set reload function
 */
export interface ViewRenderActionRegistry extends ViewAction, ViewRenderRegistry {
    viewReload(filter?: ViewDataType): void;
    setViewMode(viewMode: ViewMode): void;
    getViewMode(): ViewMode;
    actionHandler(actionType: string, data?: ViewData): void;
}
export declare const VIEW_RENDER_REGISTRY: InjectionToken<ViewRenderActionRegistry>;
