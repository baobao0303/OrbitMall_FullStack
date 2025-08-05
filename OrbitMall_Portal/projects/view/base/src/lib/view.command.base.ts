import { inject } from '@angular/core';
import { ViewContext } from './view.context';
import { VIEW_RENDER_REGISTRY } from './view.render.registry';
import { ViewCommand } from './view.command';
import { VIEW_CONTEXT } from './view.aggregation.context';
import { ViewData } from './view.type';
import { VIEW_ACTIVE_REGISTRY } from './view.active.registry';

export abstract class ViewCommandBase implements ViewCommand {
  protected readonly _context = inject(VIEW_CONTEXT);
  protected readonly _viewRenderRegistry = inject(VIEW_RENDER_REGISTRY);
  protected readonly _viewActiveRegistry = inject(VIEW_ACTIVE_REGISTRY);
  private _viewActiveChecked = false;

  /**
   * Defines this method as get the context type for type check
   * @returns Context Type
   */
  public getContextAs<CType extends ViewContext>(): CType {
    const context = this._context as unknown;
    return context as CType;
  }

  public viewActiveChecked(viewActiveCheck: boolean = true) {
    this._viewActiveChecked = viewActiveCheck;
  }

  /**
   * Execute the command with data and viewName
   * @param data - data to pass to the command
   * @param viewName - view name to execute the command e.g 'hub', 'contact', 'product_list'
   */
  protected abstract execute(data?: ViewData, viewName?: string): void;

  public executeCommand(data?: ViewData) {
    const viewName = this._viewRenderRegistry.viewName();

    if (this._viewActiveChecked) {
      if (viewName == this._viewActiveRegistry.getActiveView()) {
        console.log(`Execute command in View=[${viewName}] with MeViewActive=${this._viewActiveChecked}`);
        this.execute(data);
      }
    } else {
      this.execute(data);
    }
  }
}
