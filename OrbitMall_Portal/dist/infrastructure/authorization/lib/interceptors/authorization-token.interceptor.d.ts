import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AuthorizationTokenInterceptor implements HttpInterceptor {
    private readonly _storage;
    private readonly _vrtoQueryHandler;
    private readonly _router;
    private isRefreshing;
    private refreshTokenSubject;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    /**
     * Checks if the HTTP response status indicates an unauthorized request.
     *
     * @param response - The HTTP error response to check.
     * @returns `true` if the response status is 401 Unauthorized, otherwise `false`.
     */
    private _isUnauthorized;
    /**
     * Determines whether the HTTP request should be intercepted.
     *
     * @param req - The HTTP request to check.
     * @returns `true` if the request should be intercepted, `false` otherwise.
     */
    private _shouldIntercept;
    /**
     * Adds the Authorization header with the provided token to the given HTTP request.
     *
     * @param req - The original HTTP request.
     * @param token - The token to be added in the Authorization header.
     * @returns A cloned HTTP request with the Authorization header set.
     */
    private _addTokenHeader;
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
    private _handleUnauthorized;
    /**
     * Redirects the user to the sign-in page.
     *
     * @private
     * @returns An observable that throws an error.
     */
    private _redirectToSignIn;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthorizationTokenInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthorizationTokenInterceptor>;
}
