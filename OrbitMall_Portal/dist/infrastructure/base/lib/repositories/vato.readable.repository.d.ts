import { VerifyValidVATORequest, VerifyValidVATOResponse } from '@application/messages';
import { IVATOReadableRepository } from '@core/domain';
import { Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import * as i0 from "@angular/core";
export declare class VATOReadableRepository extends ReadableRepository implements IVATOReadableRepository {
    /**
     * Verifies the VATO (Access Token) by sending a request to the specified endpoint.
     *
     * @param {VerifyValidVATORequest} request - The request object containing the necessary parameters for verification.
     * @returns {Observable<VerifyValidVATOResponse>} - An observable that emits the response of the verification process.
     *
     */
    verifyVATO(request: VerifyValidVATORequest): Observable<VerifyValidVATOResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VATOReadableRepository, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VATOReadableRepository>;
}
