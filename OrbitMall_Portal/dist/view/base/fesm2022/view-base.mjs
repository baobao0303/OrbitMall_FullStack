import * as i0 from '@angular/core';
import { signal, computed, Injectable, InjectionToken, inject, effect, Injector, Renderer2, runInInjectionContext } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthorizationConstant } from '@infrastructure/authorization';
import { tap, catchError, finalize } from 'rxjs';

/**
 * At the once time, the class will keep the active component (view)
 * Support to identify the view to handle the keyboard push or others
 */
class ViewActive {
    constructor() {
        /**
         * ActiveView signal will store the actve view (only one)
         * Sync with signal
         * The variable is different to compare with Active window in Hub (Window)
         */
        this._activeView = signal('');
        this._activeViewData = signal({});
        /**
         * Return the current active view
         * Sync with signal
         */
        this.getActiveView = computed(() => this._activeView());
        /**
         * Return the current active view data
         */
        this.getActiveViewData = computed(() => this._activeViewData());
    }
    /**
     * Set active view
     * @param activeView {string}
     * @param activeViewData {ViewData}
     */
    setActiveView(activeView, activeViewData) {
        this._activeView.set(activeView);
        /** Store data into as state or anything */
        if (activeViewData)
            this._activeViewData.set(activeViewData);
    }
    /**
     * Set active view data
     * @param activeView {string}
     * @param activeViewData {ViewData}
     */
    setActiveViewData(activeView, activeViewData) {
        if (activeView == this._activeView()) {
            if (activeViewData != undefined) {
                const newViewData = { ...this._activeViewData(), ...activeViewData };
                this._activeViewData.set(newViewData);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewActive, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewActive, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewActive, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const VIEW_ACTIVE_REGISTRY = new InjectionToken('VIEW_ACTIVE_REGISTRY');

const VIEW_CONTEXT = new InjectionToken('VIEW_CONTEXT');

/**
 * Keyboard keys
 */
var KeyboardKeys;
(function (KeyboardKeys) {
    KeyboardKeys["Control"] = "control";
    KeyboardKeys["Alt"] = "alt";
    KeyboardKeys["Shift"] = "shift";
    KeyboardKeys["Escape"] = "escape";
})(KeyboardKeys || (KeyboardKeys = {}));
/**
 * Key Map for the keyboard keys
 */
const KEY_MAP = {
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
};
/**
 * Modifier key getters
 */
const MODIFIER_KEY_GETTERS = {
    alt: (event) => event.altKey,
    control: (event) => event.ctrlKey,
    meta: (event) => event.metaKey,
    shift: (event) => event.shiftKey,
    break: () => false,
};
class ViewCommandMediator {
    constructor() {
        this._viewCommandMap = new Map();
        /**
         * Get all commands with key
         * @param key string
         * @returns ViewCommandType[] | undefined
         */
        this.getViewCommands = (key) => this._viewCommandMap.get(key);
        /**
         * Get command with key and viewName
         * @param key string
         * @param viewName string
         * @returns ViewCommandType | undefined
         */
        this.getViewCommand = (key, viewName) => {
            const commands = this._viewCommandMap.get(key);
            if (!commands) {
                console.warn(`[ViewCommandMediator.getViewCommand] Command '${key}' not found to execute ...`);
                return;
            }
            return commands.find((command) => command.viewName === viewName);
        };
        /**
         * Delete all commands with key
         * @warning This will delete all commands with key
         * @param key
         */
        this.deleteCommands = (key) => this._viewCommandMap.delete(key);
    }
    /**
     * Set view command to the map
     *
     * @param key [string] -> e.g. 'keydown.control.s'
     * @param viewName [string] -> view name for the command, eg: 'ViewConstant.CONTACT' -> 'contact'
     * @param viewCommand [ViewCommand] -> ViewCommand to execute, eg: { execute: () => { console.log('view1') } }
     * @param isShortcutRegister [boolean] -> If true, it will be registered as shortcut
     * @param isPermanent [boolean] -> If true, it will be permanent command, it will not be removed
     */
    setViewCommandToMap(key, viewName, viewCommand, isShortcutRegister = false, isPermanent = false) {
        // Get the command with key from the map, It can be multiple commands with same key
        const command = this._viewCommandMap.get(key);
        const viewCommandType = {
            viewName: viewName,
            viewCommand: viewCommand,
            isShortcutRegister: isShortcutRegister,
            isPermanent: isPermanent,
            toRemoveListener: undefined,
        };
        if (!command) {
            // If command not found, then create new command and add to the map
            this._viewCommandMap.set(key, [viewCommandType]);
        }
        else {
            // If command found, then add new command to the list
            command.push(viewCommandType);
        }
        // console.info(`[ViewCommandMediator.setViewCommandToMap] Command '${key}' adding new command to the list ...`, this._viewCommandMap.get(key));
        // console.info(`[ViewCommandMediator.setViewCommandToMap] Command '${key}' Total command: `);
        // console.table(Array.from(this._viewCommandMap.entries(), ([k, v]) => ({ key: k, value: { v } })));
    }
    /**
     * Execute command by key
     * @param key   -> string: key string. e.g. 'keydown.ctrl.s'
     * @param data  -> data, it can any in json or undefined to pass to the command
     * @param viewName -> view name to execute the command. If viewName is provided, then execute only that command otherwise execute all commands with key
     */
    executeCommandFromMap(key, data, viewName) {
        // console.log('DEBUG: executeCommandFromMap', key, data, viewName);
        const commands = this._viewCommandMap.get(key);
        if (!commands) {
            console.warn(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' not found to execute ...`);
            return;
        }
        // If viewName is provided, then execute only that command
        if (viewName) {
            const command = this.getViewCommand(key, viewName);
            if (!command) {
                console.warn(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' not found to execute`);
                return;
            }
            command.viewCommand.executeCommand(data);
            console.info(`[ViewCommandMediator.executeCommandFromMap] Command '${key}' executed ...`, data, viewName);
        }
        else {
            // Execute all commands with key
            // TODO: this's never be called
            commands.forEach((command) => {
                command.viewCommand.executeCommand(data);
            });
        }
    }
    /**
     * Delete command with key and viewName
     * @param key
     * @param viewName
     */
    deleteCommand(key, viewName) {
        const commands = this._viewCommandMap.get(key);
        if (!commands) {
            console.log(`[ViewCommandMediator.deleteCommand] Command '${key}' not found to delete ...`);
            return;
        }
        const index = commands.findIndex((command) => command.viewName === viewName);
        if (index !== -1) {
            commands.splice(index, 1);
        }
        // If no command found, then delete the key from the map
        if (commands.length === 0) {
            this._viewCommandMap.delete(key);
        }
        // console.info(`[ViewCommandMediator.deleteCommand] Command remaining '${key}'`, this._viewCommandMap.get(key));
        return;
    }
    /**
     * Get all view commands by property
     * @param propertyKey - The property to filter by (e.g., 'isShortcutRegister' or 'isPermanent')
     * @param propertyValue - The value of the property to match
     * @see {@link ViewCommandMap} - A map of view commands that match the property
     */
    getViewCommandsByProperty(propertyKey, propertyValue) {
        const viewCommands = new Map();
        this._viewCommandMap.forEach((commands, key) => {
            let commandsHasKey = [];
            Array.from(commands).forEach((command) => {
                if (command[propertyKey] === propertyValue) {
                    commandsHasKey.push(command);
                }
            });
            viewCommands.set(key, commandsHasKey);
        });
        return viewCommands;
    }
    get size() {
        return this._viewCommandMap.size;
    }
    /**
     * Handle keydown event
     * @param event - KeyboardEvent
     * @param data - ViewData
     * @param viewName - string e.g. 'hub_component'
     * @returns
     */
    onKeydownEventHandler(event, data, viewName) {
        event.preventDefault();
        // Get the key code
        let keycode = KEY_MAP[event.key] || event.key;
        var keyCombining = '';
        if (keycode == null || keycode == undefined) {
            console.warn(`[ViewCommandMediator.onKeydownEventHandler] keyCode is null or undefined ...`);
            return false;
        }
        keycode.toLowerCase();
        if (keycode === ' ') {
            // For space key
            // @example 'keydown.space'
            keycode = 'space';
        }
        else if (keycode === '.') {
            // For dot key
            // @example 'keydown.ctrl.'
            keycode = 'dot';
        }
        Array.from(Object.keys(KeyboardKeys)).forEach((modifierKey, idx) => {
            modifierKey = modifierKey.toLowerCase();
            if (modifierKey !== keycode) {
                const modifierKeyGetter = MODIFIER_KEY_GETTERS[modifierKey] || MODIFIER_KEY_GETTERS['break'];
                if (modifierKeyGetter(event) !== undefined && modifierKeyGetter(event)) {
                    keyCombining += `${modifierKey}.`;
                }
            }
        });
        keyCombining += keycode;
        return this.executeCommandFromMap(`keydown.${keyCombining}`, data, viewName);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewCommandMediator, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewCommandMediator, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewCommandMediator, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const VIEW_COMMAND_REGISTRY = new InjectionToken('VIEW_COMMAND_REGISTRY');
const VIEW_COMMAND_MAPPER_REGISTRY = new InjectionToken('VIEW_COMMAND_MAPPER_REGISTRY');

/**
 * Native key (shortcut) as command register.
 * It must be used in runInInjectionContext
 * @param key - shortcut key (e.g. 'ctrl+shift+1')
 * @param viewCommand - command to be executed
 * @param isShortcutRegister - is it a shortcut register
 * @param isPermanent - is it a permanent register
 */
function nativeCommandRegister(key, viewCommand, isShortcutRegister = false, isPermanent = false) {
    const _viewCommandMediator = inject(ViewCommandMediator);
    const _viewCommandMapperRegistry = inject(VIEW_COMMAND_MAPPER_REGISTRY);
    const _viewCommandRegistry = inject(VIEW_COMMAND_REGISTRY);
    _viewCommandMediator.setViewCommandToMap(_viewCommandMapperRegistry.getKeyViewCommand(key), _viewCommandRegistry.viewName(), viewCommand, isShortcutRegister, isPermanent);
}
/**
 * Native key (shortcut) as command register.
 * With permanent
 * @param key
 * @param viewCommand
 */
function nativeCommandWithPermanentRegister(key, viewCommand) {
    nativeCommandRegister(key, viewCommand, false, true);
}
/**
 * Native key (shortcut) as command register.
 * Without permanent
 * @param key
 * @param viewCommand
 */
function nativeCommandWithoutPermanentRegister(key, viewCommand) {
    nativeCommandRegister(key, viewCommand, false, false);
}
/**
 * Execute commands from everywhere.
 * @warning It must be used in runInInjectionContext
 * @see {@link https://angular.dev/api/core/runInInjectionContext?tab=api}
 * @param key - shortcut key (e.g. 'ctrl+shift+1')
 * @param data - view data {@link ViewData}
 * @param viewName - view name (e.g. 'hub_component')
 */
function executeShortcutCommand(key, data, viewName) {
    const _viewCommandMediator = inject(ViewCommandMediator);
    _viewCommandMediator.executeCommandFromMap(key, data, viewName);
}
/**
 * Creates a debounced signal that updates its value after a specified delay.
 *
 * @template T - The type of the signal value.
 * @param {Signal<T>} sourceSignal - The reference to the original signal.
 * @param {number} [debounceTimeInMs=0] - The delay in milliseconds before the signal updates.
 * @returns {Signal<T>} - A new signal that updates its value after the specified delay.
 */
function debouncedSignal(sourceSignal, debounceTimeInMs = 0) {
    const debounceSignal = signal(sourceSignal());
    effect((onCleanup) => {
        const value = sourceSignal();
        const timeout = setTimeout(() => debounceSignal.set(value), debounceTimeInMs);
        // The `onCleanup` argument is a function which is called when the effect
        // runs again (and when it is destroyed).
        // By clearing the timeout here we achieve proper debouncing.
        // See https://angular.io/guide/signals#effect-cleanup-functions
        onCleanup(() => clearTimeout(timeout));
    }, { allowSignalWrites: true });
    return debounceSignal;
}

class ViewBase {
    constructor() {
        this._injector = inject(Injector);
        this._vcm = inject(ViewCommandMediator);
        this._router = inject(Router);
        this._renderer = inject(Renderer2);
        this._dialog = inject(Dialog);
        this._overlay = inject(Overlay);
        this._document = inject(DOCUMENT);
        this._storage = inject(BROWSER_STORAGE);
        this._context = inject(VIEW_CONTEXT);
        this._viewCommandMapperRegistry = inject(VIEW_COMMAND_MAPPER_REGISTRY);
        /**
         * TODO: MOVE THIS TO VIEW CONTEXT
         * A signal representing the current view mode of the widget.
         *
         * @protected
         * @default 'VIEW'
         */
        this._viewMode = signal('VIEW');
        this.getViewMode = computed(() => this._viewMode());
    }
    setViewMode(viewMode) {
        this._viewMode.set(viewMode);
    }
    /**
     * Open dialog with options
     * @param {DialogOptions} options
     * @param {Type<ViewRenderRegistry>} componentType
     */
    openDialog(componentType, options) {
        const dialogConfig = {
            data: options,
            disableClose: options?.disableClose ?? true,
            autoFocus: true,
            hasBackdrop: true,
            restoreFocus: true,
            width: options ? undefined : '530px',
        };
        let dialogRef = null;
        if (componentType) {
            dialogRef = this._dialog.open(componentType, dialogConfig);
            dialogRef.closed.subscribe((result) => {
                if (options?.actionHandler) {
                    const actionResult = result;
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
    executeCommand(key, data, viewName) {
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
    getContextAs() {
        const context = this._context;
        return context;
    }
}

const VIEW_ACTION = new InjectionToken('VIEW_ACTION');
const VIEW_RENDER_REGISTRY = new InjectionToken('VIEW_RENDER_REGISTRY');

class ViewCommandBase {
    constructor() {
        this._context = inject(VIEW_CONTEXT);
        this._viewRenderRegistry = inject(VIEW_RENDER_REGISTRY);
        this._viewActiveRegistry = inject(VIEW_ACTIVE_REGISTRY);
        this._viewActiveChecked = false;
    }
    /**
     * Defines this method as get the context type for type check
     * @returns Context Type
     */
    getContextAs() {
        const context = this._context;
        return context;
    }
    viewActiveChecked(viewActiveCheck = true) {
        this._viewActiveChecked = viewActiveCheck;
    }
    executeCommand(data) {
        const viewName = this._viewRenderRegistry.viewName();
        if (this._viewActiveChecked) {
            if (viewName == this._viewActiveRegistry.getActiveView()) {
                console.log(`Execute command in View=[${viewName}] with MeViewActive=${this._viewActiveChecked}`);
                this.execute(data);
            }
        }
        else {
            this.execute(data);
        }
    }
}

/**
 * The `ViewContext` abstract class provides a base implementation for managing the state of a view,
 * handling requests with error management, and displaying a loading overlay during asynchronous operations.
 *
 * @abstract
 * @class
 */
class ViewContext {
    constructor() {
        this.storage = inject(BROWSER_STORAGE);
        this.overlay = inject(Overlay);
        this.overlayRef = null;
        /**
         * A protected property that holds the current state of the view.
         * It uses a signal to manage the state, which is initially set to 'INIT'.
         *
         * @protected
         * @default 'INIT'
         */
        this._viewState = signal('INIT');
        this.getViewState = computed(() => this._viewState());
    }
    setViewState(viewState) {
        this._viewState.set(viewState);
    }
    get isInit() {
        return computed(() => this.getViewState() === 'INIT');
    }
    get isIdle() {
        return computed(() => this.getViewState() === 'IDLE');
    }
    get isLoading() {
        return computed(() => this.getViewState() === 'LOADING');
    }
    get isLoaded() {
        return computed(() => this.getViewState() === 'LOADED');
    }
    get isError() {
        return computed(() => this.getViewState() === 'ERROR');
    }
    /**
     * Wraps the provided request function with error handling logic.
     *
     * @param request - The request function to be wrapped.
     * @param onError - Optional error handler to be executed when an error occurs.
     */
    executeRequest(request) {
        this.setViewState('LOADING');
        return request.pipe(tap(() => this.setViewState('LOADED')), catchError((error) => {
            this.setViewState('ERROR');
            throw error;
        }), finalize(() => this.setViewState('IDLE')));
    }
    /**
     * Executes a given request while displaying a loading overlay.
     *
     * This method opens a loading overlay before executing the request and ensures
     * that the overlay is closed once the request is finalized, regardless of whether
     * it succeeds or fails.
     *
     * @template T - The type of the response expected from the request.
     * @param {Observable<T>} request - The observable request to be executed.
     * @returns {Observable<T>} - An observable that emits the response of the request.
     */
    executeRequestWithLoadingOverlay(request) {
        this.openLoadingOverlay();
        return this.executeRequest(request).pipe(finalize(() => this.closeOverlay()));
    }
    /**
     * Executes a request while displaying a loading overlay and handling an event.
     *
     * This method opens a loading overlay, executes the given request, and then
     * subscribes to the provided event to close the overlay. The overlay is closed
     * both when the event is emitted and when the request completes.
     *
     * @template T - The type of the response from the request.
     * @param {Observable<T>} request - The request to be executed.
     * @param {Observable<any>} eventForLoadingOverlay - The event that triggers the closing of the loading overlay.
     * @returns {Observable<T>} - An observable that emits the response of the request.
     */
    executeRequestWithLoadingOverlayAndEvent(request, eventForLoadingOverlay) {
        this.openLoadingOverlay();
        return this.executeRequest(request).pipe(tap(() => this.closeOverlay()), finalize(() => {
            const closeOverlaySubscription = eventForLoadingOverlay.subscribe({
                next: () => this.closeOverlay(),
                error: () => this.closeOverlay(),
                complete: () => this.closeOverlay(),
            });
            // Unsubscribe from the event when the request is finalized.
            closeOverlaySubscription.unsubscribe();
        }), catchError((error) => {
            this.closeOverlay();
            throw error;
        }));
    }
    /**
     * Opens the loading overlay and increases the counter.
     * The overlay will only be created on the first call.
     */
    openLoadingOverlay() {
        if (this.overlayRef) {
            return;
        }
        const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });
        this.overlayRef = this.overlay.create(overlayConfig);
        const spinnerPortal = new ComponentPortal(MatProgressSpinner);
        const spinnerRef = this.overlayRef.attach(spinnerPortal);
        spinnerRef.instance.diameter = 40;
        spinnerRef.instance.color = 'primary';
        spinnerRef.instance.mode = 'indeterminate';
    }
    /**
     * Closes the overlay when the counter reaches zero.
     * Decreases the counter and only closes the overlay when no more open calls are pending.
     */
    closeOverlay() {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
    /**
     * Retrieves the contact ID from local storage.
     *
     * @returns {string} The contact ID if it exists in local storage.
     * @throws Will log an error to the console if the contact ID is not found in local storage.
     */
    get contactId() {
        const contactId = this.storage.get(AuthorizationConstant.contactId);
        if (!contactId) {
            throw new Error('Contact ID not found in local storage.');
        }
        return contactId;
    }
}

/**
 * The `ViewEditContext` abstract class extends the `ViewContext` class and provides
 * an interface for managing the lifecycle of an item within a view. It includes
 * methods for saving, removing, and canceling updates or creations of items.
 *
 * @abstract
 * @extends {ViewContext}
 */
class ViewEditContext extends ViewContext {
}
const VIEW_EDIT_CONTEXT = new InjectionToken('VIEW_EDIT_CONTEXT');

/**
 * An abstract class that provides a context for managing a list of view items.
 * Extends the `ViewContext` class.
 *
 * @abstract
 * @extends {ViewContext}
 */
class ViewListContext extends ViewContext {
}
const VIEW_LIST_CONTEXT = new InjectionToken('VIEW_LIST_CONTEXT');

const VIEW_REF_MAPPER_REGISTRY = new InjectionToken('VIEW_REF_MAPPER_REGISTRY');

/*
 * Public API Surface of base
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KEY_MAP, KeyboardKeys, MODIFIER_KEY_GETTERS, VIEW_ACTION, VIEW_ACTIVE_REGISTRY, VIEW_COMMAND_MAPPER_REGISTRY, VIEW_COMMAND_REGISTRY, VIEW_CONTEXT, VIEW_EDIT_CONTEXT, VIEW_LIST_CONTEXT, VIEW_REF_MAPPER_REGISTRY, VIEW_RENDER_REGISTRY, ViewActive, ViewBase, ViewCommandBase, ViewCommandMediator, ViewContext, ViewEditContext, ViewListContext, debouncedSignal, executeShortcutCommand, nativeCommandRegister, nativeCommandWithPermanentRegister, nativeCommandWithoutPermanentRegister };
//# sourceMappingURL=view-base.mjs.map
