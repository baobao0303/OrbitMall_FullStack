import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { computed, inject, Injector, Renderer2, runInInjectionContext, signal, Type } from '@angular/core';
import { Router } from '@angular/router';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { ActionHandlerType, ViewData, ViewMode } from './view.type';
import { ViewRenderRegistry } from './view.render.registry';
import { ViewCommandMediator } from './view.command.mediator';
import { VIEW_CONTEXT } from './view.aggregation.context';
import { VIEW_COMMAND_MAPPER_REGISTRY } from './view.command.registry';
import { ViewContext } from './view.context';
import { executeShortcutCommand } from './view.command.helper';
import { ViewOptions } from './view.options';

export abstract class ViewBase {
  protected readonly _injector = inject(Injector);
  protected readonly _vcm = inject(ViewCommandMediator);
  protected readonly _router = inject(Router);
  protected readonly _renderer = inject(Renderer2);
  protected readonly _dialog = inject(Dialog);
  protected readonly _overlay = inject(Overlay);
  protected readonly _document = inject(DOCUMENT);
  protected readonly _storage = inject(BROWSER_STORAGE);
  protected readonly _context = inject(VIEW_CONTEXT);
  protected readonly _viewCommandMapperRegistry = inject(VIEW_COMMAND_MAPPER_REGISTRY);

  /**
   * TODO: MOVE THIS TO VIEW CONTEXT
   * A signal representing the current view mode of the widget.
   *
   * @protected
   * @default 'VIEW'
   */
  protected _viewMode = signal<ViewMode>('VIEW');
  public setViewMode(viewMode: ViewMode) {
    this._viewMode.set(viewMode);
  }
  public getViewMode = computed(() => this._viewMode());

  /**
   * Open dialog with options
   * @param {DialogOptions} options
   * @param {Type<ViewRenderRegistry>} componentType
   */
  public openDialog<T extends ViewOptions>(componentType: Type<ViewRenderRegistry>, options?: T) {
    const dialogConfig = {
      data: options,
      disableClose: options?.disableClose ?? true,
      autoFocus: true,
      hasBackdrop: true,
      restoreFocus: true,
      width: options ? undefined : '530px',
    };

    let dialogRef: DialogRef<unknown, ViewRenderRegistry> | DialogRef<unknown> | null = null;

    if (componentType) {
      dialogRef = this._dialog.open(componentType, dialogConfig);
      dialogRef.closed.subscribe((result) => {
        if (options?.actionHandler) {
          const actionResult = result as ActionHandlerType;
          options.actionHandler(actionResult);
        }
      });
    }
  }

  /**
   * Executes a command based on the provided key, optional data, and optional view name.
   *
   * @param key - The key representing the command to be executed.
   * @param data - Optional data to be passed to the command.
   * @param viewName - Optional name of the view where the command is executed.
   */
  public executeCommand(key: string, data?: ViewData, viewName?: string) {
    const shortCutKey = this._viewCommandMapperRegistry.getKeyViewCommand(key);
    runInInjectionContext(this._injector, () => {
      executeShortcutCommand(shortCutKey, data, viewName);
    });
  }

  /**
   * Retrieves the current context and casts it to the specified type.
   *
   * @template CType - The type to cast the context to, which extends `ViewContext`.
   * @returns The current context cast to the specified type `CType`.
   */
  public getContextAs<CType extends ViewContext>(): CType {
    const context = this._context as unknown;
    return context as CType;
  }
}
