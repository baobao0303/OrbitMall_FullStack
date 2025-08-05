import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { VerifyValidVATORequest, VerifyValidVATOResponse } from '@application/messages';
import { VATOReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VerifyValidVATOQueryHandler implements RequestHandler<VerifyValidVATORequest, VerifyValidVATOResponse> {
  private readonly _vatoReadableRepository: VATOReadableRepository = inject(VATOReadableRepository);

  /**
   * Handles the verification of a VATO request.
   *
   * @param {VerifyValidVATORequest} request - The request object containing the details needed for verification.
   * @returns {Observable<VerifyValidVATOResponse>} An observable that emits the verification response.
   */
  public handle(request: VerifyValidVATORequest): Observable<VerifyValidVATOResponse> {
    const result = this._vatoReadableRepository.verifyVATO(request);

    return result;
  }
}
