import { HttpErrorResponse, HttpStatusCode, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VRTORequest, VRTOResponse } from '@application/messages';
import { VRTOQueryHandler } from '@application/queries';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError, } from 'rxjs';
import { AuthorizationConstant } from '../authorization.constant';
import * as i0 from "@angular/core";
export class AuthorizationTokenInterceptor {
    constructor() {
        this._storage = inject(BROWSER_STORAGE);
        this._vrtoQueryHandler = inject(VRTOQueryHandler);
        this._router = inject(Router);
        this.isRefreshing = false;
        this.refreshTokenSubject = new BehaviorSubject(null);
    }
    intercept(req, next) {
        const vato = this._storage.get(AuthorizationConstant.vato);
        const clonedRequest = vato ? this._addTokenHeader(req, vato) : req;
        return next.handle(clonedRequest).pipe(catchError((error) => {
            if (error instanceof HttpErrorResponse &&
                this._isUnauthorized(error) &&
                this._shouldIntercept(req)) {
                return this._handleUnauthorized(req, next);
            }
            return throwError(() => error);
        }));
    }
    /**
     * Checks if the HTTP response status indicates an unauthorized request.
     *
     * @param response - The HTTP error response to check.
     * @returns `true` if the response status is 401 Unauthorized, otherwise `false`.
     */
    _isUnauthorized(response) {
        return response.status === HttpStatusCode.Unauthorized;
    }
    /**
     * Determines whether the HTTP request should be intercepted.
     *
     * @param req - The HTTP request to check.
     * @returns `true` if the request should be intercepted, `false` otherwise.
     */
    _shouldIntercept(req) {
        const blacklist = ['/User/sign-in', '/ORBITMAIL_PORTALToken/verify-access-token'];
        return blacklist.every((path) => !req.url.includes(path));
    }
    /**
     * Adds the Authorization header with the provided token to the given HTTP request.
     *
     * @param req - The original HTTP request.
     * @param token - The token to be added in the Authorization header.
     * @returns A cloned HTTP request with the Authorization header set.
     */
    _addTokenHeader(req, token) {
        return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    /**
     * Handles unauthorized HTTP requests by attempting to refresh the authentication token.
     * If the token is successfully refreshed, the original request is retried with the new token.
     * If the token cannot be refreshed, the user is redirected to the sign-in page.
     *
     * @private
     * @param {HttpRequest<any>} req - The original HTTP request.
     * @param {HttpHandler} next - The next interceptor in the chain.
     * @returns {Observable<HttpEvent<any>>} An observable that emits the HTTP event.
     */
    _handleUnauthorized(req, next) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const vrto = this._storage.get(AuthorizationConstant.vrto);
            if (!vrto) {
                return this._redirectToSignIn();
            }
            const request = new VRTORequest();
            request.vrto = vrto;
            return this._vrtoQueryHandler.handle(request).pipe(switchMap((response) => {
                if (response instanceof VRTOResponse && response.vato) {
                    const vato = response.vato;
                    this._storage.set(AuthorizationConstant.vato, vato);
                    this.refreshTokenSubject.next(vato);
                    return next.handle(this._addTokenHeader(req, vato));
                }
                return this._redirectToSignIn();
            }), catchError(() => this._redirectToSignIn()), finalize(() => (this.isRefreshing = false)));
        }
        return this.refreshTokenSubject.pipe(filter((token) => token !== null), take(1), switchMap((token) => next.handle(this._addTokenHeader(req, token))));
    }
    /**
     * Redirects the user to the sign-in page.
     *
     * @private
     * @returns An observable that throws an error.
     */
    _redirectToSignIn() {
        this._router.navigateByUrl('/sign-in');
        return throwError(() => null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationTokenInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationTokenInterceptor, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationTokenInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi10b2tlbi5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2luZnJhc3RydWN0dXJlL2F1dGhvcml6YXRpb24vc3JjL2xpYi9pbnRlcmNlcHRvcnMvYXV0aG9yaXphdGlvbi10b2tlbi5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBS2pCLGNBQWMsR0FDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUVSLFNBQVMsRUFDVCxJQUFJLEVBQ0osVUFBVSxHQUNYLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBS2xFLE1BQU0sT0FBTyw2QkFBNkI7SUFIMUM7UUFJbUIsYUFBUSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuQyxzQkFBaUIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztLQW1IeEU7SUFqSEMsU0FBUyxDQUNQLEdBQXFCLEVBQ3JCLElBQWlCO1FBRWpCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVuRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUNwQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUNFLEtBQUssWUFBWSxpQkFBaUI7Z0JBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQzFCLENBQUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFDRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssZUFBZSxDQUFDLFFBQTJCO1FBQ2pELE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsWUFBWSxDQUFDO0lBQ3pELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGdCQUFnQixDQUFDLEdBQXFCO1FBQzVDLE1BQU0sU0FBUyxHQUFHLENBQUMsZUFBZSxFQUFFLDRDQUE0QyxDQUFDLENBQUM7UUFDbEYsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLGVBQWUsQ0FDckIsR0FBcUIsRUFDckIsS0FBYTtRQUViLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsRUFBRSxVQUFVLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSyxtQkFBbUIsQ0FDekIsR0FBcUIsRUFDckIsSUFBaUI7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDVixPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2xDLENBQUM7WUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hELFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNyQixJQUFJLFFBQVEsWUFBWSxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN0RCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQzFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FDNUMsQ0FBQztRQUNKLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQ2xDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQU0sQ0FBQyxDQUFDLENBQUMsQ0FDckUsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOytHQXZIVSw2QkFBNkI7bUhBQTdCLDZCQUE2QixjQUY1QixNQUFNOzs0RkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBTdGF0dXNDb2RlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBWUlRPUmVxdWVzdCwgVlJUT1Jlc3BvbnNlIH0gZnJvbSAnQGFwcGxpY2F0aW9uL21lc3NhZ2VzJztcbmltcG9ydCB7IFZSVE9RdWVyeUhhbmRsZXIgfSBmcm9tICdAYXBwbGljYXRpb24vcXVlcmllcyc7XG5pbXBvcnQgeyBCUk9XU0VSX1NUT1JBR0UgfSBmcm9tICdAaW5mcmFzdHJ1Y3R1cmUvYmFzZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGNhdGNoRXJyb3IsXG4gIGZpbHRlcixcbiAgZmluYWxpemUsXG4gIE9ic2VydmFibGUsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGhyb3dFcnJvcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uQ29uc3RhbnQgfSBmcm9tICcuLi9hdXRob3JpemF0aW9uLmNvbnN0YW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25Ub2tlbkludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfc3RvcmFnZSA9IGluamVjdChCUk9XU0VSX1NUT1JBR0UpO1xuICBwcml2YXRlIHJlYWRvbmx5IF92cnRvUXVlcnlIYW5kbGVyID0gaW5qZWN0KFZSVE9RdWVyeUhhbmRsZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9yb3V0ZXIgPSBpbmplY3QoUm91dGVyKTtcbiAgcHJpdmF0ZSBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWZyZXNoVG9rZW5TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBpbnRlcmNlcHQoXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCB2YXRvID0gdGhpcy5fc3RvcmFnZS5nZXQoQXV0aG9yaXphdGlvbkNvbnN0YW50LnZhdG8pO1xuICAgIGNvbnN0IGNsb25lZFJlcXVlc3QgPSB2YXRvID8gdGhpcy5fYWRkVG9rZW5IZWFkZXIocmVxLCB2YXRvKSA6IHJlcTtcblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShjbG9uZWRSZXF1ZXN0KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgJiZcbiAgICAgICAgICB0aGlzLl9pc1VuYXV0aG9yaXplZChlcnJvcikgJiZcbiAgICAgICAgICB0aGlzLl9zaG91bGRJbnRlcmNlcHQocmVxKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlVW5hdXRob3JpemVkKHJlcSwgbmV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gZXJyb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgSFRUUCByZXNwb25zZSBzdGF0dXMgaW5kaWNhdGVzIGFuIHVuYXV0aG9yaXplZCByZXF1ZXN0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVzcG9uc2UgLSBUaGUgSFRUUCBlcnJvciByZXNwb25zZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSByZXNwb25zZSBzdGF0dXMgaXMgNDAxIFVuYXV0aG9yaXplZCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAqL1xuICBwcml2YXRlIF9pc1VuYXV0aG9yaXplZChyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09PSBIdHRwU3RhdHVzQ29kZS5VbmF1dGhvcml6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBIVFRQIHJlcXVlc3Qgc2hvdWxkIGJlIGludGVyY2VwdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gcmVxIC0gVGhlIEhUVFAgcmVxdWVzdCB0byBjaGVjay5cbiAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBpbnRlcmNlcHRlZCwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRJbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgY29uc3QgYmxhY2tsaXN0ID0gWycvVXNlci9zaWduLWluJywgJy9PUkJJVE1BSUxfUE9SVEFMVG9rZW4vdmVyaWZ5LWFjY2Vzcy10b2tlbiddO1xuICAgIHJldHVybiBibGFja2xpc3QuZXZlcnkoKHBhdGgpID0+ICFyZXEudXJsLmluY2x1ZGVzKHBhdGgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBBdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIHRoZSBwcm92aWRlZCB0b2tlbiB0byB0aGUgZ2l2ZW4gSFRUUCByZXF1ZXN0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVxIC0gVGhlIG9yaWdpbmFsIEhUVFAgcmVxdWVzdC5cbiAgICogQHBhcmFtIHRva2VuIC0gVGhlIHRva2VuIHRvIGJlIGFkZGVkIGluIHRoZSBBdXRob3JpemF0aW9uIGhlYWRlci5cbiAgICogQHJldHVybnMgQSBjbG9uZWQgSFRUUCByZXF1ZXN0IHdpdGggdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyIHNldC5cbiAgICovXG4gIHByaXZhdGUgX2FkZFRva2VuSGVhZGVyKFxuICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PixcbiAgICB0b2tlbjogc3RyaW5nXG4gICk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIHJldHVybiByZXEuY2xvbmUoeyBzZXRIZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB1bmF1dGhvcml6ZWQgSFRUUCByZXF1ZXN0cyBieSBhdHRlbXB0aW5nIHRvIHJlZnJlc2ggdGhlIGF1dGhlbnRpY2F0aW9uIHRva2VuLlxuICAgKiBJZiB0aGUgdG9rZW4gaXMgc3VjY2Vzc2Z1bGx5IHJlZnJlc2hlZCwgdGhlIG9yaWdpbmFsIHJlcXVlc3QgaXMgcmV0cmllZCB3aXRoIHRoZSBuZXcgdG9rZW4uXG4gICAqIElmIHRoZSB0b2tlbiBjYW5ub3QgYmUgcmVmcmVzaGVkLCB0aGUgdXNlciBpcyByZWRpcmVjdGVkIHRvIHRoZSBzaWduLWluIHBhZ2UuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SHR0cFJlcXVlc3Q8YW55Pn0gcmVxIC0gVGhlIG9yaWdpbmFsIEhUVFAgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtIdHRwSGFuZGxlcn0gbmV4dCAtIFRoZSBuZXh0IGludGVyY2VwdG9yIGluIHRoZSBjaGFpbi5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+fSBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIEhUVFAgZXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9oYW5kbGVVbmF1dGhvcml6ZWQoXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAoIXRoaXMuaXNSZWZyZXNoaW5nKSB7XG4gICAgICB0aGlzLmlzUmVmcmVzaGluZyA9IHRydWU7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlblN1YmplY3QubmV4dChudWxsKTtcblxuICAgICAgY29uc3QgdnJ0byA9IHRoaXMuX3N0b3JhZ2UuZ2V0KEF1dGhvcml6YXRpb25Db25zdGFudC52cnRvKTtcbiAgICAgIGlmICghdnJ0bykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkaXJlY3RUb1NpZ25JbigpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFZSVE9SZXF1ZXN0KCk7XG4gICAgICByZXF1ZXN0LnZydG8gPSB2cnRvO1xuICAgICAgcmV0dXJuIHRoaXMuX3ZydG9RdWVyeUhhbmRsZXIuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBWUlRPUmVzcG9uc2UgJiYgcmVzcG9uc2UudmF0bykge1xuICAgICAgICAgICAgY29uc3QgdmF0byA9IHJlc3BvbnNlLnZhdG87XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLnNldChBdXRob3JpemF0aW9uQ29uc3RhbnQudmF0bywgdmF0byk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUb2tlblN1YmplY3QubmV4dCh2YXRvKTtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLl9hZGRUb2tlbkhlYWRlcihyZXEsIHZhdG8pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0VG9TaWduSW4oKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gdGhpcy5fcmVkaXJlY3RUb1NpZ25JbigpKSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4gKHRoaXMuaXNSZWZyZXNoaW5nID0gZmFsc2UpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW5TdWJqZWN0LnBpcGUoXG4gICAgICBmaWx0ZXIoKHRva2VuKSA9PiB0b2tlbiAhPT0gbnVsbCksXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKCh0b2tlbikgPT4gbmV4dC5oYW5kbGUodGhpcy5fYWRkVG9rZW5IZWFkZXIocmVxLCB0b2tlbiEpKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZGlyZWN0cyB0aGUgdXNlciB0byB0aGUgc2lnbi1pbiBwYWdlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyBBbiBvYnNlcnZhYmxlIHRoYXQgdGhyb3dzIGFuIGVycm9yLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVkaXJlY3RUb1NpZ25JbigpOiBPYnNlcnZhYmxlPG5ldmVyPiB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlQnlVcmwoJy9zaWduLWluJyk7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbnVsbCk7XG4gIH1cbn1cbiJdfQ==