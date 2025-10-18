import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { AuthorizationConstant } from '../authorization.constant';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly storage = inject(BROWSER_STORAGE);

  canActivate(): boolean {
    const isRemember =
      this.storage.get(AuthorizationConstant.isRemember) === 'true';
    const fromSession = (k: string) => {
      const v = sessionStorage.getItem(k);
      return v ? JSON.parse(v) : null;
    };

    const vato = isRemember
      ? this.storage.get(AuthorizationConstant.vato)
      : fromSession(AuthorizationConstant.vato);
    const vrto = isRemember
      ? this.storage.get(AuthorizationConstant.vrto)
      : fromSession(AuthorizationConstant.vrto);

    if (vato && vrto) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}



