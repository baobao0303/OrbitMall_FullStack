import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyValidVATORequest, VerifyValidVATOResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { IVATOReadableRepository } from '@core/domain';
import { map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class VATOReadableRepository extends ReadableRepository implements IVATOReadableRepository {
  /**
   * Verifies the VATO (Access Token) by sending a request to the specified endpoint.
   *
   * @param {VerifyValidVATORequest} request - The request object containing the necessary parameters for verification.
   * @returns {Observable<VerifyValidVATOResponse>} - An observable that emits the response of the verification process.
   *
   */
  public verifyVATO(request: VerifyValidVATORequest): Observable<VerifyValidVATOResponse> {
    const endPoint = `${this._context.endPoint}/XFWToken/verify-access-token`;

    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(VerifyValidVATOResponse).map(data)),
    );
  }
}
