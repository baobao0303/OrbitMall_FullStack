import { BrowserStorageBase } from './browser.storage.base';
import * as i0 from "@angular/core";
export declare class LocalStorage implements BrowserStorageBase {
    get(key: string): any;
    set(key: string, value: string): void;
    remove(key: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorage>;
}
