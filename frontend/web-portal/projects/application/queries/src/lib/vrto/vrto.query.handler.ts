import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { VRTOErrorResponse, VRTORequest, VRTOResponse } from '@application/messages';
import { VRTOReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VRTOQueryHandler implements RequestHandler<VRTORequest, VRTOResponse | VRTOErrorResponse> {
  private readonly _vrtoReadableRepository = inject(VRTOReadableRepository);

  /**
   * Handles the VRTO request and returns an observable of either a VRTOResponse or a VRTOErrorResponse.
   *
   * @param {VRTORequest} request - The VRTO request object.
   * @returns {Observable<VRTOResponse | VRTOErrorResponse>} An observable containing either a VRTOResponse or a VRTOErrorResponse.
   */
  public handle(request: VRTORequest): Observable<VRTOResponse | VRTOErrorResponse> {
    const result = this._vrtoReadableRepository.getVATO(request);

    return result;
  }
}
