import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { computed, inject, Injector, Renderer2, runInInjectionContext, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BROWSER_STORAGE } from '@infrastructure/base';
import { ViewCommandMediator } from './view.command.mediator';
import { VIEW_CONTEXT } from './view.aggregation.context';
import { VIEW_COMMAND_MAPPER_REGISTRY } from './view.command.registry';
import { executeShortcutCommand } from './view.command.helper';
export class ViewBase {
    constructor() {
        this._injector = inject(Injector);
        this._vcm = inject(ViewCommandMediator);
        this._router = inject(Router);
        this._renderer = inject(Renderer2);
        this._dialog = inject(Dialog);
        this._overlay = inject(Overlay);
        this._document = inject(DOCUMENT);
        this._storage = inject(BROWSER_STORAGE);
        this._context = inject(VIEW_CONTEXT);
        this._viewCommandMapperRegistry = inject(VIEW_COMMAND_MAPPER_REGISTRY);
        /**
         * TODO: MOVE THIS TO VIEW CONTEXT
         * A signal representing the current view mode of the widget.
         *
         * @protected
         * @default 'VIEW'
         */
        this._viewMode = signal('VIEW');
        this.getViewMode = computed(() => this._viewMode());
    }
    setViewMode(viewMode) {
        this._viewMode.set(viewMode);
    }
    /**
     * Open dialog with options
     * @param {DialogOptions} options
     * @param {Type<ViewRenderRegistry>} componentType
     */
    openDialog(componentType, options) {
        const dialogConfig = {
            data: options,
            disableClose: options?.disableClose ?? true,
            autoFocus: true,
            hasBackdrop: true,
            restoreFocus: true,
            width: options ? undefined : '530px',
        };
        let dialogRef = null;
        if (componentType) {
            dialogRef = this._dialog.open(componentType, dialogConfig);
            dialogRef.closed.subscribe((result) => {
                if (options?.actionHandler) {
                    const actionResult = result;
                    options.actionHandler(actionResult);
                }
            });
        }
    }
    /**
     * Executes a command based on the provided key, optional data, and optional view name.
     *
     * @param key - The key representing the command to be executed.
     * @param data - Optional data to be passed to the command.
     * @param viewName - Optional name of the view where the command is executed.
     */
    executeCommand(key, data, viewName) {
        const shortCutKey = this._viewCommandMapperRegistry.getKeyViewCommand(key);
        runInInjectionContext(this._injector, () => {
            executeShortcutCommand(shortCutKey, data, viewName);
        });
    }
    /**
     * Retrieves the current context and casts it to the specified type.
     *
     * @template CType - The type to cast the context to, which extends `ViewContext`.
     * @returns The current context cast to the specified type `CType`.
     */
    getContextAs() {
        const context = this._context;
        return context;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdmlldy9iYXNlL3NyYy9saWIvdmlldy5iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRy9ELE1BQU0sT0FBZ0IsUUFBUTtJQUE5QjtRQUNxQixjQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLFNBQUksR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNuQyxZQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixhQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLGNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsYUFBUSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuQyxhQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLCtCQUEwQixHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRXJGOzs7Ozs7V0FNRztRQUNPLGNBQVMsR0FBRyxNQUFNLENBQVcsTUFBTSxDQUFDLENBQUM7UUFJeEMsZ0JBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFzRHhELENBQUM7SUF6RFEsV0FBVyxDQUFDLFFBQWtCO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFHRDs7OztPQUlHO0lBQ0ksVUFBVSxDQUF3QixhQUF1QyxFQUFFLE9BQVc7UUFDM0YsTUFBTSxZQUFZLEdBQUc7WUFDbkIsSUFBSSxFQUFFLE9BQU87WUFDYixZQUFZLEVBQUUsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJO1lBQzNDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLElBQUk7WUFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPO1NBQ3JDLENBQUM7UUFFRixJQUFJLFNBQVMsR0FBdUUsSUFBSSxDQUFDO1FBRXpGLElBQUksYUFBYSxFQUFFLENBQUM7WUFDbEIsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMzRCxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNwQyxJQUFJLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQztvQkFDM0IsTUFBTSxZQUFZLEdBQUcsTUFBMkIsQ0FBQztvQkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxjQUFjLENBQUMsR0FBVyxFQUFFLElBQWUsRUFBRSxRQUFpQjtRQUNuRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0UscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDekMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFlBQVk7UUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQW1CLENBQUM7UUFDekMsT0FBTyxPQUFnQixDQUFDO0lBQzFCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpYWxvZywgRGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgY29tcHV0ZWQsIGluamVjdCwgSW5qZWN0b3IsIFJlbmRlcmVyMiwgcnVuSW5JbmplY3Rpb25Db250ZXh0LCBzaWduYWwsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCUk9XU0VSX1NUT1JBR0UgfSBmcm9tICdAaW5mcmFzdHJ1Y3R1cmUvYmFzZSc7XG5pbXBvcnQgeyBBY3Rpb25IYW5kbGVyVHlwZSwgVmlld0RhdGEsIFZpZXdNb2RlIH0gZnJvbSAnLi92aWV3LnR5cGUnO1xuaW1wb3J0IHsgVmlld1JlbmRlclJlZ2lzdHJ5IH0gZnJvbSAnLi92aWV3LnJlbmRlci5yZWdpc3RyeSc7XG5pbXBvcnQgeyBWaWV3Q29tbWFuZE1lZGlhdG9yIH0gZnJvbSAnLi92aWV3LmNvbW1hbmQubWVkaWF0b3InO1xuaW1wb3J0IHsgVklFV19DT05URVhUIH0gZnJvbSAnLi92aWV3LmFnZ3JlZ2F0aW9uLmNvbnRleHQnO1xuaW1wb3J0IHsgVklFV19DT01NQU5EX01BUFBFUl9SRUdJU1RSWSB9IGZyb20gJy4vdmlldy5jb21tYW5kLnJlZ2lzdHJ5JztcbmltcG9ydCB7IFZpZXdDb250ZXh0IH0gZnJvbSAnLi92aWV3LmNvbnRleHQnO1xuaW1wb3J0IHsgZXhlY3V0ZVNob3J0Y3V0Q29tbWFuZCB9IGZyb20gJy4vdmlldy5jb21tYW5kLmhlbHBlcic7XG5pbXBvcnQgeyBWaWV3T3B0aW9ucyB9IGZyb20gJy4vdmlldy5vcHRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdCYXNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG4gIHByb3RlY3RlZCByZWFkb25seSBfdmNtID0gaW5qZWN0KFZpZXdDb21tYW5kTWVkaWF0b3IpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlbmRlcmVyID0gaW5qZWN0KFJlbmRlcmVyMik7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGlhbG9nID0gaW5qZWN0KERpYWxvZyk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfb3ZlcmxheSA9IGluamVjdChPdmVybGF5KTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RvcmFnZSA9IGluamVjdChCUk9XU0VSX1NUT1JBR0UpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NvbnRleHQgPSBpbmplY3QoVklFV19DT05URVhUKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF92aWV3Q29tbWFuZE1hcHBlclJlZ2lzdHJ5ID0gaW5qZWN0KFZJRVdfQ09NTUFORF9NQVBQRVJfUkVHSVNUUlkpO1xuXG4gIC8qKlxuICAgKiBUT0RPOiBNT1ZFIFRISVMgVE8gVklFVyBDT05URVhUXG4gICAqIEEgc2lnbmFsIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCB2aWV3IG1vZGUgb2YgdGhlIHdpZGdldC5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAZGVmYXVsdCAnVklFVydcbiAgICovXG4gIHByb3RlY3RlZCBfdmlld01vZGUgPSBzaWduYWw8Vmlld01vZGU+KCdWSUVXJyk7XG4gIHB1YmxpYyBzZXRWaWV3TW9kZSh2aWV3TW9kZTogVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZS5zZXQodmlld01vZGUpO1xuICB9XG4gIHB1YmxpYyBnZXRWaWV3TW9kZSA9IGNvbXB1dGVkKCgpID0+IHRoaXMuX3ZpZXdNb2RlKCkpO1xuXG4gIC8qKlxuICAgKiBPcGVuIGRpYWxvZyB3aXRoIG9wdGlvbnNcbiAgICogQHBhcmFtIHtEaWFsb2dPcHRpb25zfSBvcHRpb25zXG4gICAqIEBwYXJhbSB7VHlwZTxWaWV3UmVuZGVyUmVnaXN0cnk+fSBjb21wb25lbnRUeXBlXG4gICAqL1xuICBwdWJsaWMgb3BlbkRpYWxvZzxUIGV4dGVuZHMgVmlld09wdGlvbnM+KGNvbXBvbmVudFR5cGU6IFR5cGU8Vmlld1JlbmRlclJlZ2lzdHJ5Piwgb3B0aW9ucz86IFQpIHtcbiAgICBjb25zdCBkaWFsb2dDb25maWcgPSB7XG4gICAgICBkYXRhOiBvcHRpb25zLFxuICAgICAgZGlzYWJsZUNsb3NlOiBvcHRpb25zPy5kaXNhYmxlQ2xvc2UgPz8gdHJ1ZSxcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgcmVzdG9yZUZvY3VzOiB0cnVlLFxuICAgICAgd2lkdGg6IG9wdGlvbnMgPyB1bmRlZmluZWQgOiAnNTMwcHgnLFxuICAgIH07XG5cbiAgICBsZXQgZGlhbG9nUmVmOiBEaWFsb2dSZWY8dW5rbm93biwgVmlld1JlbmRlclJlZ2lzdHJ5PiB8IERpYWxvZ1JlZjx1bmtub3duPiB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGRpYWxvZ1JlZiA9IHRoaXMuX2RpYWxvZy5vcGVuKGNvbXBvbmVudFR5cGUsIGRpYWxvZ0NvbmZpZyk7XG4gICAgICBkaWFsb2dSZWYuY2xvc2VkLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zPy5hY3Rpb25IYW5kbGVyKSB7XG4gICAgICAgICAgY29uc3QgYWN0aW9uUmVzdWx0ID0gcmVzdWx0IGFzIEFjdGlvbkhhbmRsZXJUeXBlO1xuICAgICAgICAgIG9wdGlvbnMuYWN0aW9uSGFuZGxlcihhY3Rpb25SZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBjb21tYW5kIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBrZXksIG9wdGlvbmFsIGRhdGEsIGFuZCBvcHRpb25hbCB2aWV3IG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgLSBUaGUga2V5IHJlcHJlc2VudGluZyB0aGUgY29tbWFuZCB0byBiZSBleGVjdXRlZC5cbiAgICogQHBhcmFtIGRhdGEgLSBPcHRpb25hbCBkYXRhIHRvIGJlIHBhc3NlZCB0byB0aGUgY29tbWFuZC5cbiAgICogQHBhcmFtIHZpZXdOYW1lIC0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgdmlldyB3aGVyZSB0aGUgY29tbWFuZCBpcyBleGVjdXRlZC5cbiAgICovXG4gIHB1YmxpYyBleGVjdXRlQ29tbWFuZChrZXk6IHN0cmluZywgZGF0YT86IFZpZXdEYXRhLCB2aWV3TmFtZT86IHN0cmluZykge1xuICAgIGNvbnN0IHNob3J0Q3V0S2V5ID0gdGhpcy5fdmlld0NvbW1hbmRNYXBwZXJSZWdpc3RyeS5nZXRLZXlWaWV3Q29tbWFuZChrZXkpO1xuICAgIHJ1bkluSW5qZWN0aW9uQ29udGV4dCh0aGlzLl9pbmplY3RvciwgKCkgPT4ge1xuICAgICAgZXhlY3V0ZVNob3J0Y3V0Q29tbWFuZChzaG9ydEN1dEtleSwgZGF0YSwgdmlld05hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBjb250ZXh0IGFuZCBjYXN0cyBpdCB0byB0aGUgc3BlY2lmaWVkIHR5cGUuXG4gICAqXG4gICAqIEB0ZW1wbGF0ZSBDVHlwZSAtIFRoZSB0eXBlIHRvIGNhc3QgdGhlIGNvbnRleHQgdG8sIHdoaWNoIGV4dGVuZHMgYFZpZXdDb250ZXh0YC5cbiAgICogQHJldHVybnMgVGhlIGN1cnJlbnQgY29udGV4dCBjYXN0IHRvIHRoZSBzcGVjaWZpZWQgdHlwZSBgQ1R5cGVgLlxuICAgKi9cbiAgcHVibGljIGdldENvbnRleHRBczxDVHlwZSBleHRlbmRzIFZpZXdDb250ZXh0PigpOiBDVHlwZSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2NvbnRleHQgYXMgdW5rbm93bjtcbiAgICByZXR1cm4gY29udGV4dCBhcyBDVHlwZTtcbiAgfVxufVxuIl19