import { Injectable, InjectionToken } from '@angular/core';
import { LocalStorage } from './storages';
import * as i0 from "@angular/core";
/**
 * Defines the ORBITMAIL_PORTAL Context which keep end point (location) to connect to backend service
 * The endpoint should be get from Environment
 */
export class ORBITMAIL_PORTALContext {
    constructor() {
        this._endPoint = '';
    }
    /**
     * Defines get Endpoint
     */
    get endPoint() {
        return this._endPoint;
    }
    /**
     * Defines set Endpoint
     */
    set endPoint(endPoint) {
        this._endPoint = endPoint;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ORBITMAIL_PORTALContext, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ORBITMAIL_PORTALContext, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ORBITMAIL_PORTALContext, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export const BROWSER_STORAGE = new InjectionToken('BROWSER_STORAGE', {
    providedIn: 'root',
    factory: () => new LocalStorage(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JiaXRtYWlsX3BvcnRhbC5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW5mcmFzdHJ1Y3R1cmUvYmFzZS9zcmMvbGliL29yYml0bWFpbF9wb3J0YWwuY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQXNCLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFFOUQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQURwQztRQUVVLGNBQVMsR0FBVyxFQUFFLENBQUM7S0FlaEM7SUFiQzs7T0FFRztJQUNILElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxRQUFRLENBQUMsUUFBZ0I7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQzsrR0FmVSx1QkFBdUI7bUhBQXZCLHVCQUF1QixjQURWLE1BQU07OzRGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztBQW1CbEMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUMvQyxpQkFBaUIsRUFDakI7SUFDRSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxZQUFZLEVBQUU7Q0FDbEMsQ0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHsgQnJvd3NlclN0b3JhZ2VCYXNlLCBMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2VzJztcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBPUkJJVE1BSUxfUE9SVEFMIENvbnRleHQgd2hpY2gga2VlcCBlbmQgcG9pbnQgKGxvY2F0aW9uKSB0byBjb25uZWN0IHRvIGJhY2tlbmQgc2VydmljZVxuICogVGhlIGVuZHBvaW50IHNob3VsZCBiZSBnZXQgZnJvbSBFbnZpcm9ubWVudFxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9SQklUTUFJTF9QT1JUQUxDb250ZXh0IGltcGxlbWVudHMgQ29udGV4dCB7XG4gIHByaXZhdGUgX2VuZFBvaW50OiBzdHJpbmcgPSAnJztcblxuICAvKipcbiAgICogRGVmaW5lcyBnZXQgRW5kcG9pbnRcbiAgICovXG4gIHB1YmxpYyBnZXQgZW5kUG9pbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZFBvaW50O1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgc2V0IEVuZHBvaW50XG4gICAqL1xuICBwdWJsaWMgc2V0IGVuZFBvaW50KGVuZFBvaW50OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbmRQb2ludCA9IGVuZFBvaW50O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBCUk9XU0VSX1NUT1JBR0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48QnJvd3NlclN0b3JhZ2VCYXNlPihcbiAgJ0JST1dTRVJfU1RPUkFHRScsXG4gIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogKCkgPT4gbmV3IExvY2FsU3RvcmFnZSgpLFxuICB9XG4pO1xuIl19