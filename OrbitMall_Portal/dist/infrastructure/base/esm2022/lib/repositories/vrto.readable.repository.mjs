import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VRTOErrorResponse, VRTORequest, VRTOResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { catchError, map, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import * as i0 from "@angular/core";
export class VRTOReadableRepository extends ReadableRepository {
    /**
     * Retrieves a vato by making an HTTP request to refresh the access token.
     *
     * @param {VRTORequest} request - The request object containing the vrto
     * @returns {Observable<VRTOResponse | VRTOErrorResponse>} An observable that emits either a VRTOResponse or a VRTOErrorResponse.
     */
    getVATO(request) {
        const endpoint = `${this._context.endPoint}/XFWToken/renew-access-token`;
        const requestMapper = new RequestMapper(VRTORequest).map(request);
        return this.findInAll(endpoint, requestMapper).pipe(takeUntilDestroyed(this.destroyRef), map((response) => new ResponseMapper(VRTOResponse).map(response)), catchError((error) => of(new ResponseMapper(VRTOErrorResponse).map(error.error))));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VRTOReadableRepository, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VRTOReadableRepository, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: VRTOReadableRepository, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnJ0by5yZWFkYWJsZS5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW5mcmFzdHJ1Y3R1cmUvYmFzZS9zcmMvbGliL3JlcG9zaXRvcmllcy92cnRvLnJlYWRhYmxlLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFLNUQsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGtCQUFrQjtJQUM1RDs7Ozs7T0FLRztJQUNJLE9BQU8sQ0FBQyxPQUFvQjtRQUNqQyxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSw4QkFBOEIsQ0FBQztRQUN6RSxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQ2pELGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDbkMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDakUsVUFBVSxDQUFDLENBQUMsS0FBd0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ3JHLENBQUM7SUFDSixDQUFDOytHQWZVLHNCQUFzQjttSEFBdEIsc0JBQXNCLGNBRnJCLE1BQU07OzRGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbERlc3Ryb3llZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IFZSVE9FcnJvclJlc3BvbnNlLCBWUlRPUmVxdWVzdCwgVlJUT1Jlc3BvbnNlIH0gZnJvbSAnQGFwcGxpY2F0aW9uL21lc3NhZ2VzJztcbmltcG9ydCB7IFJlcXVlc3RNYXBwZXIsIFJlc3BvbnNlTWFwcGVyIH0gZnJvbSAnQGNvcmUvYmFzZSc7XG5pbXBvcnQgeyBJVlJUT1JlYWRhYmxlUmVwb3NpdG9yeSB9IGZyb20gJ0Bjb3JlL2RvbWFpbic7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZWFkYWJsZVJlcG9zaXRvcnkgfSBmcm9tICcuLi9yZWFkYWJsZS5yZXBvc2l0b3J5JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFZSVE9SZWFkYWJsZVJlcG9zaXRvcnkgZXh0ZW5kcyBSZWFkYWJsZVJlcG9zaXRvcnkgaW1wbGVtZW50cyBJVlJUT1JlYWRhYmxlUmVwb3NpdG9yeSB7XG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSB2YXRvIGJ5IG1ha2luZyBhbiBIVFRQIHJlcXVlc3QgdG8gcmVmcmVzaCB0aGUgYWNjZXNzIHRva2VuLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZSVE9SZXF1ZXN0fSByZXF1ZXN0IC0gVGhlIHJlcXVlc3Qgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHZydG9cbiAgICogQHJldHVybnMge09ic2VydmFibGU8VlJUT1Jlc3BvbnNlIHwgVlJUT0Vycm9yUmVzcG9uc2U+fSBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgZWl0aGVyIGEgVlJUT1Jlc3BvbnNlIG9yIGEgVlJUT0Vycm9yUmVzcG9uc2UuXG4gICAqL1xuICBwdWJsaWMgZ2V0VkFUTyhyZXF1ZXN0OiBWUlRPUmVxdWVzdCk6IE9ic2VydmFibGU8VlJUT1Jlc3BvbnNlIHwgVlJUT0Vycm9yUmVzcG9uc2U+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IGAke3RoaXMuX2NvbnRleHQuZW5kUG9pbnR9L1hGV1Rva2VuL3JlbmV3LWFjY2Vzcy10b2tlbmA7XG4gICAgY29uc3QgcmVxdWVzdE1hcHBlciA9IG5ldyBSZXF1ZXN0TWFwcGVyKFZSVE9SZXF1ZXN0KS5tYXAocmVxdWVzdCk7XG4gICAgcmV0dXJuIHRoaXMuZmluZEluQWxsKGVuZHBvaW50LCByZXF1ZXN0TWFwcGVyKS5waXBlKFxuICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgICBtYXAoKHJlc3BvbnNlKSA9PiBuZXcgUmVzcG9uc2VNYXBwZXIoVlJUT1Jlc3BvbnNlKS5tYXAocmVzcG9uc2UpKSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gb2YobmV3IFJlc3BvbnNlTWFwcGVyKFZSVE9FcnJvclJlc3BvbnNlKS5tYXAoZXJyb3IuZXJyb3IpKSksXG4gICAgKTtcbiAgfVxufVxuIl19