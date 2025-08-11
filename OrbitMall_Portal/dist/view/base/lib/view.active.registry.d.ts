import { InjectionToken } from '@angular/core';
import { ViewData } from './view.type';
export interface ViewActiveRegistry {
    getActiveView(): string;
    getActiveViewData(): ViewData;
    setActiveView(activeView: string, data?: ViewData): void;
    setActiveViewData(activeView: string, activeViewData?: ViewData): void;
}
export declare const VIEW_ACTIVE_REGISTRY: InjectionToken<ViewActiveRegistry>;
