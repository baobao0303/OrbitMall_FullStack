import { BrowserStorageBase } from './browser.storage.base';
import * as i0 from "@angular/core";
export declare class SessionStorage implements BrowserStorageBase {
    get(key: string): any;
    set(key: string, value: string): void;
    remove(key: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionStorage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionStorage>;
}
