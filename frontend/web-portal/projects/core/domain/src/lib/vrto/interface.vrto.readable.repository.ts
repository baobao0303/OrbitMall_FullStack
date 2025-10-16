import { VRTOErrorResponse, VRTORequest, VRTOResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IVRTOReadableRepository extends IReadableRepository {
  getVATO(request: VRTORequest): Observable<VRTOResponse | VRTOErrorResponse>;
}
