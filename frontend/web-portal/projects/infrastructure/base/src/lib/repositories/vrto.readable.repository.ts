import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  VRTOErrorResponse,
  VRTORequest,
  VRTOResponse,
} from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IVRTOReadableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class VRTOReadableRepository
  extends ReadableRepository
  implements IVRTOReadableRepository
{
  /**
   * Retrieves a vato by making an HTTP request to refresh the access token.
   *
   * @param {VRTORequest} request - The request object containing the vrto
   * @returns {Observable<VRTOResponse | VRTOErrorResponse>} An observable that emits either a VRTOResponse or a VRTOErrorResponse.
   */
  public getVATO(
    request: VRTORequest
  ): Observable<VRTOResponse | VRTOErrorResponse> {
    const endpoint = `${this._context.endPoint}/auth/renew-access-token`;
    const requestMapper = new RequestMapper(VRTORequest).map(request);
    return this.findInAll(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response) => new ResponseMapper(VRTOResponse).map(response)),
      catchError((error: HttpErrorResponse) =>
        of(new ResponseMapper(VRTOErrorResponse).map(error.error))
      )
    );
  }
}
