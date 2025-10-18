import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';
import { SignInRequest, SignInResponse } from '@application/messages';
import { SignInQueryHandler } from '@application/queries';
import { AuthorizationConstant } from '@infrastructure/authorization';
import { ViewContext } from '@view/base';
import { lastValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SignInContext extends ViewContext {
  private readonly router = inject(Router);
  // Signal
  public _email = signal<string | null>(null);
  public email = computed(() => this._email());
  private _isRemember = signal<boolean>(false);
  public isRemember = computed(() => this._isRemember());

  private _errorMessage = signal<string | null>(null);
  public errorMessage = computed(() => this._errorMessage());

  public setErrorMessage(message: string): void {
    this._errorMessage.set(message);
  }

  // handler
  private _signInRequest: SignInRequest = new SignInRequest();
  private readonly signInQueryHandler = inject(SignInQueryHandler);

  // FUNCTION
  public submitSignIn({
    email,
    password,
    isRemember,
  }: {
    email: string;
    password: string;
    isRemember: boolean;
  }): void {
    // TODO: call API to submit sign-in
    // TODO: Change to HTTP Interceptor Loading Overlay
    this.setActiveItem({
      email,
      password,
    });
    const eventForLoadingOverlay$ = this.router.events.pipe(
      filter(
        (event) =>
          event instanceof RouteConfigLoadEnd || event instanceof NavigationEnd
      )
    );
    lastValueFrom(
      this.executeRequestWithLoadingOverlayAndEvent(
        this.signInQueryHandler.handle(this._signInRequest),
        eventForLoadingOverlay$
      )
    )
      .then((response) => {
        if (response instanceof SignInResponse) {
          console.log('hello');
          this.router.navigateByUrl('/');
        }
      })
      .catch((error) => this._errorMessage.set(error.detail));
  }

  // Need có
  setActiveItem(item: SignInRequest): void {
    this._signInRequest = item;
  }

  getActiveItem(filter?: any) {}
  getViewData(filter?: any) {
    return {
      email: this.email(),
      isRemember: this.isRemember(),
    };
  }
}
