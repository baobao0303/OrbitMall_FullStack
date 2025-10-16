import { inject, Injectable } from '@angular/core';
import { VRTOReadableRepository } from '@infrastructure/base';
import * as i0 from "@angular/core";
export class VRTOQueryHandler {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnJ0by5xdWVyeS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXBwbGljYXRpb24vcXVlcmllcy9zcmMvbGliL3ZydG8vdnJ0by5xdWVyeS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQU05RCxNQUFNLE9BQU8sZ0JBQWdCO0lBSDdCO1FBSW1CLDRCQUF1QixHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0tBYTNFO0lBWEM7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBb0I7UUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3RCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOytHQWJVLGdCQUFnQjttSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7NEZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tICdAYXBwbGljYXRpb24vYmFzZSc7XG5pbXBvcnQgeyBWUlRPRXJyb3JSZXNwb25zZSwgVlJUT1JlcXVlc3QsIFZSVE9SZXNwb25zZSB9IGZyb20gJ0BhcHBsaWNhdGlvbi9tZXNzYWdlcyc7XG5pbXBvcnQgeyBWUlRPUmVhZGFibGVSZXBvc2l0b3J5IH0gZnJvbSAnQGluZnJhc3RydWN0dXJlL2Jhc2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVlJUT1F1ZXJ5SGFuZGxlciBpbXBsZW1lbnRzIFJlcXVlc3RIYW5kbGVyPFZSVE9SZXF1ZXN0LCBWUlRPUmVzcG9uc2UgfCBWUlRPRXJyb3JSZXNwb25zZT4ge1xuICBwcml2YXRlIHJlYWRvbmx5IF92cnRvUmVhZGFibGVSZXBvc2l0b3J5ID0gaW5qZWN0KFZSVE9SZWFkYWJsZVJlcG9zaXRvcnkpO1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBWUlRPIHJlcXVlc3QgYW5kIHJldHVybnMgYW4gb2JzZXJ2YWJsZSBvZiBlaXRoZXIgYSBWUlRPUmVzcG9uc2Ugb3IgYSBWUlRPRXJyb3JSZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtWUlRPUmVxdWVzdH0gcmVxdWVzdCAtIFRoZSBWUlRPIHJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxWUlRPUmVzcG9uc2UgfCBWUlRPRXJyb3JSZXNwb25zZT59IEFuIG9ic2VydmFibGUgY29udGFpbmluZyBlaXRoZXIgYSBWUlRPUmVzcG9uc2Ugb3IgYSBWUlRPRXJyb3JSZXNwb25zZS5cbiAgICovXG4gIHB1YmxpYyBoYW5kbGUocmVxdWVzdDogVlJUT1JlcXVlc3QpOiBPYnNlcnZhYmxlPFZSVE9SZXNwb25zZSB8IFZSVE9FcnJvclJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fdnJ0b1JlYWRhYmxlUmVwb3NpdG9yeS5nZXRWQVRPKHJlcXVlc3QpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19