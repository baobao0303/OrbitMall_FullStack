import { computed, Injectable, InjectionToken, signal } from '@angular/core';
import { ViewData } from './view.type';
import { ViewActiveRegistry } from './view.active.registry';

/**
 * At the once time, the class will keep the active component (view)
 * Support to identify the view to handle the keyboard push or others
 */
@Injectable({ providedIn: 'root' })
export class ViewActive implements ViewActiveRegistry {
  /**
   * ActiveView signal will store the actve view (only one)
   * Sync with signal
   * The variable is different to compare with Active window in Hub (Window)
   */
  private _activeView = signal('');
  private _activeViewData = signal<ViewData>({});

  /**
   * Return the current active view
   * Sync with signal
   */
  public getActiveView = computed(() => this._activeView());

  /**
   * Return the current active view data
   */
  public getActiveViewData = computed(() => this._activeViewData());

  /**
   * Set active view
   * @param activeView {string}
   * @param activeViewData {ViewData}
   */
  public setActiveView(activeView: string, activeViewData?: ViewData): void {
    this._activeView.set(activeView);
    /** Store data into as state or anything */
    if (activeViewData) this._activeViewData.set(activeViewData);
  }

  /**
   * Set active view data
   * @param activeView {string}
   * @param activeViewData {ViewData}
   */
  public setActiveViewData(activeView: string, activeViewData?: ViewData) {
    if (activeView == this._activeView()) {
      if (activeViewData != undefined) {
        const newViewData = { ...this._activeViewData(), ...activeViewData };
        this._activeViewData.set(newViewData);
      }
    }
  }
}
