import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  VerifyValidVATORequest,
  VRTORequest,
  VRTOResponse,
} from '@application/messages';
import {
  VerifyValidVATOQueryHandler,
  VRTOQueryHandler,
} from '@application/queries';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { lastValueFrom } from 'rxjs';
import { AuthorizationConstant } from '../authorization.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly storage = inject(BROWSER_STORAGE);
  private readonly verifyValidVATOHandler = inject(VerifyValidVATOQueryHandler);
  private readonly vrtoHandler = inject(VRTOQueryHandler);

  /**
   * Redirects the user to the sign-in page.
   *
   * @private
   */
  private redirectToSignIn(): boolean {
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
  private async validateAndRefreshToken(vrto: string): Promise<boolean> {
    let isRemember =
      this.storage.get(AuthorizationConstant.isRemember) === 'true';
    if (!isRemember) {
      // Remove authentication-related data to prevent auto-login
      this.storage.remove(AuthorizationConstant.contactId);
      this.storage.remove(AuthorizationConstant.vato);
      this.storage.remove(AuthorizationConstant.vrto);
      this.storage.remove(AuthorizationConstant.userId);
      this.storage.remove(AuthorizationConstant.isRemember);
      return false;
    } else {
      const request = new VRTORequest();
      request.vrto = vrto;

      try {
        const tokenResponse = await lastValueFrom(
          this.vrtoHandler.handle(request)
        );
        if (tokenResponse instanceof VRTOResponse) {
          this.storage.set(AuthorizationConstant.vrto, tokenResponse.vrto);
          this.storage.set(AuthorizationConstant.vato, tokenResponse.vato);
          return true;
        } else {
          console.error(
            AuthorizationGuard.name,
            'Error refreshing token',
            tokenResponse
          );
        }
      } catch (error) {
        console.error(
          AuthorizationGuard.name,
          'Error during token refresh',
          error
        );
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
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const vato = this.storage.get(AuthorizationConstant.vato);
    const vrto = this.storage.get(AuthorizationConstant.vrto);
    if (!vrto || !vato) {
      return this.redirectToSignIn();
    }

    try {
      const isValidVATO = await lastValueFrom(
        this.verifyValidVATOHandler.handle(new VerifyValidVATORequest())
      );
      // If the token is still valid, there is no need to call the refresh API.
      if (isValidVATO.isValid) {
        return true;
      } else {
        const refreshed = await this.validateAndRefreshToken(vrto);
        if (refreshed) {
          return true;
        }
      }
    } catch (error) {
      console.error(
        AuthorizationGuard.name,
        'Error validating VATO token',
        error
      );
    }

    return this.redirectToSignIn();
  }
}
