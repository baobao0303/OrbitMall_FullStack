import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Injector, Renderer2, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ViewData, ViewMode } from './view.type';
import { ViewRenderRegistry } from './view.render.registry';
import { ViewCommandMediator } from './view.command.mediator';
import { ViewContext } from './view.context';
import { ViewOptions } from './view.options';
export declare abstract class ViewBase {
    protected readonly _injector: Injector;
    protected readonly _vcm: ViewCommandMediator;
    protected readonly _router: Router;
    protected readonly _renderer: Renderer2;
    protected readonly _dialog: Dialog;
    protected readonly _overlay: Overlay;
    protected readonly _document: Document;
    protected readonly _storage: import("@infrastructure/base").BrowserStorageBase;
    protected readonly _context: import("./view.aggregation.context").ViewAggregationContext;
    protected readonly _viewCommandMapperRegistry: import("./view.command.registry").ViewCommandMapperRegistry;
    /**
     * TODO: MOVE THIS TO VIEW CONTEXT
     * A signal representing the current view mode of the widget.
     *
     * @protected
     * @default 'VIEW'
     */
    protected _viewMode: import("@angular/core").WritableSignal<ViewMode>;
    setViewMode(viewMode: ViewMode): void;
    getViewMode: import("@angular/core").Signal<ViewMode>;
    /**
     * Open dialog with options
     * @param {DialogOptions} options
     * @param {Type<ViewRenderRegistry>} componentType
     */
    openDialog<T extends ViewOptions>(componentType: Type<ViewRenderRegistry>, options?: T): void;
    /**
     * Executes a command based on the provided key, optional data, and optional view name.
     *
     * @param key - The key representing the command to be executed.
     * @param data - Optional data to be passed to the command.
     * @param viewName - Optional name of the view where the command is executed.
     */
    executeCommand(key: string, data?: ViewData, viewName?: string): void;
    /**
     * Retrieves the current context and casts it to the specified type.
     *
     * @template CType - The type to cast the context to, which extends `ViewContext`.
     * @returns The current context cast to the specified type `CType`.
     */
    getContextAs<CType extends ViewContext>(): CType;
}
