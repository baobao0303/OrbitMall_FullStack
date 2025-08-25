import { ViewContext } from './view.context';
import { ViewCommand } from './view.command';
import { ViewData } from './view.type';
export declare abstract class ViewCommandBase implements ViewCommand {
    protected readonly _context: import("./view.aggregation.context").ViewAggregationContext;
    protected readonly _viewRenderRegistry: import("./view.render.registry").ViewRenderActionRegistry;
    protected readonly _viewActiveRegistry: import("./view.active.registry").ViewActiveRegistry;
    private _viewActiveChecked;
    /**
     * Defines this method as get the context type for type check
     * @returns Context Type
     */
    getContextAs<CType extends ViewContext>(): CType;
    viewActiveChecked(viewActiveCheck?: boolean): void;
    /**
     * Execute the command with data and viewName
     * @param data - data to pass to the command
     * @param viewName - view name to execute the command e.g 'hub', 'contact', 'product_list'
     */
    protected abstract execute(data?: ViewData, viewName?: string): void;
    executeCommand(data?: ViewData): void;
}
