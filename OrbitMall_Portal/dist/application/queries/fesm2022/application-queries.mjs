import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { WeatherReadableRepository, VRTOReadableRepository, VATOReadableRepository } from '@infrastructure/base';

class GetAllQueryHandler {
    constructor() {
        this.repository = inject(WeatherReadableRepository);
    }
    handle(request) {
        return this.repository.getAll();
        // this.repository.getAll().subscribe({
        //   next(value) {
        //     console.log(value);
        //   },
        // });
        // return undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GetAllQueryHandler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GetAllQueryHandler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GetAllQueryHandler, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class VRTOQueryHandler {
    constructor() {
        this._vrtoReadableRepository = inject(VRTOReadableRepository);
    }
    /**
     * Handles the VRTO request and returns an observable of either a VRTOResponse or a VRTOErrorResponse.
     *
     * @param {VRTORequest} request - The VRTO request object.
     * @returns {Observable<VRTOResponse | VRTOErrorResponse>} An observable containing either a VRTOResponse or a VRTOErrorResponse.
     */
    handle(request) {
        const result = this._vrtoReadableRepository.getVATO(request);
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VRTOQueryHandler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VRTOQueryHandler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VRTOQueryHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class VerifyValidVATOQueryHandler {
    constructor() {
        this._vatoReadableRepository = inject(VATOReadableRepository);
    }
    /**
     * Handles the verification of a VATO request.
     *
     * @param {VerifyValidVATORequest} request - The request object containing the details needed for verification.
     * @returns {Observable<VerifyValidVATOResponse>} An observable that emits the verification response.
     */
    handle(request) {
        const result = this._vatoReadableRepository.verifyVATO(request);
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VerifyValidVATOQueryHandler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VerifyValidVATOQueryHandler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VerifyValidVATOQueryHandler, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * Public API Surface of queries
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GetAllQueryHandler, VRTOQueryHandler, VerifyValidVATOQueryHandler };
//# sourceMappingURL=application-queries.mjs.map
