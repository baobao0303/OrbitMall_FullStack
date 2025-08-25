import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDataType, ViewState } from './view.type';
/**
 * The `ViewContext` abstract class provides a base implementation for managing the state of a view,
 * handling requests with error management, and displaying a loading overlay during asynchronous operations.
 *
 * @abstract
 * @class
 */
export declare abstract class ViewContext {
    protected readonly storage: import("@infrastructure/base").BrowserStorageBase;
    private readonly overlay;
    private overlayRef;
    /**
     * A protected property that holds the current state of the view.
     * It uses a signal to manage the state, which is initially set to 'INIT'.
     *
     * @protected
     * @default 'INIT'
     */
    protected _viewState: import("@angular/core").WritableSignal<ViewState>;
    setViewState(viewState: ViewState): void;
    getViewState: Signal<ViewState>;
    get isInit(): Signal<boolean>;
    get isIdle(): Signal<boolean>;
    get isLoading(): Signal<boolean>;
    get isLoaded(): Signal<boolean>;
    get isError(): Signal<boolean>;
    /**
     * Wraps the provided request function with error handling logic.
     *
     * @param request - The request function to be wrapped.
     * @param onError - Optional error handler to be executed when an error occurs.
     */
    protected executeRequest<T>(request: Observable<T>): Observable<T>;
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
    protected executeRequestWithLoadingOverlay<T>(request: Observable<T>): Observable<T>;
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
    protected executeRequestWithLoadingOverlayAndEvent<T>(request: Observable<T>, eventForLoadingOverlay: Observable<any>): Observable<T>;
    /**
     * Opens the loading overlay and increases the counter.
     * The overlay will only be created on the first call.
     */
    private openLoadingOverlay;
    /**
     * Closes the overlay when the counter reaches zero.
     * Decreases the counter and only closes the overlay when no more open calls are pending.
     */
    private closeOverlay;
    /**
     * Retrieves the contact ID from local storage.
     *
     * @returns {string} The contact ID if it exists in local storage.
     * @throws Will log an error to the console if the contact ID is not found in local storage.
     */
    get contactId(): string;
    /**
     * Sets the active item in the view context.
     * @param item - The item to be set as active.
     */
    abstract setActiveItem(item: ViewDataType): void;
    /**
     * Retrieves the active item from the view context.
     * @param filter - Optional filter to apply when retrieving the active item.
     * @returns The active item that matches the filter, if provided.
     */
    abstract getActiveItem(filter?: ViewDataType): ViewDataType;
    /**
     * Retrieves view data from the view context.
     * @param filter - Optional filter to apply when retrieving the view data.
     * @returns The view data that matches the filter, if provided, or an array of view data.
     */
    abstract getViewData(filter?: ViewDataType): ViewDataType | ViewDataType[];
}
