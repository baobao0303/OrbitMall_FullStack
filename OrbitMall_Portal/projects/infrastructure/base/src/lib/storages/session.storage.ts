import { Injectable } from '@angular/core';
import { BrowserStorageBase } from './browser.storage.base';

@Injectable({ providedIn: 'root' })
export class SessionStorage implements BrowserStorageBase {
  public get(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  public set(key: string, value: string): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }
  public clear(): void {
    sessionStorage.clear();
  }
}
