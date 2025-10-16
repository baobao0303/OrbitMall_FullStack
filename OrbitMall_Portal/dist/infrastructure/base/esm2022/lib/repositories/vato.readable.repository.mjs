import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyValidVATOResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { map } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import * as i0 from "@angular/core";
export class VATOReadableRepository extends ReadableRepository {
    /**
     * Verifies the VATO (Access Token) by sending a request to the specified endpoint.
     *
     * @param {VerifyValidVATORequest} request - The request object containing the necessary parameters for verification.
     * @returns {Observable<VerifyValidVATOResponse>} - An observable that emits the response of the verification process.
     *
     */
    verifyVATO(request) {
        const endPoint = `${this._context.endPoint}/XFWToken/verify-access-token`;
        return this.findAll(endPoint).pipe(takeUntilDestroyed(this.destroyRef), map((data) => new ResponseMapper(VerifyValidVATOResponse).map(data)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VATOReadableRepository, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VATOReadableRepository, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VATOReadableRepository, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmF0by5yZWFkYWJsZS5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW5mcmFzdHJ1Y3R1cmUvYmFzZS9zcmMvbGliL3JlcG9zaXRvcmllcy92YXRvLnJlYWRhYmxlLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQTBCLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1QyxPQUFPLEVBQUUsR0FBRyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQUc1RCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsa0JBQWtCO0lBQzVEOzs7Ozs7T0FNRztJQUNJLFVBQVUsQ0FBQyxPQUErQjtRQUMvQyxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSwrQkFBK0IsQ0FBQztRQUUxRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNoQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDMUUsQ0FBQztJQUNKLENBQUM7K0dBZlUsc0JBQXNCO21IQUF0QixzQkFBc0IsY0FEVCxNQUFNOzs0RkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IFZlcmlmeVZhbGlkVkFUT1JlcXVlc3QsIFZlcmlmeVZhbGlkVkFUT1Jlc3BvbnNlIH0gZnJvbSAnQGFwcGxpY2F0aW9uL21lc3NhZ2VzJztcbmltcG9ydCB7IFJlc3BvbnNlTWFwcGVyIH0gZnJvbSAnQGNvcmUvYmFzZSc7XG5pbXBvcnQgeyBJVkFUT1JlYWRhYmxlUmVwb3NpdG9yeSB9IGZyb20gJ0Bjb3JlL2RvbWFpbic7XG5pbXBvcnQgeyBtYXAsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlYWRhYmxlUmVwb3NpdG9yeSB9IGZyb20gJy4uL3JlYWRhYmxlLnJlcG9zaXRvcnknO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFZBVE9SZWFkYWJsZVJlcG9zaXRvcnkgZXh0ZW5kcyBSZWFkYWJsZVJlcG9zaXRvcnkgaW1wbGVtZW50cyBJVkFUT1JlYWRhYmxlUmVwb3NpdG9yeSB7XG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGUgVkFUTyAoQWNjZXNzIFRva2VuKSBieSBzZW5kaW5nIGEgcmVxdWVzdCB0byB0aGUgc3BlY2lmaWVkIGVuZHBvaW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1ZlcmlmeVZhbGlkVkFUT1JlcXVlc3R9IHJlcXVlc3QgLSBUaGUgcmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB0aGUgbmVjZXNzYXJ5IHBhcmFtZXRlcnMgZm9yIHZlcmlmaWNhdGlvbi5cbiAgICogQHJldHVybnMge09ic2VydmFibGU8VmVyaWZ5VmFsaWRWQVRPUmVzcG9uc2U+fSAtIEFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzcG9uc2Ugb2YgdGhlIHZlcmlmaWNhdGlvbiBwcm9jZXNzLlxuICAgKlxuICAgKi9cbiAgcHVibGljIHZlcmlmeVZBVE8ocmVxdWVzdDogVmVyaWZ5VmFsaWRWQVRPUmVxdWVzdCk6IE9ic2VydmFibGU8VmVyaWZ5VmFsaWRWQVRPUmVzcG9uc2U+IHtcbiAgICBjb25zdCBlbmRQb2ludCA9IGAke3RoaXMuX2NvbnRleHQuZW5kUG9pbnR9L1hGV1Rva2VuL3ZlcmlmeS1hY2Nlc3MtdG9rZW5gO1xuXG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbChlbmRQb2ludCkucGlwZShcbiAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICAgICAgbWFwKChkYXRhOiBhbnkpID0+IG5ldyBSZXNwb25zZU1hcHBlcihWZXJpZnlWYWxpZFZBVE9SZXNwb25zZSkubWFwKGRhdGEpKSxcbiAgICApO1xuICB9XG59XG4iXX0=