import { ViewData } from './view.type';
import { ViewActiveRegistry } from './view.active.registry';
import * as i0 from "@angular/core";
/**
 * At the once time, the class will keep the active component (view)
 * Support to identify the view to handle the keyboard push or others
 */
export declare class ViewActive implements ViewActiveRegistry {
    /**
     * ActiveView signal will store the actve view (only one)
     * Sync with signal
     * The variable is different to compare with Active window in Hub (Window)
     */
    private _activeView;
    private _activeViewData;
    /**
     * Return the current active view
     * Sync with signal
     */
    getActiveView: import("@angular/core").Signal<string>;
    /**
     * Return the current active view data
     */
    getActiveViewData: import("@angular/core").Signal<ViewData>;
    /**
     * Set active view
     * @param activeView {string}
     * @param activeViewData {ViewData}
     */
    setActiveView(activeView: string, activeViewData?: ViewData): void;
    /**
     * Set active view data
     * @param activeView {string}
     * @param activeViewData {ViewData}
     */
    setActiveViewData(activeView: string, activeViewData?: ViewData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewActive, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewActive>;
}
