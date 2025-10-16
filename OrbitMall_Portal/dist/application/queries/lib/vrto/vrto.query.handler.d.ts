import { RequestHandler } from '@application/base';
import { VRTOErrorResponse, VRTORequest, VRTOResponse } from '@application/messages';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class VRTOQueryHandler implements RequestHandler<VRTORequest, VRTOResponse | VRTOErrorResponse> {
    private readonly _vrtoReadableRepository;
    /**
     * Handles the VRTO request and returns an observable of either a VRTOResponse or a VRTOErrorResponse.
     *
     * @param {VRTORequest} request - The VRTO request object.
     * @returns {Observable<VRTOResponse | VRTOErrorResponse>} An observable containing either a VRTOResponse or a VRTOErrorResponse.
     */
    handle(request: VRTORequest): Observable<VRTOResponse | VRTOErrorResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VRTOQueryHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VRTOQueryHandler>;
}
