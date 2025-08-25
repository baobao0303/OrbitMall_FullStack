import { computed, Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * At the once time, the class will keep the active component (view)
 * Support to identify the view to handle the keyboard push or others
 */
export class ViewActive {
    constructor() {
        /**
         * ActiveView signal will store the actve view (only one)
         * Sync with signal
         * The variable is different to compare with Active window in Hub (Window)
         */
        this._activeView = signal('');
        this._activeViewData = signal({});
        /**
         * Return the current active view
         * Sync with signal
         */
        this.getActiveView = computed(() => this._activeView());
        /**
         * Return the current active view data
         */
        this.getActiveViewData = computed(() => this._activeViewData());
    }
    /**
     * Set active view
     * @param activeView {string}
     * @param activeViewData {ViewData}
     */
    setActiveView(activeView, activeViewData) {
        this._activeView.set(activeView);
        /** Store data into as state or anything */
        if (activeViewData)
            this._activeViewData.set(activeViewData);
    }
    /**
     * Set active view data
     * @param activeView {string}
     * @param activeViewData {ViewData}
     */
    setActiveViewData(activeView, activeViewData) {
        if (activeView == this._activeView()) {
            if (activeViewData != undefined) {
                const newViewData = { ...this._activeViewData(), ...activeViewData };
                this._activeViewData.set(newViewData);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewActive, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewActive, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: ViewActive, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5hY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy92aWV3L2Jhc2Uvc3JjL2xpYi92aWV3LmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBa0IsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUk3RTs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sVUFBVTtJQUR2QjtRQUVFOzs7O1dBSUc7UUFDSyxnQkFBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixvQkFBZSxHQUFHLE1BQU0sQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUUvQzs7O1dBR0c7UUFDSSxrQkFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUUxRDs7V0FFRztRQUNJLHNCQUFpQixHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztLQTBCbkU7SUF4QkM7Ozs7T0FJRztJQUNJLGFBQWEsQ0FBQyxVQUFrQixFQUFFLGNBQXlCO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLDJDQUEyQztRQUMzQyxJQUFJLGNBQWM7WUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlCQUFpQixDQUFDLFVBQWtCLEVBQUUsY0FBeUI7UUFDcEUsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxjQUFjLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sV0FBVyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsR0FBRyxjQUFjLEVBQUUsQ0FBQztnQkFDckUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOytHQTNDVSxVQUFVO21IQUFWLFVBQVUsY0FERyxNQUFNOzs0RkFDbkIsVUFBVTtrQkFEdEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld0RhdGEgfSBmcm9tICcuL3ZpZXcudHlwZSc7XG5pbXBvcnQgeyBWaWV3QWN0aXZlUmVnaXN0cnkgfSBmcm9tICcuL3ZpZXcuYWN0aXZlLnJlZ2lzdHJ5JztcblxuLyoqXG4gKiBBdCB0aGUgb25jZSB0aW1lLCB0aGUgY2xhc3Mgd2lsbCBrZWVwIHRoZSBhY3RpdmUgY29tcG9uZW50ICh2aWV3KVxuICogU3VwcG9ydCB0byBpZGVudGlmeSB0aGUgdmlldyB0byBoYW5kbGUgdGhlIGtleWJvYXJkIHB1c2ggb3Igb3RoZXJzXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVmlld0FjdGl2ZSBpbXBsZW1lbnRzIFZpZXdBY3RpdmVSZWdpc3RyeSB7XG4gIC8qKlxuICAgKiBBY3RpdmVWaWV3IHNpZ25hbCB3aWxsIHN0b3JlIHRoZSBhY3R2ZSB2aWV3IChvbmx5IG9uZSlcbiAgICogU3luYyB3aXRoIHNpZ25hbFxuICAgKiBUaGUgdmFyaWFibGUgaXMgZGlmZmVyZW50IHRvIGNvbXBhcmUgd2l0aCBBY3RpdmUgd2luZG93IGluIEh1YiAoV2luZG93KVxuICAgKi9cbiAgcHJpdmF0ZSBfYWN0aXZlVmlldyA9IHNpZ25hbCgnJyk7XG4gIHByaXZhdGUgX2FjdGl2ZVZpZXdEYXRhID0gc2lnbmFsPFZpZXdEYXRhPih7fSk7XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhY3RpdmUgdmlld1xuICAgKiBTeW5jIHdpdGggc2lnbmFsXG4gICAqL1xuICBwdWJsaWMgZ2V0QWN0aXZlVmlldyA9IGNvbXB1dGVkKCgpID0+IHRoaXMuX2FjdGl2ZVZpZXcoKSk7XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhY3RpdmUgdmlldyBkYXRhXG4gICAqL1xuICBwdWJsaWMgZ2V0QWN0aXZlVmlld0RhdGEgPSBjb21wdXRlZCgoKSA9PiB0aGlzLl9hY3RpdmVWaWV3RGF0YSgpKTtcblxuICAvKipcbiAgICogU2V0IGFjdGl2ZSB2aWV3XG4gICAqIEBwYXJhbSBhY3RpdmVWaWV3IHtzdHJpbmd9XG4gICAqIEBwYXJhbSBhY3RpdmVWaWV3RGF0YSB7Vmlld0RhdGF9XG4gICAqL1xuICBwdWJsaWMgc2V0QWN0aXZlVmlldyhhY3RpdmVWaWV3OiBzdHJpbmcsIGFjdGl2ZVZpZXdEYXRhPzogVmlld0RhdGEpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVWaWV3LnNldChhY3RpdmVWaWV3KTtcbiAgICAvKiogU3RvcmUgZGF0YSBpbnRvIGFzIHN0YXRlIG9yIGFueXRoaW5nICovXG4gICAgaWYgKGFjdGl2ZVZpZXdEYXRhKSB0aGlzLl9hY3RpdmVWaWV3RGF0YS5zZXQoYWN0aXZlVmlld0RhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhY3RpdmUgdmlldyBkYXRhXG4gICAqIEBwYXJhbSBhY3RpdmVWaWV3IHtzdHJpbmd9XG4gICAqIEBwYXJhbSBhY3RpdmVWaWV3RGF0YSB7Vmlld0RhdGF9XG4gICAqL1xuICBwdWJsaWMgc2V0QWN0aXZlVmlld0RhdGEoYWN0aXZlVmlldzogc3RyaW5nLCBhY3RpdmVWaWV3RGF0YT86IFZpZXdEYXRhKSB7XG4gICAgaWYgKGFjdGl2ZVZpZXcgPT0gdGhpcy5fYWN0aXZlVmlldygpKSB7XG4gICAgICBpZiAoYWN0aXZlVmlld0RhdGEgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZpZXdEYXRhID0geyAuLi50aGlzLl9hY3RpdmVWaWV3RGF0YSgpLCAuLi5hY3RpdmVWaWV3RGF0YSB9O1xuICAgICAgICB0aGlzLl9hY3RpdmVWaWV3RGF0YS5zZXQobmV3Vmlld0RhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19