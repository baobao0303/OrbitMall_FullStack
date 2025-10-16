import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { computed, inject, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthorizationConstant } from '@infrastructure/authorization';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { catchError, finalize, tap } from 'rxjs';
/**
 * The `ViewContext` abstract class provides a base implementation for managing the state of a view,
 * handling requests with error management, and displaying a loading overlay during asynchronous operations.
 *
 * @abstract
 * @class
 */
export class ViewContext {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdmlldy9iYXNlL3NyYy9saWIvdmlldy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBZ0IsUUFBUSxFQUFFLE1BQU0sRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFjLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc3RDs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQWdCLFdBQVc7SUFBakM7UUFDcUIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwQyxZQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLGVBQVUsR0FBc0IsSUFBSSxDQUFDO1FBQzdDOzs7Ozs7V0FNRztRQUNPLGVBQVUsR0FBRyxNQUFNLENBQVksTUFBTSxDQUFDLENBQUM7UUFJMUMsaUJBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFnSzFELENBQUM7SUFuS1EsWUFBWSxDQUFDLFNBQW9CO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFHRCxJQUFXLE1BQU07UUFDZixPQUFP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O1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBcUJGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBjb21wdXRlZCwgaW5qZWN0LCBTaWduYWwsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NTcGlubmVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcic7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uQ29uc3RhbnQgfSBmcm9tICdAaW5mcmFzdHJ1Y3R1cmUvYXV0aG9yaXphdGlvbic7XG5pbXBvcnQgeyBCUk9XU0VSX1NUT1JBR0UgfSBmcm9tICdAaW5mcmFzdHJ1Y3R1cmUvYmFzZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaW5hbGl6ZSwgT2JzZXJ2YWJsZSwgdGFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWaWV3RGF0YVR5cGUsIFZpZXdTdGF0ZSB9IGZyb20gJy4vdmlldy50eXBlJztcblxuLyoqXG4gKiBUaGUgYFZpZXdDb250ZXh0YCBhYnN0cmFjdCBjbGFzcyBwcm92aWRlcyBhIGJhc2UgaW1wbGVtZW50YXRpb24gZm9yIG1hbmFnaW5nIHRoZSBzdGF0ZSBvZiBhIHZpZXcsXG4gKiBoYW5kbGluZyByZXF1ZXN0cyB3aXRoIGVycm9yIG1hbmFnZW1lbnQsIGFuZCBkaXNwbGF5aW5nIGEgbG9hZGluZyBvdmVybGF5IGR1cmluZyBhc3luY2hyb25vdXMgb3BlcmF0aW9ucy5cbiAqXG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmlld0NvbnRleHQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3RvcmFnZSA9IGluamVjdChCUk9XU0VSX1NUT1JBR0UpO1xuICBwcml2YXRlIHJlYWRvbmx5IG92ZXJsYXkgPSBpbmplY3QoT3ZlcmxheSk7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuICAvKipcbiAgICogQSBwcm90ZWN0ZWQgcHJvcGVydHkgdGhhdCBob2xkcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgdmlldy5cbiAgICogSXQgdXNlcyBhIHNpZ25hbCB0byBtYW5hZ2UgdGhlIHN0YXRlLCB3aGljaCBpcyBpbml0aWFsbHkgc2V0IHRvICdJTklUJy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAZGVmYXVsdCAnSU5JVCdcbiAgICovXG4gIHByb3RlY3RlZCBfdmlld1N0YXRlID0gc2lnbmFsPFZpZXdTdGF0ZT4oJ0lOSVQnKTtcbiAgcHVibGljIHNldFZpZXdTdGF0ZSh2aWV3U3RhdGU6IFZpZXdTdGF0ZSkge1xuICAgIHRoaXMuX3ZpZXdTdGF0ZS5zZXQodmlld1N0YXRlKTtcbiAgfVxuICBwdWJsaWMgZ2V0Vmlld1N0YXRlID0gY29tcHV0ZWQoKCkgPT4gdGhpcy5fdmlld1N0YXRlKCkpO1xuXG4gIHB1YmxpYyBnZXQgaXNJbml0KCk6IFNpZ25hbDxib29sZWFuPiB7XG4gICAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHRoaXMuZ2V0Vmlld1N0YXRlKCkgPT09ICdJTklUJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzSWRsZSgpOiBTaWduYWw8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjb21wdXRlZCgoKSA9PiB0aGlzLmdldFZpZXdTdGF0ZSgpID09PSAnSURMRScpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0xvYWRpbmcoKTogU2lnbmFsPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gdGhpcy5nZXRWaWV3U3RhdGUoKSA9PT0gJ0xPQURJTkcnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNMb2FkZWQoKTogU2lnbmFsPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gdGhpcy5nZXRWaWV3U3RhdGUoKSA9PT0gJ0xPQURFRCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0Vycm9yKCk6IFNpZ25hbDxib29sZWFuPiB7XG4gICAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHRoaXMuZ2V0Vmlld1N0YXRlKCkgPT09ICdFUlJPUicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBzIHRoZSBwcm92aWRlZCByZXF1ZXN0IGZ1bmN0aW9uIHdpdGggZXJyb3IgaGFuZGxpbmcgbG9naWMuXG4gICAqXG4gICAqIEBwYXJhbSByZXF1ZXN0IC0gVGhlIHJlcXVlc3QgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZC5cbiAgICogQHBhcmFtIG9uRXJyb3IgLSBPcHRpb25hbCBlcnJvciBoYW5kbGVyIHRvIGJlIGV4ZWN1dGVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGV4ZWN1dGVSZXF1ZXN0PFQ+KHJlcXVlc3Q6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICB0aGlzLnNldFZpZXdTdGF0ZSgnTE9BRElORycpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3QucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLnNldFZpZXdTdGF0ZSgnTE9BREVEJykpLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRWaWV3U3RhdGUoJ0VSUk9SJyk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSksXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLnNldFZpZXdTdGF0ZSgnSURMRScpKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgZ2l2ZW4gcmVxdWVzdCB3aGlsZSBkaXNwbGF5aW5nIGEgbG9hZGluZyBvdmVybGF5LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBvcGVucyBhIGxvYWRpbmcgb3ZlcmxheSBiZWZvcmUgZXhlY3V0aW5nIHRoZSByZXF1ZXN0IGFuZCBlbnN1cmVzXG4gICAqIHRoYXQgdGhlIG92ZXJsYXkgaXMgY2xvc2VkIG9uY2UgdGhlIHJlcXVlc3QgaXMgZmluYWxpemVkLCByZWdhcmRsZXNzIG9mIHdoZXRoZXJcbiAgICogaXQgc3VjY2VlZHMgb3IgZmFpbHMuXG4gICAqXG4gICAqIEB0ZW1wbGF0ZSBUIC0gVGhlIHR5cGUgb2YgdGhlIHJlc3BvbnNlIGV4cGVjdGVkIGZyb20gdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxUPn0gcmVxdWVzdCAtIFRoZSBvYnNlcnZhYmxlIHJlcXVlc3QgdG8gYmUgZXhlY3V0ZWQuXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFQ+fSAtIEFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzcG9uc2Ugb2YgdGhlIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgZXhlY3V0ZVJlcXVlc3RXaXRoTG9hZGluZ092ZXJsYXk8VD4ocmVxdWVzdDogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4ge1xuICAgIHRoaXMub3BlbkxvYWRpbmdPdmVybGF5KCk7XG5cbiAgICByZXR1cm4gdGhpcy5leGVjdXRlUmVxdWVzdChyZXF1ZXN0KS5waXBlKGZpbmFsaXplKCgpID0+IHRoaXMuY2xvc2VPdmVybGF5KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHJlcXVlc3Qgd2hpbGUgZGlzcGxheWluZyBhIGxvYWRpbmcgb3ZlcmxheSBhbmQgaGFuZGxpbmcgYW4gZXZlbnQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG9wZW5zIGEgbG9hZGluZyBvdmVybGF5LCBleGVjdXRlcyB0aGUgZ2l2ZW4gcmVxdWVzdCwgYW5kIHRoZW5cbiAgICogc3Vic2NyaWJlcyB0byB0aGUgcHJvdmlkZWQgZXZlbnQgdG8gY2xvc2UgdGhlIG92ZXJsYXkuIFRoZSBvdmVybGF5IGlzIGNsb3NlZFxuICAgKiBib3RoIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQgYW5kIHdoZW4gdGhlIHJlcXVlc3QgY29tcGxldGVzLlxuICAgKlxuICAgKiBAdGVtcGxhdGUgVCAtIFRoZSB0eXBlIG9mIHRoZSByZXNwb25zZSBmcm9tIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge09ic2VydmFibGU8VD59IHJlcXVlc3QgLSBUaGUgcmVxdWVzdCB0byBiZSBleGVjdXRlZC5cbiAgICogQHBhcmFtIHtPYnNlcnZhYmxlPGFueT59IGV2ZW50Rm9yTG9hZGluZ092ZXJsYXkgLSBUaGUgZXZlbnQgdGhhdCB0cmlnZ2VycyB0aGUgY2xvc2luZyBvZiB0aGUgbG9hZGluZyBvdmVybGF5LlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxUPn0gLSBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3BvbnNlIG9mIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGV4ZWN1dGVSZXF1ZXN0V2l0aExvYWRpbmdPdmVybGF5QW5kRXZlbnQ8VD4ocmVxdWVzdDogT2JzZXJ2YWJsZTxUPiwgZXZlbnRGb3JMb2FkaW5nT3ZlcmxheTogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgdGhpcy5vcGVuTG9hZGluZ092ZXJsYXkoKTtcblxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHJlcXVlc3QpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4gdGhpcy5jbG9zZU92ZXJsYXkoKSksXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb3NlT3ZlcmxheVN1YnNjcmlwdGlvbiA9IGV2ZW50Rm9yTG9hZGluZ092ZXJsYXkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiAoKSA9PiB0aGlzLmNsb3NlT3ZlcmxheSgpLFxuICAgICAgICAgIGVycm9yOiAoKSA9PiB0aGlzLmNsb3NlT3ZlcmxheSgpLFxuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB0aGlzLmNsb3NlT3ZlcmxheSgpLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSB0aGUgZXZlbnQgd2hlbiB0aGUgcmVxdWVzdCBpcyBmaW5hbGl6ZWQuXG4gICAgICAgIGNsb3NlT3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlT3ZlcmxheSgpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGxvYWRpbmcgb3ZlcmxheSBhbmQgaW5jcmVhc2VzIHRoZSBjb3VudGVyLlxuICAgKiBUaGUgb3ZlcmxheSB3aWxsIG9ubHkgYmUgY3JlYXRlZCBvbiB0aGUgZmlyc3QgY2FsbC5cbiAgICovXG4gIHByaXZhdGUgb3BlbkxvYWRpbmdPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLmNlbnRlckhvcml6b250YWxseSgpLmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgICBjb25zdCBzcGlubmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNYXRQcm9ncmVzc1NwaW5uZXIpO1xuICAgIGNvbnN0IHNwaW5uZXJSZWY6IENvbXBvbmVudFJlZjxNYXRQcm9ncmVzc1NwaW5uZXI+ID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaChzcGlubmVyUG9ydGFsKTtcblxuICAgIHNwaW5uZXJSZWYuaW5zdGFuY2UuZGlhbWV0ZXIgPSA0MDtcbiAgICBzcGlubmVyUmVmLmluc3RhbmNlLmNvbG9yID0gJ3ByaW1hcnknO1xuICAgIHNwaW5uZXJSZWYuaW5zdGFuY2UubW9kZSA9ICdpbmRldGVybWluYXRlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG92ZXJsYXkgd2hlbiB0aGUgY291bnRlciByZWFjaGVzIHplcm8uXG4gICAqIERlY3JlYXNlcyB0aGUgY291bnRlciBhbmQgb25seSBjbG9zZXMgdGhlIG92ZXJsYXkgd2hlbiBubyBtb3JlIG9wZW4gY2FsbHMgYXJlIHBlbmRpbmcuXG4gICAqL1xuICBwcml2YXRlIGNsb3NlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBjb250YWN0IElEIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnRhY3QgSUQgaWYgaXQgZXhpc3RzIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgdG8gdGhlIGNvbnNvbGUgaWYgdGhlIGNvbnRhY3QgSUQgaXMgbm90IGZvdW5kIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbnRhY3RJZCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbnRhY3RJZCA9IHRoaXMuc3RvcmFnZS5nZXQoQXV0aG9yaXphdGlvbkNvbnN0YW50LmNvbnRhY3RJZCk7XG4gICAgaWYgKCFjb250YWN0SWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFjdCBJRCBub3QgZm91bmQgaW4gbG9jYWwgc3RvcmFnZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhY3RJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBpbiB0aGUgdmlldyBjb250ZXh0LlxuICAgKiBAcGFyYW0gaXRlbSAtIFRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICBhYnN0cmFjdCBzZXRBY3RpdmVJdGVtKGl0ZW06IFZpZXdEYXRhVHlwZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgYWN0aXZlIGl0ZW0gZnJvbSB0aGUgdmlldyBjb250ZXh0LlxuICAgKiBAcGFyYW0gZmlsdGVyIC0gT3B0aW9uYWwgZmlsdGVyIHRvIGFwcGx5IHdoZW4gcmV0cmlldmluZyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAqIEByZXR1cm5zIFRoZSBhY3RpdmUgaXRlbSB0aGF0IG1hdGNoZXMgdGhlIGZpbHRlciwgaWYgcHJvdmlkZWQuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRBY3RpdmVJdGVtKGZpbHRlcj86IFZpZXdEYXRhVHlwZSk6IFZpZXdEYXRhVHlwZTtcblxuICAvKipcbiAgICogUmV0cmlldmVzIHZpZXcgZGF0YSBmcm9tIHRoZSB2aWV3IGNvbnRleHQuXG4gICAqIEBwYXJhbSBmaWx0ZXIgLSBPcHRpb25hbCBmaWx0ZXIgdG8gYXBwbHkgd2hlbiByZXRyaWV2aW5nIHRoZSB2aWV3IGRhdGEuXG4gICAqIEByZXR1cm5zIFRoZSB2aWV3IGRhdGEgdGhhdCBtYXRjaGVzIHRoZSBmaWx0ZXIsIGlmIHByb3ZpZGVkLCBvciBhbiBhcnJheSBvZiB2aWV3IGRhdGEuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRWaWV3RGF0YShmaWx0ZXI/OiBWaWV3RGF0YVR5cGUpOiBWaWV3RGF0YVR5cGUgfCBWaWV3RGF0YVR5cGVbXTtcbn1cbiJdfQ==