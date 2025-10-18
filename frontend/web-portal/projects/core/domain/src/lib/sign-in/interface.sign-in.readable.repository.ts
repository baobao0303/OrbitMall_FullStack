import { SignInRequest, SignInResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface ISignInReadableRepository extends IReadableRepository {
  signIn(request: SignInRequest): Observable<SignInResponse>;
}
