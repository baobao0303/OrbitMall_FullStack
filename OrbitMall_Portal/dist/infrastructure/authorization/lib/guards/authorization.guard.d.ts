import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import * as i0 from "@angular/core";
export declare class AuthorizationGuard implements CanActivate {
    private readonly router;
    private readonly storage;
    private readonly verifyValidVATOHandler;
    private readonly vrtoHandler;
    /**
     * Redirects the user to the sign-in page.
     *
     * @private
     */
    private redirectToSignIn;
    /**
     * Validates the existing VATO token and refreshes it if necessary.
     *
     * @private
     * @param vrto The VRTO (refresh token) used to generate a new VATO token.
     * @returns Promise<boolean> Whether the token was refreshed successfully.
     */
    private validateAndRefreshToken;
    /**
     * Checks whether the user is authorized to access a route.
     *
     * @param route The route being accessed.
     * @param state The current router state.
     * @returns Promise<boolean> Whether the route can be activated.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthorizationGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthorizationGuard>;
}
