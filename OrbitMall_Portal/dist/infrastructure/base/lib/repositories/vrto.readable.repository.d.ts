import { VRTOErrorResponse, VRTORequest, VRTOResponse } from '@application/messages';
import { IVRTOReadableRepository } from '@core/domain';
import { Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import * as i0 from "@angular/core";
export declare class VRTOReadableRepository extends ReadableRepository implements IVRTOReadableRepository {
    /**
     * Retrieves a vato by making an HTTP request to refresh the access token.
     *
     * @param {VRTORequest} request - The request object containing the vrto
     * @returns {Observable<VRTOResponse | VRTOErrorResponse>} An observable that emits either a VRTOResponse or a VRTOErrorResponse.
     */
    getVATO(request: VRTORequest): Observable<VRTOResponse | VRTOErrorResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VRTOReadableRepository, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VRTOReadableRepository>;
}
