import { RequestHandler } from '@application/base';
import { VerifyValidVATORequest, VerifyValidVATOResponse } from '@application/messages';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class VerifyValidVATOQueryHandler implements RequestHandler<VerifyValidVATORequest, VerifyValidVATOResponse> {
    private readonly _vatoReadableRepository;
    /**
     * Handles the verification of a VATO request.
     *
     * @param {VerifyValidVATORequest} request - The request object containing the details needed for verification.
     * @returns {Observable<VerifyValidVATOResponse>} An observable that emits the verification response.
     */
    handle(request: VerifyValidVATORequest): Observable<VerifyValidVATOResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VerifyValidVATOQueryHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VerifyValidVATOQueryHandler>;
}
