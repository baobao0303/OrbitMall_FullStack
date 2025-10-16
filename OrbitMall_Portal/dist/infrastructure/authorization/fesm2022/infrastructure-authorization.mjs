import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VRTORequest, VRTOResponse, VerifyValidVATORequest } from '@application/messages';
import { VerifyValidVATOQueryHandler, VRTOQueryHandler } from '@application/queries';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { lastValueFrom, BehaviorSubject, catchError, throwError, switchMap, finalize, filter, take } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

/**
 * A centralized class for storing all authorization-related storage keys.
 * Used to access localStorage or sessionStorage values consistently throughout the application.
 */
class AuthorizationConstant {
    /**
     * VATO token used for authorizing API calls.
     * Typically a short-lived access token.
     */
    static { this.vato = 'vato'; }
    /**
     * VRTO token used for refreshing the VATO token when it expires.
     * Typically a long-lived refresh token.
     */
    static { this.vrto = 'vrto'; }
    /**
     * Contact ID (usually mapped to the current user's profile or business contact).
     */
    static { this.contactId = 'pid'; }
    /**
     * User ID representing the authenticated user in the system.
     */
    static { this.userId = 'uid'; }
    /**
     * Flag indicating whether the user chose "Remember Me" on login.
     * Determines if token refresh should occur automatically.
     */
    static { this.isRemember = 'is-remember'; }
}

class AuthorizationGuard {
    constructor() {
        this.router = inject(Router);
        this.storage = inject(BROWSER_STORAGE);
        this.verifyValidVATOHandler = inject(VerifyValidVATOQueryHandler);
        this.vrtoHandler = inject(VRTOQueryHandler);
    }
    /**
     * Redirects the user to the sign-in page.
     *
     * @private
     */
    redirectToSignIn() {
        this.router.navigateByUrl('/sign-in');
        return false;
    }
    /**
     * Validates the existing VATO token and refreshes it if necessary.
     *
     * @private
     * @param vrto The VRTO (refresh token) used to generate a new VATO token.
     * @returns Promise<boolean> Whether the token was refreshed successfully.
     */
    async validateAndRefreshToken(vrto) {
        let isRemember = this.storage.get(AuthorizationConstant.isRemember) === 'true';
        if (!isRemember) {
            // Remove authentication-related data to prevent auto-login
            this.storage.remove(AuthorizationConstant.contactId);
            this.storage.remove(AuthorizationConstant.vato);
            this.storage.remove(AuthorizationConstant.vrto);
            this.storage.remove(AuthorizationConstant.userId);
            this.storage.remove(AuthorizationConstant.isRemember);
            return false;
        }
        else {
            const request = new VRTORequest();
            request.vrto = vrto;
            try {
                const tokenResponse = await lastValueFrom(this.vrtoHandler.handle(request));
                if (tokenResponse instanceof VRTOResponse) {
                    this.storage.set(AuthorizationConstant.vrto, tokenResponse.vrto);
                    this.storage.set(AuthorizationConstant.vato, tokenResponse.vato);
                    return true;
                }
                else {
                    console.error(AuthorizationGuard.name, 'Error refreshing token', tokenResponse);
                }
            }
            catch (error) {
                console.error(AuthorizationGuard.name, 'Error during token refresh', error);
            }
        }
        return false;
    }
    /**
     * Checks whether the user is authorized to access a route.
     *
     * @param route The route being accessed.
     * @param state The current router state.
     * @returns Promise<boolean> Whether the route can be activated.
     */
    async canActivate(route, state) {
        const vato = this.storage.get(AuthorizationConstant.vato);
        const vrto = this.storage.get(AuthorizationConstant.vrto);
        if (!vrto || !vato) {
            return this.redirectToSignIn();
        }
        try {
            const isValidVATO = await lastValueFrom(this.verifyValidVATOHandler.handle(new VerifyValidVATORequest()));
            // If the token is still valid, there is no need to call the refresh API.
            if (isValidVATO.isValid) {
                return true;
            }
            else {
                const refreshed = await this.validateAndRefreshToken(vrto);
                if (refreshed) {
                    return true;
                }
            }
        }
        catch (error) {
            console.error(AuthorizationGuard.name, 'Error validating VATO token', error);
        }
        return this.redirectToSignIn();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationGuard, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationGuard, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthorizationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class AuthorizationTokenInterceptor {
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

/*
 * Public API Surface of authorization
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthorizationConstant, AuthorizationGuard, AuthorizationTokenInterceptor };
//# sourceMappingURL=infrastructure-authorization.mjs.map
