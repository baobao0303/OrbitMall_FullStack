import { InjectionToken } from '@angular/core';
import { ViewContext } from './view.context';
import { ViewDataType } from './view.type';
/**
 * An abstract class that provides a context for managing a list of view items.
 * Extends the `ViewContext` class.
 *
 * @abstract
 * @extends {ViewContext}
 */
export declare abstract class ViewListContext extends ViewContext {
    /**
     * Gets the size of the view list.
     *
     * @returns The number of items in the view list.
     */
    abstract getSize(): number;
    /**
     * Sets the items in the view list.
     *
     * @param items - An array of items to be set in the view list.
     */
    abstract setItems(items: ViewDataType[]): void;
    /**
     * Gets the items in the view list.
     *
     * @returns An array of items in the view list.
     */
    abstract getItems(): ViewDataType[];
}
export declare const VIEW_LIST_CONTEXT: InjectionToken<ViewListContext>;
