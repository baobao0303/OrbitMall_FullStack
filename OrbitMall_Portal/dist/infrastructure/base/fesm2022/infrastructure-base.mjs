import * as i0 from '@angular/core';
import { Injectable, InjectionToken, inject, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllWeatherResponse, VRTORequest, VRTOResponse, VRTOErrorResponse, VerifyValidVATOResponse } from '@application/messages';
import { ResponseMapper, RequestMapper } from '@core/base';
import { flatMap, map, catchError, of } from 'rxjs';

class LocalStorage {
    get(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: LocalStorage, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: LocalStorage, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: LocalStorage, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class SessionStorage {
    get(key) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        sessionStorage.removeItem(key);
    }
    clear() {
        sessionStorage.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SessionStorage, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SessionStorage, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: SessionStorage, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Defines the ORBITMAIL_PORTAL Context which keep end point (location) to connect to backend service
 * The endpoint should be get from Environment
 */
class ORBITMAIL_PORTALContext {
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
const BROWSER_STORAGE = new InjectionToken('BROWSER_STORAGE', {
    providedIn: 'root',
    factory: () => new LocalStorage(),
});

class ReadableRepository {
    constructor() {
        this._context = inject(ORBITMAIL_PORTALContext);
        this.httpClient = inject(HttpClient);
        this.destroyRef = inject(DestroyRef);
        this.defaultOptions = {
            headers: {
                'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        };
    }
    mergeOptions(customOptions) {
        return { ...this.defaultOptions, ...customOptions };
    }
    findAll(endPoint, options) {
        return this.httpClient.get(endPoint, this.mergeOptions(options));
    }
    findById(endPoint, id, options) {
        return this.httpClient.get(endPoint, this.mergeOptions(options));
    }
    findInAll(endPoint, body, options) {
        return this.httpClient.post(endPoint, body, this.mergeOptions(options));
    }
}

class WeatherReadableRepository extends ReadableRepository {
    getAll() {
        const endPoint = `http://192.168.1.34:40080/WeatherForecast`; //TODO: just for test
        return this.findAll(endPoint).pipe(takeUntilDestroyed(this.destroyRef), flatMap((item) => item), map((data) => {
            const responseMapper = new ResponseMapper(GetAllWeatherResponse);
            return responseMapper.map(data);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: WeatherReadableRepository, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: WeatherReadableRepository, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: WeatherReadableRepository, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class VRTOReadableRepository extends ReadableRepository {
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

class VATOReadableRepository extends ReadableRepository {
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

/**
 * Defines ORBITMAIL_PORTAL Firebase Context
 * TO DO:
 */
class ORBITMAIL_PORTALFirebaseContext {
}

/*
 * Public API Surface of base
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BROWSER_STORAGE, LocalStorage, ORBITMAIL_PORTALContext, ORBITMAIL_PORTALFirebaseContext, ReadableRepository, SessionStorage, VATOReadableRepository, VRTOReadableRepository, WeatherReadableRepository };
//# sourceMappingURL=infrastructure-base.mjs.map
