import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequest, SignInResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { ISignInReadableRepository } from '@core/domain';
import { catchError, Observable, of, tap } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SignInReadableRepository
  extends ReadableRepository
  implements ISignInReadableRepository
{
  public signIn(request: SignInRequest): Observable<SignInResponse> {
    const endPoint = `${this._context.endPoint}/auth/signin`;

    return this.httpClient
      .post(endPoint, new RequestMapper(SignInRequest).map(request))
      .pipe(
        // Map plain JSON -> instance of SignInResponse so instanceof works
        tap(() => {}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (source$) =>
          new Observable<SignInResponse>((subscriber) =>
            source$.subscribe({
              next: (json: any) => {
                const mapped = new ResponseMapper(SignInResponse).map(json);
                subscriber.next(
                  Object.setPrototypeOf(
                    mapped as any,
                    SignInResponse.prototype
                  ) as SignInResponse
                );
              },
              error: (err: HttpErrorResponse) => {
                const mapper = new ResponseMapper(SignInResponse);
                const mapped = mapper.map(err?.error ?? {});
                subscriber.next(
                  Object.setPrototypeOf(
                    mapped as any,
                    SignInResponse.prototype
                  ) as SignInResponse
                );
              },
              complete: () => subscriber.complete(),
            })
          )
      );
  }
}
