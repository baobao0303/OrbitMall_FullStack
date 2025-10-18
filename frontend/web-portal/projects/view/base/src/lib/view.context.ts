import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, computed, inject, Signal, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthorizationConstant } from '@infrastructure/authorization';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ViewDataType, ViewState } from './view.type';

/**
 * The `ViewContext` abstract class provides a base implementation for managing the state of a view,
 * handling requests with error management, and displaying a loading overlay during asynchronous operations.
 *
 * @abstract
 * @class
 */
export abstract class ViewContext {
  protected readonly storage = inject(BROWSER_STORAGE);
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  /**
   * A protected property that holds the current state of the view.
   * It uses a signal to manage the state, which is initially set to 'INIT'.
   *
   * @protected
   * @default 'INIT'
   */
  protected _viewState = signal<ViewState>('INIT');
  public setViewState(viewState: ViewState) {
    this._viewState.set(viewState);
  }
  public getViewState = computed(() => this._viewState());

  public get isInit(): Signal<boolean> {
    return computed(() => this.getViewState() === 'INIT');
  }

  public get isIdle(): Signal<boolean> {
    return computed(() => this.getViewState() === 'IDLE');
  }

  public get isLoading(): Signal<boolean> {
    return computed(() => this.getViewState() === 'LOADING');
  }

  public get isLoaded(): Signal<boolean> {
    return computed(() => this.getViewState() === 'LOADED');
  }

  public get isError(): Signal<boolean> {
    return computed(() => this.getViewState() === 'ERROR');
  }

  /**
   * Wraps the provided request function with error handling logic.
   *
   * @param request - The request function to be wrapped.
   * @param onError - Optional error handler to be executed when an error occurs.
   */
  protected executeRequest<T>(request: Observable<T>): Observable<T> {
    this.setViewState('LOADING');

    return request.pipe(
      tap(() => this.setViewState('LOADED')),
      catchError((error) => {
        this.setViewState('ERROR');
        throw error;
      }),
      finalize(() => this.setViewState('IDLE'))
    );
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
  protected executeRequestWithLoadingOverlay<T>(
    request: Observable<T>
  ): Observable<T> {
    this.openLoadingOverlay();

    return this.executeRequest(request).pipe(
      finalize(() => this.closeOverlay())
    );
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
  protected executeRequestWithLoadingOverlayAndEvent<T>(
    request: Observable<T>,
    eventForLoadingOverlay: Observable<any>
  ): Observable<T> {
    this.openLoadingOverlay();

    return this.executeRequest(request).pipe(
      tap(() => this.closeOverlay()),
      finalize(() => {
        const closeOverlaySubscription = eventForLoadingOverlay.subscribe({
          next: () => this.closeOverlay(),
          error: () => this.closeOverlay(),
          complete: () => this.closeOverlay(),
        });
        // Unsubscribe from the event when the request is finalized.
        closeOverlaySubscription.unsubscribe();
      }),
      catchError((error) => {
        this.closeOverlay();
        throw error;
      })
    );
  }

  /**
   * Opens the loading overlay and increases the counter.
   * The overlay will only be created on the first call.
   */
  private openLoadingOverlay(): void {
    if (this.overlayRef) {
      return;
    }
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });
    this.overlayRef = this.overlay.create(overlayConfig);
    const spinnerPortal = new ComponentPortal(MatProgressSpinner);
    const spinnerRef: ComponentRef<MatProgressSpinner> =
      this.overlayRef.attach(spinnerPortal);

    spinnerRef.instance.diameter = 40;
    spinnerRef.instance.color = 'primary';
    spinnerRef.instance.mode = 'indeterminate';
  }

  /**
   * Closes the overlay when the counter reaches zero.
   * Decreases the counter and only closes the overlay when no more open calls are pending.
   */
  private closeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  public get fullName(): string {
    const fullName = this.storage.get(AuthorizationConstant.fullName);
    if (!fullName) {
      throw new Error('Full name not found in local storage.');
    }
    return fullName;
  }

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
