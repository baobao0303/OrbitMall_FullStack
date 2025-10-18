import { Injectable } from '@angular/core';
import { BrowserStorageBase } from './browser.storage.base';

@Injectable({ providedIn: 'root' })
export class LocalStorage implements BrowserStorageBase {
  public get(key: string) {
    const item = localStorage.getItem(key);
    if (!item || ['undefined', 'null', ''].includes(item)) {
      return null;
    }
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }
  public set(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
  public clear(): void {
    localStorage.clear();
  }
}
