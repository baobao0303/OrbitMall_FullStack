import { InjectionToken } from '@angular/core';
import { Context } from './context';
import { BrowserStorageBase } from './storages';
import * as i0 from "@angular/core";
/**
 * Defines the ORBITMAIL_PORTAL Context which keep end point (location) to connect to backend service
 * The endpoint should be get from Environment
 */
export declare class ORBITMAIL_PORTALContext implements Context {
    private _endPoint;
    /**
     * Defines get Endpoint
     */
    get endPoint(): string;
    /**
     * Defines set Endpoint
     */
    set endPoint(endPoint: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<ORBITMAIL_PORTALContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ORBITMAIL_PORTALContext>;
}
export declare const BROWSER_STORAGE: InjectionToken<BrowserStorageBase>;
