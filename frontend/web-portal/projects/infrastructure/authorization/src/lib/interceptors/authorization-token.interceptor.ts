import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VRTORequest, VRTOResponse } from '@application/messages';
import { VRTOQueryHandler } from '@application/queries';
import { BROWSER_STORAGE } from '@infrastructure/base';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
  of,
} from 'rxjs';
import { AuthorizationConstant } from '../authorization.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationTokenInterceptor implements HttpInterceptor {
  private readonly _storage = inject(BROWSER_STORAGE);
  private readonly _vrtoQueryHandler = inject(VRTOQueryHandler);
  private readonly _router = inject(Router);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const vato = this._storage.get(AuthorizationConstant.vato);
    const clonedRequest = vato ? this._addTokenHeader(req, vato) : req;

    return next.handle(clonedRequest).pipe(
      // Persist tokens when sign-in succeeds
      switchMap((event) => {
        if (event instanceof HttpResponse && this._isSignIn(req)) {
          const body: any = event.body ?? {};
          if (body?.vato)
            this._storage.set(AuthorizationConstant.vato, body.vato);
          if (body?.vrto)
            this._storage.set(AuthorizationConstant.vrto, body.vrto);
        }
        return of(event);
      }),
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          this._isUnauthorized(error) &&
          this._shouldIntercept(req)
        ) {
          return this._handleUnauthorized(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Checks if the HTTP response status indicates an unauthorized request.
   *
   * @param response - The HTTP error response to check.
   * @returns `true` if the response status is 401 Unauthorized, otherwise `false`.
   */
  private _isUnauthorized(response: HttpErrorResponse): boolean {
    return response.status === HttpStatusCode.Unauthorized;
  }

  /**
   * Determines whether the HTTP request should be intercepted.
   *
   * @param req - The HTTP request to check.
   * @returns `true` if the request should be intercepted, `false` otherwise.
   */
  private _shouldIntercept(req: HttpRequest<any>): boolean {
    // Bypass auth header/refresh for public auth endpoints
    const bypassList = ['/auth/signin', '/auth/signup', '/auth/refresh'];
    return bypassList.every((path) => !req.url.includes(path));
  }

  private _isSignIn(req: HttpRequest<any>): boolean {
    return req.url.includes('/auth/signin');
  }

  /**
   * Adds the Authorization header with the provided token to the given HTTP request.
   *
   * @param req - The original HTTP request.
   * @param token - The token to be added in the Authorization header.
   * @returns A cloned HTTP request with the Authorization header set.
   */
  private _addTokenHeader(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
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
  private _handleUnauthorized(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const vrto = this._storage.get(AuthorizationConstant.vrto);
      if (!vrto) {
        return this._redirectToSignIn();
      }

      const request = new VRTORequest();
      request.vrto = vrto;
      return this._vrtoQueryHandler.handle(request).pipe(
        switchMap((response) => {
          if (response instanceof VRTOResponse && response.vato) {
            const vato = response.vato;
            this._storage.set(AuthorizationConstant.vato, vato);
            this.refreshTokenSubject.next(vato);
            return next.handle(this._addTokenHeader(req, vato));
          }
          return this._redirectToSignIn();
        }),
        catchError(() => this._redirectToSignIn()),
        finalize(() => (this.isRefreshing = false))
      );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this._addTokenHeader(req, token!)))
    );
  }

  /**
   * Redirects the user to the sign-in page.
   *
   * @private
   * @returns An observable that throws an error.
   */
  private _redirectToSignIn(): Observable<never> {
    this._router.navigateByUrl('/sign-in');
    return throwError(() => null);
  }
}
