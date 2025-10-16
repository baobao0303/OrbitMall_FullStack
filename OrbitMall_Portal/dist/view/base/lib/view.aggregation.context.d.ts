import { InjectionToken } from '@angular/core';
import { ViewEditContext } from './view.edit.context';
import { ViewListContext } from './view.list.context';
/**
 * Aggregate all context for use
 */
export interface ViewAggregationContext extends ViewListContext, ViewEditContext {
}
export declare const VIEW_CONTEXT: InjectionToken<ViewAggregationContext>;
