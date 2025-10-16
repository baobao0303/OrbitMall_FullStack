import { InjectionToken } from '@angular/core';
import { ViewEditContext } from './view.edit.context';
import { ViewListContext } from './view.list.context';

/**
 * Aggregate all context for use
 */
export interface ViewAggregationContext extends ViewListContext, ViewEditContext {}
export const VIEW_CONTEXT = new InjectionToken<ViewAggregationContext>('VIEW_CONTEXT');
