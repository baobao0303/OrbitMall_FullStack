import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { SignInRequest, SignInResponse } from '@application/messages';
import { SignInReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInQueryHandler
  implements RequestHandler<SignInRequest, SignInResponse>
{
  private readonly _signInRepository = inject(SignInReadableRepository);

  public handle(request: SignInRequest): Observable<SignInResponse> {
    const result = this._signInRepository.signIn(request);
    return result;
  }
}
