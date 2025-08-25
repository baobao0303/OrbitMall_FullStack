import { inject, Injectable } from '@angular/core';
import { VATOReadableRepository } from '@infrastructure/base';
import * as i0 from "@angular/core";
export class VerifyValidVATOQueryHandler {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LXZhbGlkLnZhdG8ucXVlcnkuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FwcGxpY2F0aW9uL3F1ZXJpZXMvc3JjL2xpYi92YXRvL3ZlcmlmeS12YWxpZC52YXRvLnF1ZXJ5LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBSTlELE1BQU0sT0FBTywyQkFBMkI7SUFEeEM7UUFFbUIsNEJBQXVCLEdBQTJCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0tBYW5HO0lBWEM7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBK0I7UUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoRSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOytHQWJVLDJCQUEyQjttSEFBM0IsMkJBQTJCLGNBRGQsTUFBTTs7NEZBQ25CLDJCQUEyQjtrQkFEdkMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnQGFwcGxpY2F0aW9uL2Jhc2UnO1xuaW1wb3J0IHsgVmVyaWZ5VmFsaWRWQVRPUmVxdWVzdCwgVmVyaWZ5VmFsaWRWQVRPUmVzcG9uc2UgfSBmcm9tICdAYXBwbGljYXRpb24vbWVzc2FnZXMnO1xuaW1wb3J0IHsgVkFUT1JlYWRhYmxlUmVwb3NpdG9yeSB9IGZyb20gJ0BpbmZyYXN0cnVjdHVyZS9iYXNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBWZXJpZnlWYWxpZFZBVE9RdWVyeUhhbmRsZXIgaW1wbGVtZW50cyBSZXF1ZXN0SGFuZGxlcjxWZXJpZnlWYWxpZFZBVE9SZXF1ZXN0LCBWZXJpZnlWYWxpZFZBVE9SZXNwb25zZT4ge1xuICBwcml2YXRlIHJlYWRvbmx5IF92YXRvUmVhZGFibGVSZXBvc2l0b3J5OiBWQVRPUmVhZGFibGVSZXBvc2l0b3J5ID0gaW5qZWN0KFZBVE9SZWFkYWJsZVJlcG9zaXRvcnkpO1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSB2ZXJpZmljYXRpb24gb2YgYSBWQVRPIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7VmVyaWZ5VmFsaWRWQVRPUmVxdWVzdH0gcmVxdWVzdCAtIFRoZSByZXF1ZXN0IG9iamVjdCBjb250YWluaW5nIHRoZSBkZXRhaWxzIG5lZWRlZCBmb3IgdmVyaWZpY2F0aW9uLlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxWZXJpZnlWYWxpZFZBVE9SZXNwb25zZT59IEFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgdmVyaWZpY2F0aW9uIHJlc3BvbnNlLlxuICAgKi9cbiAgcHVibGljIGhhbmRsZShyZXF1ZXN0OiBWZXJpZnlWYWxpZFZBVE9SZXF1ZXN0KTogT2JzZXJ2YWJsZTxWZXJpZnlWYWxpZFZBVE9SZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3ZhdG9SZWFkYWJsZVJlcG9zaXRvcnkudmVyaWZ5VkFUTyhyZXF1ZXN0KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==